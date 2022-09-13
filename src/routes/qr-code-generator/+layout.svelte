<script lang="ts">
	import { page } from '$app/stores';
	import Details from './Details.svelte';
	import ArrowDownTray from './icons/ArrowDownTray.svelte';
	import QRCode from 'qrcode-svg';
	import ImageHelper from './image-helper';
	import DocumentDuplicate from './icons/DocumentDuplicate.svelte';
	import SquareInSquare from './icons/SquareInSquare.svelte';
	import Slider from './Slider.svelte';
	import FgSquareInSquare from './icons/FGSquareInSquare.svelte';
	import BgSquareInSquare from './icons/BGSquareInSquare.svelte';
	import SwitchCheckbox from './SwitchCheckbox.svelte';
	import Link from './icons/Link.svelte';
	import { setContentContext } from './content-context';
	import Identification from './icons/Identification.svelte';

	let color = '#ffffff';
	let background = '#000000';
	let showPadding = false;
	let showColor = true;
	let showBg = false;
	let padding = 3;
	const content = setContentContext();
	$: options = {
		content: $content || 'default',
		background: showBg ? background : 'transparent',
		color: showColor ? color : 'white',
		padding: showPadding ? Math.max(padding, 0) : 0
	} as QRCode.Options;
	$: qrcode = new QRCode(options);
	$: svgstring = qrcode.svg();
	$: imagehelper = new ImageHelper();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<section class="section">
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
	<div class="preview">
		<div class="qr-svg-container">
			{@html svgstring}
		</div>
		<div class="settings">
			<Details
				title="SHAPE & COLOR"
				color="var(--color-text-on-dark)"
				background="var(--color-blue-600)"
				borderRadius="8px"
			>
				<div class="fields">
					<div class="field color-field" class:disabled={!showColor}>
						<div class="field-icon">
							<FgSquareInSquare />
						</div>
						<div class="field-inputs">
							<label class="color-label" style:background-color={color}>
								<input type="color" bind:value={color} />
							</label>
							<input class="text" type="text" bind:value={color} />
						</div>
						<div class="field-toggle">
							<SwitchCheckbox bind:checked={showColor} />
						</div>
					</div>
					<div class="field color-field" class:disabled={!showBg}>
						<div class="field-icon">
							<BgSquareInSquare />
						</div>
						<div class="field-inputs">
							<label class="color-label" style:background-color={background}>
								<input type="color" bind:value={background} />
							</label>
							<input class="text" type="text" bind:value={background} />
						</div>
						<div class="field-toggle">
							<SwitchCheckbox bind:checked={showBg} />
						</div>
					</div>
					<div class="field slider-field" class:disabled={!showPadding}>
						<div class="field-icon">
							<SquareInSquare />
						</div>
						<div class="field-inputs">
							<div class="slider-container">
								<Slider
									min="0"
									max="10"
									bind:value={padding}
									thumbcolor="currentColor"
									trackcolor="var(--color-blue-200)"
								/>
							</div>
							<input class="number" type="number" bind:value={padding} />
						</div>
						<div class="field-toggle">
							<SwitchCheckbox bind:checked={showPadding} />
						</div>
					</div>
				</div>
			</Details>
		</div>
		<div class="buttons">
			<button class="button primary" on:click={() => imagehelper.downloadPNG(svgstring)}
				><ArrowDownTray />Download PNG</button
			>
			<button class="button secondary" on:click={() => imagehelper.downloadSVG(svgstring)}
				><ArrowDownTray />Download SVG</button
			>
			<button class="button primary" on:click={() => imagehelper.copyPNGToClipboard(svgstring)}
				><DocumentDuplicate />Copy PNG</button
			>
			<button class="button secondary" on:click={() => imagehelper.copySVGToClipboard(svgstring)}
				><DocumentDuplicate />Copy SVG</button
			>
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
	}

	.section {
		background-color: var(--color-bg);
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		padding: 32px;
	}
	.switcher {
		background-color: var(--color-bg-paper);
		box-shadow: var(--shadow);
		border-radius: var(--radius);
		width: var(--width-switcher);
		padding: 2px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

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
		padding: var(--padding);
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

		.settings {
			flex: 1;
		}

		.qr-svg-container {
			display: flex;
			justify-content: center;
		}
	}

	.buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;

		.button {
			color: var(--color-text-on-dark);
			border-radius: 100vw;
			padding: 16px;
			padding-left: 16px;
			padding-right: 24px;
			font-size: 0.8em;
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 4px;
			cursor: pointer;

			&.primary {
				background-color: var(--color-sky-400);
				&:hover {
					background-color: var(--color-sky-500);
				}
			}
			&.secondary {
				background-color: var(--color-orange-300);
				&:hover {
					background-color: var(--color-orange-400);
				}
			}
		}
	}
	.fields {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.field {
		display: flex;
		align-items: center;
		font-weight: 300;
		gap: 16px;
		font-family: monospace;
		font-size: 16px;

		.field-icon {
			color: var(--color-muted-text-on-dark);
			display: flex;
			align-items: center;
		}

		.field-inputs {
			flex: 1;
			display: flex;
			align-items: center;
		}

		.slider-container {
			flex: 2;
			display: flex;
			align-items: center;
		}
		.number {
			flex: 1;
		}

		&.disabled {
			.field-inputs {
				cursor: inherit;
				pointer-events: none;
				opacity: 0.25;
			}
		}
	}
	.color-field {
		.text {
			width: 7ch;
		}
		.color-label {
			width: 1.15em;
			height: 1.15em;
			margin-right: 8px;
			input {
				position: absolute;
				opacity: 0;
				pointer-events: none;
			}
		}
	}
</style>
