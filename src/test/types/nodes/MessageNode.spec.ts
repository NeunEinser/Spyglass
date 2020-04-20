import assert = require('power-assert')
import { constructConfig } from '../../../types/Config'
import { describe, it } from 'mocha'
import { GetFormattedString } from '../../../types/Formattable'
import EntityNode from '../../../types/nodes/EntityNode'
import MessageNode from '../../../types/nodes/MessageNode'
import { $ } from '../../utils'

describe('MessageNode Tests', () => {
    describe('[ToLintedString]() Tests', () => {
        it('Should return correctly', () => {
            const { lint } = constructConfig({})
            const message = $(new MessageNode(), {
                length: 3,
                0: 'Hello, ',
                1: new EntityNode(undefined, 'a'),
                2: '!'
            })
            const actual = message[GetFormattedString](lint)
            assert(actual === 'Hello, @a!')
        })
    })
})
