import { writable, type StartStopNotifier, type Writable } from 'svelte/store'

/**
 * Types.
 */
interface DBRecord {
	id: number
}

/**
 * Extended store with common methods to work on arrays.
 */
interface ArrayStore<T extends DBRecord> extends Writable<T[]> {
	/**
	 * Insert a new record.
	 *
	 * @param data The record that should be inserted
	 */
	insertRecord(data: T): void
	/**
	 * Replace a record.
	 *
	 * @param data The record that should get replaced
	 */
	replaceRecord(data: T): void
	/**
	 * Remove a record.
	 *
	 * @param id The record that should be removed
	 */
	removeRecord(id: number): void
	/**
	 * Sort the records.
	 */
	sortRecords(compareFn?: (a: T, b: T) => number): void
}

/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 *
 * @param value initial value
 * @param start start and stop notifications for subscriptions
 * @returns An extended store for arrays of objects
 */
function arrayStore<T extends DBRecord>(
	value?: T[],
	start?: StartStopNotifier<T[]>
): ArrayStore<T> {
	const { set, update, subscribe } = writable(value, start)

	return {
		set,
		update,
		subscribe,
		insertRecord(data: T) {
			update((prev: T[]) => {
				return [...prev, data]
			})
		},
		replaceRecord(data: T) {
			update((prev: T[]) => {
				const index = prev.findIndex(item => item.id === data.id)

				prev.splice(index, 1, data)

				return prev
			})
		},
		removeRecord(id: number) {
			update((prev: T[]) => {
				const index = prev.findIndex(item => item.id === id)

				prev.splice(index, 1)

				return prev
			})
		},
		sortRecords(compareFn?: (a: T, b: T) => number) {
			update((prev: T[]) => {
				return prev.sort(compareFn)
			})
		}
	}
}

export default arrayStore
export type { DBRecord, ArrayStore }
