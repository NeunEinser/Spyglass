import * as core from '@spyglassmc/core'
import { localize } from '@spyglassmc/locales'
import type { CommandNode, CommandOptions, MacroNode, McfunctionNode } from '../node/index.js'
import type { RootTreeNode } from '../tree/index.js'
import type { ArgumentParserGetter } from './argument.js'
import { command } from './command.js'
import { macro } from './macro.js'

export interface McfunctionOptions {
	lineContinuation?: boolean
	macros?: boolean
	commandOptions?: CommandOptions
}

function mcfunction(
	commandTree: RootTreeNode,
	argument: ArgumentParserGetter,
	options: McfunctionOptions,
): core.Parser<McfunctionNode> {
	return (src, ctx) => {
		const ans: McfunctionNode = {
			type: 'mcfunction:entry',
			range: core.Range.create(src),
			children: [],
		}

		while (src.skipWhitespace().canReadInLine()) {
			let result: core.CommentNode | CommandNode | MacroNode | core.ErrorNode
			if (src.peek() === '#') {
				result = comment(src, ctx) as core.CommentNode
			} else if (src.peek() === '$') {
				const start = src.cursor
				if (options.macros) {
					result = macro()(src, ctx)
				} else {
					src.skipLine()
					ans.range.end = src.cursor
					result = {
						type: 'error',
						range: core.Range.create(start, src),
					} satisfies core.ErrorNode
					ctx.err.report(localize('mcfunction.parser.macro.disallowed'), result)
				}
			} else {
				// result = command(commandTree, argument, options.commandOptions)(src, ctx)
				const start = src.cursor
				const line = src.readLine()

				const innerSource = new core.Source(line)

				if (ctx.fileCache.has(line)) {
					const aaa = ctx.fileCache.get(line) as CommandNode
					result = aaa
				} else {
					result = command(commandTree, argument, options.commandOptions)(innerSource, ctx)
					ctx.fileCache.set(line, result)
				}

				// innerSource.indexMap = [{
				// 	inner: core.Range.create(0),
				// 	outer: core.Range.span(start, start + line.length),
				// }]

				result = offsetNode(result, start)
			}
			ans.children.push(result)
			src.nextLine()
		}

		ans.range.end = src.cursor

		return ans
	}
}

function offsetNode<T extends core.AstNode>(node: T, offset: number) {
	const ans = {
		...node,
		children: [],
		range: core.Range.create(node.range.start + offset, node.range.end + offset),
	}

	if (node.children) {
		for (const child of node.children) {
			ans.children.push(offsetNode(child, offset))
		}
	}

	return ans
}

const comment = core.comment({ singleLinePrefixes: new Set(['#']) })

export const entry = (
	commandTree: RootTreeNode,
	argument: ArgumentParserGetter,
	options: McfunctionOptions = {},
) => {
	const parser = mcfunction(commandTree, argument, options)
	return options.lineContinuation ? core.concatOnTrailingBackslash(parser) : parser
}
