import { writable, type StartStopNotifier, type Writable } from 'svelte/store'

/**
 * Custom store with common methods for object manipulation.
 */
interface ObjectStore<T extends Record<string, unknown>> extends Writable<T> {
	/**
	 * Add a new prop to the object.
	 *
	 * @param key The key of an object entry
	 * @param value The value of an object entry
	 */
	insertProp(key: string, value: unknown): void
	/**
	 * Update a property of an object.
	 *
	 * @param key The key of an object entry
	 * @param value The value of an object entry
	 */
	updateProp(key: string, value: unknown): void
	/**
	 * Remove a property of an object.
	 *
	 * @param key The key of an object entry
	 */
	deleteProp(key: string): void
}

/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 *
 * @param value initial value
 * @param start start and stop notifications for subscriptions
 * @returns custom store with common object methods
 */
function objectStore<T extends Record<string, unknown>>(
	value?: T,
	start?: StartStopNotifier<T>
): ObjectStore<T> {
	const { set, update, subscribe } = writable<T>(value, start)

	return {
		set,
		update,
		subscribe,
		insertProp(key: string, value: unknown) {
			update((prev: T) => {
				return {
					...prev,
					[key]: value
				}
			})
		},
		updateProp(key: string, value: unknown) {
			this.insertProp(key, value)
		},
		deleteProp(key: string) {
			update((prev: T) => {
				delete prev[key]
				return prev
			})
		}
	}
}

export default objectStore
export type { ObjectStore }
