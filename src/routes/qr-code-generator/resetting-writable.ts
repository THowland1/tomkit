import { writable, type Writable } from 'svelte/store';

function setTimeout() {
	return window.setTimeout;
}

export function resettingWritable<T>(initialValue: T, timeout: number): Writable<T> {
	let timeoutId = 0;

	const value = writable(initialValue);

	function resetValue() {
		value.set(initialValue);
	}
	function resetResetTimeout() {
		clearTimeout(timeoutId);
		timeoutId = setTimeout()(resetValue, timeout);
	}

	return {
		set: (newvalue) => {
			value.set(newvalue);
			resetResetTimeout();
		},
		subscribe: value.subscribe,
		update: value.update
	};
}
