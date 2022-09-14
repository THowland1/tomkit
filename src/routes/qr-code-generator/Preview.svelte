<script lang="ts">
	import QRCode from 'qrcode-svg';

	import { getContentContext } from './content-context';

	import Details from './Details.svelte';
	import FgSquareInSquare from './icons/FGSquareInSquare.svelte';
	import BgSquareInSquare from './icons/BGSquareInSquare.svelte';
	import SquareInSquare from './icons/SquareInSquare.svelte';
	import ImageHelper from './image-helper';
	import SwitchCheckbox from './SwitchCheckbox.svelte';
	import ArrowDownTray from './icons/ArrowDownTray.svelte';
	import DocumentDuplicate from './icons/DocumentDuplicate.svelte';
	import Slider from './Slider.svelte';
	import ArrowsPointingOut from './icons/ArrowsPointingOut.svelte';
	let color = '#ffffff';
	let background = '#000000';
	let showPadding = false;
	let showColor = true;
	let showBg = false;
	let showWidth = false;
	let padding = 3;
	let width = 128;
	const content = getContentContext();

	$: options = {
		content: $content || "It's empty, what do you expect?",
		background: showBg ? background : 'transparent',
		color: showColor ? color : 'white',
		padding: showPadding ? Math.max(padding, 0) : 0,
		width: showWidth ? Math.max(width, 0) : 128,
		height: showWidth ? Math.max(width, 0) : 128
	} as QRCode.Options;
	$: qrcode = new QRCode(options);
	$: svgstring = qrcode.svg();
	$: imagehelper = new ImageHelper();
</script>

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
			<div class="field slider-field" class:disabled={!showWidth}>
				<div class="field-icon">
					<ArrowsPointingOut />
				</div>
				<div class="field-inputs">
					<div class="slider-container">
						<Slider
							min="32"
							max="256"
							bind:value={width}
							thumbcolor="currentColor"
							trackcolor="var(--color-blue-200)"
						/>
					</div>
					<input class="number" type="number" bind:value={width} />
				</div>
				<div class="field-toggle">
					<SwitchCheckbox bind:checked={showWidth} />
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

<style lang="scss">
	.settings {
		flex: 1;
	}

	.qr-svg-container {
		display: flex;
		justify-content: center;
	}

	.buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;

		.button {
			white-space: nowrap;
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
