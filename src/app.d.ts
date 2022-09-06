// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		userid: string;
	}

	// interface PageData {}

	// interface Platform {}
}

declare namespace svelte.JSX {
	interface HTMLProps<T> {
		onclick_outside?: (e: CustomEvent) => void;
	}
}
