import type * as core from '@spyglassmc/core'
import type { Checker, RangeLike, Symbol, SymbolQuery } from '@spyglassmc/core'
import { ErrorSeverity, Range, ResourceLocationNode, SymbolPath, SymbolUtil, SymbolVisibility } from '@spyglassmc/core'
import { localeQuote, localize } from '@spyglassmc/locales'
import type { Segments } from '../binder'
import { identifierToSeg, segToIdentifier } from '../binder'
import type { DescribesClauseNode, IdentPathToken, InjectClauseNode, MainNode, ModuleDeclarationNode, UseClauseNode } from '../node'
import { CompoundDefinitionNode, CompoundFieldNode, EnumDefinitionNode, EnumFieldNode, ExtendableRootRegistryMap } from '../node'
import type { CheckerContext } from './CheckerContext'

export const entry: Checker<MainNode> = async (node: MainNode, ctx: core.CheckerContext): Promise<void> => {
	const modSeg = uriToSeg(ctx.doc.uri, ctx)
	if (modSeg === undefined) {
		ctx.err.report(localize('mcdoc.checker.entry.undefined-mod-seg'), 0, ErrorSeverity.Warning)
		return
	} else if (modSeg.length === 0) {
		ctx.err.report(localize('mcdoc.checker.entry.empty-mod-seg'), 0, ErrorSeverity.Warning)
	}
	const modIdentifier = segToIdentifier(modSeg)
	const modSymbol = ctx.symbols.query(ctx.doc, 'mcdoc', modIdentifier).symbol!

	const hoistingNodes: (CompoundDefinitionNode | EnumDefinitionNode | ModuleDeclarationNode | UseClauseNode)[] = []
	const checkingNodes: (CompoundDefinitionNode | EnumDefinitionNode | DescribesClauseNode | InjectClauseNode)[] = []

	for (const childNode of node.children) {
		switch (childNode.type) {
			case 'mcdoc:struct':
				hoistingNodes.push(childNode)
				checkingNodes.push(childNode)
				break
			case 'mcdoc:describes_clause':
				checkingNodes.push(childNode)
				break
			case 'mcdoc:enum':
				hoistingNodes.push(childNode)
				checkingNodes.push(childNode)
				break
			case 'mcdoc:inject_clause':
				checkingNodes.push(childNode)
				break
			case 'mcdoc:module_declaration':
				hoistingNodes.push(childNode)
				break
			case 'mcdoc:use_clause':
				hoistingNodes.push(childNode)
				break
			case 'comment':
			default:
				break
		}
	}

	const mcdocCtx: CheckerContext = {
		...ctx,
		modIdentifier,
		modSeg,
		modSymbol,
	}

	// Hoisting declarations.
	for (const childNode of hoistingNodes) {
		switch (childNode.type) {
			case 'mcdoc:struct':
				compoundDefinitionHoisting(childNode, mcdocCtx)
				break
			case 'mcdoc:enum':
				enumDefinitionHoisting(childNode, mcdocCtx)
				break
			case 'mcdoc:module_declaration':
				moduleDeclaration(childNode, mcdocCtx)
				break
			case 'mcdoc:use_clause':
				await useClause(childNode, mcdocCtx)
				break
		}
	}

	// Actual checking.
	for (const childNode of checkingNodes) {
		switch (childNode.type) {
			case 'mcdoc:struct':
				await compoundDefinition(childNode, mcdocCtx)
				break
			case 'mcdoc:enum':
				enumDefinition(childNode, mcdocCtx)
				break
			case 'mcdoc:describes_clause':
				await describesClause(childNode, mcdocCtx)
				break
			case 'mcdoc:inject_clause':
				await injectClause(childNode, mcdocCtx)
				break
		}
	}
}

async function compoundFields<N extends { fields: CompoundFieldNode[] }>(definitionQuery: core.SymbolQuery, node: N, ctx: CheckerContext) {
	const promises: Promise<void>[] = []

	definitionQuery.onEach(node.fields, field => {
		promises.push(new Promise(resolve => {
			definitionQuery.member(field.key.value, member => member
				.ifDeclared(symbol => reportDuplicatedDeclaration('mcdoc.checker.duplicated-identifier', ctx, symbol, field.key))
				.else(async () => {
					const data = await CompoundFieldNode.toSymbolData(field, async n => (await resolveIdentPath(n, ctx))?.symbol)
					member.enter({
						data: { data, desc: field.doc.value, subcategory: 'compound_key' },
						usage: { type: 'definition', node: field.key, fullRange: field },
					})
					resolve()
				})
			)
		}))
	})

	return Promise.allSettled(promises)
}

const compoundDefinition = async (node: CompoundDefinitionNode, ctx: CheckerContext): Promise<void> => {
	const definitionQuery = ctx.symbols.query(ctx.doc, 'mcdoc', ctx.modIdentifier, node.identifier.value)
	if (!definitionQuery.symbol) {
		return
	}

	const data = await CompoundDefinitionNode.toSymbolData(node, async n => (await resolveIdentPath(n, ctx))?.symbol)
	definitionQuery.amend({ data: { data } })

	await compoundFields(definitionQuery, node, ctx)
}

const compoundDefinitionHoisting = (node: CompoundDefinitionNode, ctx: CheckerContext): void => {
	if (!node.identifier.value) {
		return
	}
	ctx.symbols
		.query(ctx.doc, 'mcdoc', ctx.modIdentifier, node.identifier.value)
		.ifDeclared(symbol => reportDuplicatedDeclaration('mcdoc.checker.duplicated-identifier', ctx, symbol, node.identifier))
		.elseEnter({
			data: {
				desc: node.doc.value,
				subcategory: 'compound',
			},
			usage: {
				type: 'definition',
				node: node.identifier,
				fullRange: node,
			},
		})
}

const describesClause = async (node: DescribesClauseNode, ctx: CheckerContext): Promise<void> => {
	const registry = ResourceLocationNode.toString(node.registry, 'full')
	if (!(registry in ExtendableRootRegistryMap)) {
		return
	}

	const describerSymbol = await resolveIdentPath(node.path, ctx)

	const category = ExtendableRootRegistryMap[registry as keyof typeof ExtendableRootRegistryMap]
	const objects = node.objects ? node.objects.map(v => ResourceLocationNode.toString(v, 'full')) : ['@default']
	ctx.symbols
		.query(ctx.doc, 'mcdoc/description', category)
		.enter({})
		.onEach(objects, (object, query) => {
			query.member(object, member => member
				.enter({
					data: {
						relations: {
							describedBy: SymbolPath.fromSymbol(describerSymbol?.symbol),
						},
					},
					usage: { type: 'definition', range: node },
				})
			)
		})
}

function enumFields<N extends { fields: EnumFieldNode[] }>(definitionQuery: core.SymbolQuery, node: N, ctx: CheckerContext) {
	definitionQuery.onEach(node.fields, field => {
		definitionQuery.member(field.key.value, member => member
			.ifDeclared(symbol => reportDuplicatedDeclaration('mcdoc.checker.duplicated-identifier', ctx, symbol, field.key))
			.else(() => {
				const data = EnumFieldNode.toSymbolData(field)
				member.enter({
					data: { data, desc: field.doc.value, subcategory: 'enum_key' },
					usage: { type: 'definition', node: field.key, fullRange: field },
				})
			})
		)
	})
}

const enumDefinition = (node: EnumDefinitionNode, ctx: CheckerContext): void => {
	const definitionQuery = ctx.symbols.query(ctx.doc, 'mcdoc', ctx.modIdentifier, node.identifier.value)
	if (!definitionQuery.symbol) {
		return
	}

	const data = EnumDefinitionNode.toSymbolData(node)
	definitionQuery.amend({ data: { data } })

	enumFields(definitionQuery, node, ctx)
}

const enumDefinitionHoisting = (node: EnumDefinitionNode, ctx: CheckerContext): void => {
	if (!node.identifier.value) {
		return
	}
	ctx.symbols
		.query(ctx.doc, 'mcdoc', ctx.modIdentifier, node.identifier.value)
		.ifDeclared(symbol => reportDuplicatedDeclaration('mcdoc.checker.duplicated-identifier', ctx, symbol, node.identifier))
		.elseEnter({
			data: {
				desc: node.doc.value,
				subcategory: 'enum',
			},
			usage: {
				type: 'definition',
				node: node.identifier,
				fullRange: node,
			},
		})
}

const injectClause = async (node: InjectClauseNode, ctx: CheckerContext): Promise<void> => {
	if (!node.def) {
		return
	}
	const injectedQuery = await resolveIdentPath(node.def.path, ctx)
	if (!injectedQuery?.symbol) {
		return
	}
	if (!(
		(node.def?.type === 'mcdoc:inject_clause/compound' && injectedQuery.symbol.subcategory === 'compound') ||
		(node.def?.type === 'mcdoc:inject_clause/enum' && injectedQuery.symbol.subcategory === 'enum')
	)) {
		const target = localize(`mcdoc.node.${injectedQuery.symbol.subcategory === 'enum' ? 'enum-definition' : 'compound-definition'}`)
		const injection = localize(`mcdoc.node.${node.def?.type === 'mcdoc:inject_clause/enum' ? 'enum-definition' : 'compound-definition'}`)
		ctx.err.report(localize('mcdoc.checker.inject-clause.unmatched-injection', target, injection), node.def.path)
		return
	}
	if (node.def?.type === 'mcdoc:inject_clause/compound') {
		await compoundFields(injectedQuery, node.def, ctx)
	} else if (node.def?.type === 'mcdoc:inject_clause/enum') {
		enumFields(injectedQuery, node.def, ctx)
	}
}

const moduleDeclaration = (node: ModuleDeclarationNode, ctx: CheckerContext): void => {
	if (node.identifier.value.length) {
		const declaredSeg = [...ctx.modSeg, node.identifier.value]
		const declaredIdentifier = segToIdentifier(declaredSeg)
		ctx.symbols
			.query(ctx.doc, 'mcdoc', declaredIdentifier)
			.ifUnknown(() => ctx.err.report(
				localize('mcdoc.checker.module-declaration.non-existent', localeQuote(declaredIdentifier)),
				node.identifier
			))
			.ifDeclared(symbol => reportDuplicatedDeclaration('mcdoc.checker.module-declaration.duplicated', ctx, symbol, node.identifier))
			.elseEnter({
				usage: {
					type: 'declaration',
					node: node.identifier,
					fullRange: node,
				},
			})
	}
}

const useClause = async (node: UseClauseNode, ctx: CheckerContext): Promise<void> => {
	const usedSymbol = (await resolveIdentPath(node.path, ctx))?.symbol
	if (usedSymbol) {
		const lastToken = node.path.children[node.path.children.length - 1]
		ctx.symbols
			.query({ doc: ctx.doc, node }, 'mcdoc', ctx.modIdentifier, usedSymbol.identifier)
			.ifDeclared(symbol => reportDuplicatedDeclaration('mcdoc.checker.duplicated-identifier', ctx, symbol, lastToken))
			.elseEnter({
				data: {
					relations: {
						aliasOf: { category: 'mcdoc', path: usedSymbol.path },
					},
				},
				usage: {
					type: 'declaration',
					node: lastToken,
					fullRange: node,
					...node.isExport ? {} : { visibility: SymbolVisibility.File },
				},
			})
	}
}

function reportDuplicatedDeclaration(localeString: string, ctx: CheckerContext, symbol: Symbol, range: RangeLike) {
	ctx.err.report(
		localize(localeString, localeQuote(symbol.identifier)),
		range, ErrorSeverity.Warning,
		{
			related: [{
				location: SymbolUtil.getDeclaredLocation(symbol) as core.Location,
				message: localize(`${localeString}.related`, localeQuote(symbol.identifier)),
			}],
		}
	)
}

function uriToSeg(uri: string, ctx: core.CheckerContext): Segments | undefined {
	const identifier = Object
		.keys(ctx.symbols.global.mcdoc ?? {})
		.find(identifier => {
			const symbol = ctx.symbols.global.mcdoc![identifier]!
			return symbol.subcategory === 'module' && symbol.implementation?.some(loc => loc.uri === uri)
		})
	return identifier ? identifierToSeg(identifier) : undefined
}

function segToUri(seg: Segments, ctx: core.CheckerContext): string | undefined {
	const identifier = segToIdentifier(seg)
	return ctx.symbols.global.mcdoc?.[identifier]?.implementation?.[0]?.uri
}

/**
 * @returns The actual symbol being used/imported from another module.
 */
async function resolveIdentPath(identPath: IdentPathToken, ctx: CheckerContext): Promise<SymbolQuery | undefined> {
	const targetSeg = identPath.fromGlobalRoot ? [] : [...ctx.modSeg]
	for (const [i, token] of identPath.children.entries()) {
		if (i < identPath.children.length - 1) {
			// Referencing to a module.

			// Resolve this token.
			if (token.value === 'super') {
				if (targetSeg.length === 0) {
					ctx.err.report(localize('mcdoc.checker.ident-path.super-from-root'), Range.span(token, identPath))
					return undefined
				}
				targetSeg.pop()
			} else {
				targetSeg.push(token.value)
			}

			ctx.symbols
				.query(ctx.doc, 'mcdoc', segToIdentifier(targetSeg))
				.amend({
					usage: {
						type: 'reference',
						node: token,
						skipRenaming: token.value === 'super',
					},
				})
		} else {
			// Referencing to a compound or enum.

			const currentId = segToIdentifier(ctx.modSeg)
			const targetId = segToIdentifier(targetSeg)
			if (currentId !== targetId) {
				// The referenced compound/enum is in another module.
				// We should load and check that module first.

				const targetUri = segToUri(targetSeg, ctx)
				const ensured = targetUri ? await ctx.ensureChecked(targetUri) : false
				if (!ensured) {
					ctx.err.report(
						localize('mcdoc.checker.ident-path.unknown-module', localeQuote(targetId)),
						Range.span(token, identPath)
					)
					return undefined
				}
			}

			return ctx.symbols
				.query(ctx.doc, 'mcdoc', targetId, token.value)
				.ifUnknown(() => ctx.err.report(
					localize('mcdoc.checker.ident-path.unknown-identifier', localeQuote(token.value), localeQuote(targetId)),
					Range.span(token, identPath)
				))
				.elseResolveAlias()
				.elseEnter({
					usage: {
						type: 'reference',
						node: token,
					},
				})
		}
	}
	return undefined
}