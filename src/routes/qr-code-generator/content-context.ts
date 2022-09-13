import { setContext, getContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

const content = writable('mooby');
const key = Symbol();

export function setContentContext() {
	return setContext<Writable<string>>(key, content);
}
export function getContentContext() {
	return getContext<Writable<string>>(key);
}
