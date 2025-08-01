import type { DocumentUri } from 'vscode-languageserver-textdocument'
import type { Config } from '..'
import { CacheService } from '..'

/**
 * This class is used by file proccessors (like parser or checker) to stash data.
 *
 * This cache data will not be persisted, unlike the data in {@link CacheService}
 */
export class FileProccessorCache {
	readonly #cache = new Map<DocumentUri, FileProcessorCacheFile>()
	readonly #project: { config: Config }

	constructor(project: { config: Config }) {
		this.#project = project
	}

	get(file: DocumentUri, processor: Processor) {
		if (!this.#cache.has(file)) {
			return new Map<string, any>()
		}
		const cacheFile = this.#cache.get(file)!
		cacheFile.lastQueried = new Date()
		return cacheFile.data[processor]
	}

	set(file: DocumentUri, processor: Processor, data: Map<string, any>) {
		if (data.size === 0) {
			if (this.#cache.has(file)) {
				const cacheFile = this.#cache.get(file)!
				cacheFile.data[processor]
				if (!Object.values(cacheFile.data).some(v => v.size > 0)) {
					this.#cache.delete(file)
				} else {
					this.#cache.set(file, cacheFile)
				}
			}
			return
		}

		if (
			!this.#cache.has(file)
			&& this.#cache.size === this.#project.config.env.maxDocumentsInFileProcessorCache
		) {
			let lowest: [string, FileProcessorCacheFile] | undefined = undefined
			for (const entry of this.#cache.entries()) {
				if (!lowest || entry[1].lastQueried > lowest[1].lastQueried) {
					lowest = entry
				}
			}
			this.#cache.delete(lowest![0])
		}

		const cacheFile = this.#cache.get(file) ?? {
			lastQueried: new Date(),
			data: {
				bind: new Map(),
				check: new Map(),
				lint: new Map(),
				parse: new Map(),
			},
		}
		cacheFile.data[processor] = data
		this.#cache.set(file, cacheFile)
	}

	delete(file: DocumentUri) {
		this.#cache.delete(file)
	}
}

type Processor = 'parse' | 'bind' | 'check' | 'lint'

interface FileProcessorCacheFile {
	lastQueried: Date
	data: { [key in Processor]: Map<string, any> }
}
