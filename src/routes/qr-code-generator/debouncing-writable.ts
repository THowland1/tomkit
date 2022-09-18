import { writable, type Writable } from 'svelte/store';

function setTimeout() {
	return (globalThis as unknown as Window).setTimeout;
}

export function debouncingWritable<T>(initialValue: T, timeout: number): Writable<T> {
	let timeoutId = 0;

	const value = writable(initialValue);

	function resetSetValueTimeout(newvalue: T) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout()(() => value.set(newvalue), timeout);
	}

	return {
		set: (newvalue) => {
			resetSetValueTimeout(newvalue);
		},
		subscribe: value.subscribe,
		update: value.update
	};
}
