<script lang="ts">
	import { page } from '$app/stores';
	import Link from './icons/Link.svelte';
	import Identification from './icons/Identification.svelte';
	import Preview from './Preview.svelte';
	import { setContentContext } from './content-context';
	import QrCodeIcon from './icons/QRCodeIcon.svelte';
	import XMark from './icons/XMark.svelte';

	setContentContext();

	let showPreview = false;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<section class="section">
	<div class="content-container">
		<div class="content">
			<div class="switcher">
				<a
					class="switcher-item"
					href="/qr-code-generator/text"
					class:active={$page.url.pathname === '/qr-code-generator/text'}>Tt</a
				>
				<a
					class="switcher-item"
					href="/qr-code-generator/link"
					class:active={$page.url.pathname === '/qr-code-generator/link'}><Link /></a
				>
				<a
					class="switcher-item"
					href="/qr-code-generator/vcard"
					class:active={$page.url.pathname === '/qr-code-generator/vcard'}><Identification /></a
				>
			</div>
			<div class="form">
				<slot />
			</div>
		</div>
	</div>

	<div class="preview-container" class:show={showPreview}>
		<button class="button" on:click={() => (showPreview = !showPreview)}>
			{#if showPreview}
				<XMark />
			{:else}
				<QrCodeIcon />
			{/if}
		</button>
		<div class="preview">
			<Preview />
		</div>
	</div>
</section>

<style lang="scss">
	:root {
		--color-bg: #ebf7ff;
		--color-bg-paper: #ffffff;
		--color-blue-200: #2851b8;
		--color-blue-400: #1e49b3;
		--color-blue-600: #123aa0;
		--color-blue-800: #00298a;
		--color-muted-text-on-dark: #899fc5;
		--color-muted-text-on-light: #899fc5;
		--color-very-muted-text-on-light: #9eb1d3;
		--color-text-on-light: #ffffff;
		--color-text-on-dark: #ffffff;
		--color-sky-400: #3dbcf9;
		--color-sky-500: #3ab4f3;
		--color-orange-300: #ff9b05;
		--color-orange-400: #f39519;
		--radius: 32px;
		--shadow: 0 1px 2px rgb(0 0 0 / 0.1), 0 1px 1px rgb(0 0 0 / 0.06);
		--shadow-lg: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
		--width-switcher: 64px;
		--width-switcher-item: 48px;
		--width-preview: 400px;
		--padding: 32px;

		background-color: var(--color-bg);
	}

	.section {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		overflow: hidden;
		max-width: 1024px;
		margin: auto;
	}
	.content-container {
		overflow: auto;
		width: 100%;
	}
	.content {
		margin: 0 auto;
		padding: 32px;
		overflow: auto;
		display: flex;
		flex-direction: column;

		height: 100%;
	}
	.switcher {
		background-color: var(--color-bg-paper);
		box-shadow: var(--shadow);
		border-radius: var(--radius);
		width: var(--width-switcher);
		padding: 2px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;

		.switcher-item {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 100vw;
			width: var(--width-switcher-item);
			height: var(--width-switcher-item);
			color: var(--color-muted-text-on-light);
			font-size: 1.2rem;
			margin-top: 8px;
			margin-bottom: 8px;
			&:hover {
				box-shadow: var(--shadow-lg);
			}
			&.active {
				background-color: var(--color-blue-400);
				box-shadow: var(--shadow-lg);
				color: var(--color-text-on-dark);
			}
		}
	}
	.form {
		flex: 1;
		padding-top: 16px;
		padding-bottom: 16px;
	}

	.preview-container {
		padding: 32px;

		.button {
			display: none;
		}
	}
	@media only screen and (max-width: 800px) {
		.section {
			padding-bottom: 100px;
		}
		.preview-container {
			position: absolute;
			margin: auto;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			transform: translateY(calc(100% - 32px));
			transition: transform 0.3s;
			padding: 0;

			&.show {
				transform: translateY(32px);
			}

			.button {
				display: inherit;
				position: absolute;
				top: -32px;
				left: 0;
				right: 0;
				height: 64px;
				width: 64px;
				margin: auto;
				border-radius: 64px;

				background-color: var(--color-blue-800);
				color: var(--color-text-on-dark);

				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
	.preview {
		border-radius: var(--radius);
		background-color: var(--color-blue-800);
		width: 100%;
		max-width: var(--width-preview);
		height: 100%;
		padding: var(--padding);
		display: flex;
		flex-direction: column;
		gap: 32px;
		margin: auto;
		overflow: auto;
	}
</style>
