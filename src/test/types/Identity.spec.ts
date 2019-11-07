import * as assert from 'power-assert'
import { describe, it } from 'mocha'
import Identity from '../../types/Identity'
import { constructConfig } from '../../types/Config'
import { ToLintedString } from '../../types/Lintable'

describe('Identity Tests', () => {
    describe('toString() Tests', () => {
        it('Should return correctly', () => {
            const id = new Identity('minecraft', ['foo', 'bar'])
            assert(`${id}` === 'minecraft:foo/bar')
        })
        it('Should return empty identity', () => {
            const id = new Identity()
            assert(`${id}` === 'minecraft:')
        })
    })
    describe('[ToLintedString]() Tests', () => {
        it('Should omit default namespace', () => {
            const { lint } = constructConfig({ lint: { omitDefaultNamespace: true } })
            const id = new Identity('minecraft', ['foo', 'bar'])
            const actual = id[ToLintedString](lint)
            assert(actual === 'foo/bar')
        })
        it('Should not omit default namespace', () => {
            const { lint } = constructConfig({ lint: { omitDefaultNamespace: false } })
            const id = new Identity('minecraft', ['foo', 'bar'])
            const actual = id[ToLintedString](lint)
            assert(actual === 'minecraft:foo/bar')
        })
        it('Should deal with other namespaces', () => {
            const { lint } = constructConfig({ lint: { omitDefaultNamespace: true } })
            const id = new Identity('spgoding', ['foo', 'bar'])
            const actual = id[ToLintedString](lint)
            assert(actual === 'spgoding:foo/bar')
        })
        it('Should contain the tag symbol', () => {
            const { lint } = constructConfig({ lint: { omitDefaultNamespace: false } })
            const id = new Identity('spgoding', ['foo', 'bar'], true)
            const actual = id[ToLintedString](lint)
            assert(actual === '#spgoding:foo/bar')
        })
    })
    describe('toPath() Tests', () => {
        it('Should return correctly for tags', () => {
            const id = new Identity('spgoding', ['entity_types', 'foo', 'bar'])
            const actual = id.toPath('tags/entityTypes')
            assert(actual === 'data/spgoding/tags/entity_types/foo/bar.json')
        })
        it('Should return correctly for loot tables', () => {
            const id = new Identity('spgoding', ['foo', 'bar'])
            const actual = id.toPath('lootTables/block')
            assert(actual === 'data/spgoding/loot_tables/foo/bar.json')
        })
        it('Should return correctly for simple categories', () => {
            const id = new Identity('spgoding', ['foo', 'bar'])
            const actual = id.toPath('functions', '.mcfunction', 'data')
            assert(actual === 'data/spgoding/functions/foo/bar.mcfunction')
        })
    })
    describe('fromPath() Tests', () => {
        it('Should return correctly', async () => {
            const { id, ext, side, category } = await Identity.fromPath('data/spgoding/functions/foo/bar.mcfunction')
            assert(id.toString() === 'spgoding:foo/bar')
            assert(ext === '.mcfunction')
            assert(side === 'data')
            assert(category === 'functions')
        })
    })
})
