import https from 'https'
import StringReader from './StringReader'
import { CompletionItem } from 'vscode-languageserver'
import { ToFormattedString } from '../types/Formattable'
import { LintConfig } from '../types/Config'
import { ToJsonString } from '../types/JsonConvertible'
import { locale } from '../locales/Locales'
import { DiagnosticConfig, getDiagnosticSeverity } from '../types/StylisticConfig'
import ParsingError, { ActionCode } from '../types/ParsingError'
import range from 'python-range'
import TextRange from '../types/TextRange'

/**
 * Convert an array to human-readable message.
 * @param arr An array.
 * @param quoted Whether or not to quote the result. Defaults to `true`
 * @param conjunction The conjunction to use. Defaults to `and`.
 * @returns Human-readable message.
 * @example // Using English
 * arrayToMessage([]) // "nothing"
 * arrayToMessage('foo') // "‘foo’"
 * arrayToMessage(['foo']) // "‘foo’"
 * arrayToMessage(['bar', 'foo']) // "‘bar’ and ‘foo’"
 * arrayToMessage(['bar', 'baz', 'foo']) // "‘bar’, ‘baz’, and ‘foo’"
 * @example // Using Locale
 * arrayToMessage([], false) // "nothing"
 * arrayToMessage(['A'], false) // "A"
 * arrayToMessage(['A', 'B'], false) // "A{conjunction.and_2}B"
 * arrayToMessage(['A', 'B', 'C'], false) // "A{conjunction.and_3+_1}B{conjunction.and_3+_2}C"
 */
export function arrayToMessage(arr: string | string[], quoted = true, conjunction: 'and' | 'or' = 'and') {
    if (typeof arr === 'string') {
        arr = [arr]
    }
    const getPart = (str: string) => quoted ? locale('punc.quote', str) : str
    switch (arr.length) {
        case 0:
            return locale('nothing')
        case 1:
            return getPart(arr[0])
        case 2:
            return getPart(arr[0]) + locale(`conjunction.${conjunction}_2`) + getPart(arr[1])
        default:
            arr = arr.map(v => getPart(v))
            return `${arr.slice(0, -1).join(locale(`conjunction.${conjunction}_3+_1`))}${locale(`conjunction.${conjunction}_3+_2`)}${arr[arr.length - 1]}`
    }
}

/**
 * Escape characters in a string with `\`.
 * @param str A string.
 * @param quote A string indicating which type of quote should be escaped.
 */
export function escapeString(str: string, quote: '"' | "'" = '"') {
    let ans = ''
    for (const char of str) {
        if (char === '\\' || char === quote) {
            ans += `\\${char}`
        } else {
            ans += char
        }
    }
    return ans
}

/**
 * Quote a string.
 * @param inner The inner string.
 * @param quoteType Which quote to use.
 * @param forced Whether to quote regardless.
 */
export function quoteString(inner: string, quoteType: 'always single' | 'always double' | 'prefer single' | 'prefer double', forced: boolean) {
    const shouldQuote = forced ||
        !StringReader.canInUnquotedString(inner) ||
        inner.toLowerCase() === 'false' ||
        inner.toLowerCase() === 'true'
    if (shouldQuote) {
        let quote: "'" | '"'
        switch (quoteType) {
            case 'always double':
                quote = '"'
                break
            case 'always single':
                quote = "'"
                break
            case 'prefer single':
                const containSingleQuote = inner.includes("'")
                if (containSingleQuote) {
                    quote = '"'
                } else {
                    quote = "'"
                }
                break
            case 'prefer double':
            default:
                const containDoubleQuote = inner.includes('"')
                if (containDoubleQuote) {
                    quote = "'"
                } else {
                    quote = '"'
                }
                break
        }
        return `${quote}${escapeString(inner, quote)}${quote}`
    } else {
        return inner
    }
}

export function validateStringQuote(raw: string, inner: string, range: TextRange, quoteConfig: DiagnosticConfig<boolean>, quoteTypeConfig: DiagnosticConfig<'always single' | 'always double' | 'prefer single' | 'prefer double'>): ParsingError[] {
    const ans: ParsingError[] = []
    const firstChar = raw.charAt(0)
    const isQuoted = StringReader.isQuote(firstChar)

    if (quoteConfig) {
        const [severity, expectQuote] = quoteConfig
        if (expectQuote !== isQuoted) {
            ans.push(new ParsingError(
                range,
                locale('expected-got',
                    expectQuote ? locale('quote') : locale('string'),
                    locale('punc.quote', firstChar)
                ),
                true, getDiagnosticSeverity(severity),
                expectQuote ? ActionCode.NbtStringQuote : ActionCode.NbtStringUnquote
            ))
        }
    }

    if (isQuoted && quoteTypeConfig) {
        const [severity, expectedType] = quoteTypeConfig
        if (quoteString(inner, expectedType, true) !== raw) {
            ans.push(new ParsingError(
                range,
                locale('expected', locale('punc.quote', expectedType)),
                true, getDiagnosticSeverity(severity),
                ActionCode.NbtStringQuote
            ))
        }
    }

    return ans
}

/**
 * Convert an array of any to an array of `CompletionItem`.
 * @param array An array
 */
export function arrayToCompletions(array: any[]): CompletionItem[] {
    return array.map(v => ({ label: v.toString() }))
}

/**
 * Convert specific value to a linted string.
 * @param value Any value.
 */
export function toFormattedString(value: any, lint: LintConfig): string {
    if (value && value[ToFormattedString]) {
        return value[ToFormattedString](lint)
    } else {
        return `${value}`
    }
}

/**
 * Convert specific value to a JSON string.
 * @param value Any value.
 */
/* istanbul ignore next */
export function toJsonString(value: any, lint: LintConfig): string {
    if (value && value[ToJsonString]) {
        return value[ToJsonString](lint)
    } else {
        return toFormattedString(value, lint)
    }
}

/* istanbul ignore next */
export function requestText(uri: string) {
    return new Promise<string>((resolve, reject) => {
        https
            .get(uri, res => {
                let data: string = ''
                res.on('data', chunk => {
                    data += chunk
                })
                res.on('end', () => {
                    resolve(data)
                })
            })
            .on('error', e => {
                reject(e)
            })
            .end()
    })
}
