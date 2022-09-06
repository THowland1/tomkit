<script lang="ts">
	import type { Base } from './Base';

	import BaseModal from './BaseModal.svelte';
	import { fromBaseN, toBaseN } from './convert-base';
	import EditIcon from './EditIcon.svelte';
	import InfoIcon from './InfoIcon.svelte';
	import TrashIcon from './TrashIcon.svelte';
	import { flip } from 'svelte/animate';
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let value = 123;
	const BASE_64_CHARSET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/';
	let bases: Base[] = [
		{ id: 2, name: 'Base 2', charset: BASE_64_CHARSET.slice(0, 2), description: 'Classic binary!' },
		{ id: 8, name: 'Base 8', charset: BASE_64_CHARSET.slice(0, 8), description: 'Octal!' },
		{
			id: 10,
			name: 'Base 10',
			charset: BASE_64_CHARSET.slice(0, 10),
			description: 'Numbers like we see every day!'
		},
		{ id: 16, name: 'Base 16', charset: BASE_64_CHARSET.slice(0, 16), description: 'Hexadecimal!' },
		{
			id: 58,
			name: 'Base 58',
			charset: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
			description:
				'Every number and letter (uppercase and lowercase) except ones you might confuse for each other (0 and O, I and l)!'
		},
		{
			id: 62,
			name: 'Base 62',
			charset: BASE_64_CHARSET.slice(0, 62),
			description: 'Every number and letter (uppercase and lowercase)!'
		},
		{
			id: 64,
			name: 'Base 64',
			charset: BASE_64_CHARSET.slice(0, 64),
			description:
				'Every number and letter (uppercase and lowercase) plus "+" and "/" so it all rounds up to an even 64!'
		}
	];
	let customBases: Base[] = [];
	function swallowInvalidCharacter(e: KeyboardEvent, charset: string) {
		const char = e.key;

		if (!e.ctrlKey && !e.metaKey && char.length === 1 && !charset.includes(char)) {
			addMessage(`Cannot type "${char[0]}"`);
			e.preventDefault();
		}
	}
	function stripInvalidCharacters(str: string, charset: string) {
		return str
			.split('')
			.filter((char) => charset.includes(char))
			.join('');
	}
	const getNewBase = (): Base => ({
		id: new Date().valueOf(),
		name: 'Bracket Binary',
		charset: '()',
		description: 'Why not?'
	});
	let editingBase: Base | null = null;
	let highlightedBase: Base | null = null;
	let newBase: Base | null = null;
	function removeCustomAtIndex(index: number) {
		customBases = [...customBases.slice(0, index), ...customBases.slice(index + 1)];
	}
	function updateCustomAtIndex(index: number, base: Base) {
		customBases = [...customBases.slice(0, index), base, ...customBases.slice(index + 1)];
	}
	interface Toast {
		id: number;
		message: string;
	}
	let toasts: Toast[] = [];
	function addMessage(message: string) {
		const id = new Date().valueOf();
		toasts = [...toasts, { id, message }];
		setTimeout(() => {
			toasts = toasts.filter((o) => o.id !== id);
		}, 3000);
	}

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<section class="section">
	<h1 class="heading">Base converter</h1>
	<p class="subheading">Edit any one and watch the others change!</p>
	<div class="grid">
		{#each bases as base}
			<div class="cell label">
				<div class="name">{base.name}</div>
				<div class="icons">
					<button on:click={() => (highlightedBase = base)}>
						<InfoIcon />
					</button>
				</div>
			</div>
			<div class="cell input">
				<div
					contenteditable
					on:keydown={(e) => {
						swallowInvalidCharacter(e, base.charset);
					}}
					on:input={(e) => {
						value = fromBaseN(e.currentTarget.textContent ?? '', base.charset);
					}}
				>
					{toBaseN(value, base.charset)}
				</div>
			</div>
		{/each}
		{#each customBases as base, i}
			<div class="cell label">
				<div class="name">{base.name}</div>
				<div class="icons">
					<!-- <button on:click={() => (editingBase = base)}>
						<EditIcon />
					</button> -->
					<button on:click={() => removeCustomAtIndex(i)}>
						<TrashIcon />
					</button>
				</div>
			</div>
			<div class="cell input">
				<input
					type="text"
					value={toBaseN(value, base.charset)}
					on:keydown={(e) => swallowInvalidCharacter(e, base.charset)}
					on:input={(e) => {
						value = fromBaseN(e.currentTarget.value, base.charset);
					}}
				/>
			</div>
		{/each}
	</div>

	<div class="button-container">
		<button on:click={() => (newBase = getNewBase())} class="button">+ Add custom</button>
	</div>
</section>
<BaseModal bind:base={highlightedBase} readonly />
<BaseModal
	bind:base={newBase}
	onSubmit={() => {
		if (newBase) {
			customBases = [...customBases, newBase];
			newBase = null;
		}
	}}
/>

{#each toasts as toast, i (toast.id)}
	<div
		in:receive={{ key: toast.id }}
		out:send={{ key: toast.id }}
		class="toast"
		animate:flip
		style:bottom="{i * 3}em"
	>
		{toast.message}
	</div>
{/each}

<style lang="scss">
	.container {
		height: 300px;
		width: 300px;
	}
	.heading {
		font-size: 2rem;
		color: #999;
		font-weight: 300;
		margin-bottom: 2rem;
	}
	.subheading {
		font-size: 1.15rem;
		color: #999;
		font-weight: 300;
		margin-bottom: 5rem;
	}
	.section {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 64px;
		padding-bottom: 64px;
		overflow: auto;
	}
	.grid {
		width: 100%;
		max-width: 600px;
		display: grid;
		grid-template-columns: auto 1fr;
	}
	.cell {
		border-bottom: solid 1px hsla(0, 0, 0, 0.1);
		padding: 16px;
	}
	.label {
		border-right: solid 1px hsla(0, 0, 0, 0.1);
		color: #999;
		font-weight: 300;
	}
	.input {
		&:first-of-type {
			border-top: solid 1px hsla(0, 0, 0, 0.1);
		}
		font-size: 2rem;
		font-weight: 300;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		overflow: auto;
		overflow-wrap: anywhere;

		div {
			width: 100%;
		}
	}
	.label:hover .icons {
		opacity: 1;
	}
	.icons {
		display: flex;
		justify-content: space-between;
		margin-top: 4px;
		opacity: 0.5;
	}
	.icons button {
		cursor: pointer;
		&:hover {
			color: #666;
		}
	}

	.button-container {
		padding: 16px;
	}
	.button {
		color: #999;
		font-weight: 300;
		cursor: pointer;
		&:hover {
			color: #666;
		}
	}

	.toast {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #eee;
		border: solid 1px #ddd;
		padding: 8px;
		margin: 4px;
		border-radius: 4px;
		max-width: 500px;
		margin: auto;
		transition: bottom 0.3s;
	}
</style>
