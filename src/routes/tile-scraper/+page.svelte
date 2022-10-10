<script lang="ts">
	import ImageHelper from './image-helper';
	import Slider from './Slider.svelte';
	import { TileScraper } from './tile-scraper';

	let canvas: HTMLCanvasElement | null = null;
	let url = 'https://micrio-cdn.vangoghmuseum.nl/ZKSPH/0/%x-%y.jpg';
	$: tileScraper = new TileScraper(url);
	const imagehelper = new ImageHelper();

	let state: 'unstarted' | 'loading' | 'success' | 'error' = 'unstarted';

	async function draw() {
		state = 'loading';
		try {
			if (!canvas) {
				canvas = document.createElement('canvas');
			}
			await tileScraper.build(canvas);
			state = 'success';
		} catch (error) {
			console.log(error);
			state = 'error';
		}
	}

	$: showimage = state === 'success';
	let scale = 1;
</script>

<svelte:head>
	<title>Tile scraper</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<div class="container">
	<h1>Tile Scraper</h1>
	<div>
		<div class="label">URL</div>
		<div class="help">must contain %x and %y for x and y coordinates</div>
	</div>
	<div>
		<input type="text" bind:value={url} />
	</div>
	<div>
		<button class="button primary" on:click={() => draw()}>DRAW ME</button>
	</div>

	<div class="canvas-container" class:empty={!showimage}>
		<canvas bind:this={canvas} class:hidden={!showimage} style:--scale={scale} />
		<div class="canvas-overlay">
			<div>
				{#if state === 'unstarted'}
					Click "Draw me" to give it a go
				{/if}
				{#if state === 'loading'}
					Drawing...
				{/if}
				{#if state === 'error'}
					Uh oh, something went wrong
				{/if}
			</div>
		</div>
	</div>
	{#if showimage}
		<div class="slider-container">
			<Slider
				min="1"
				max="50"
				bind:value={scale}
				thumbcolor="white"
				trackcolor="var(--color-very-muted-text-on-light)"
			/>
		</div>
		<div class="buttons">
			<button
				class="button primary"
				on:click={() => {
					if (canvas) {
						return imagehelper.copyCanvasAsPNGToClipboard(canvas);
					}
				}}>COPY TO CLIPBOARD</button
			>
			<button
				class="button secondary"
				on:click={() => {
					if (canvas) {
						return imagehelper.downloadCanvasAsPNG(canvas);
					}
				}}>DOWNLOAD</button
			>
		</div>
	{/if}
</div>

<style lang="scss">
	.hidden {
		display: none !important;
	}
	.container {
		width: 100%;
		max-width: 800px;
		margin: auto;
		padding: 16px;

		> * {
			margin-top: 16px;
			margin-bottom: 16px;
		}
	}
	.canvas-container {
		background-color: var(--color-blue-800);
		border-radius: 32px;
		padding: 32px;
		position: relative;

		overflow: hidden;

		&.empty {
			min-height: 300px;
		}

		.canvas-overlay {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
			display: grid;
			place-items: center;
			color: var(--color-muted-text-on-dark);
			pointer-events: none;
		}
	}
	.slider-container {
		display: grid;
		place-items: center;
		color: var(--color-muted-text-on-dark);
		height: 64px;
		border-radius: 64px;
		padding-left: 32px;
		padding-right: 32px;
		box-shadow: var(--shadow);
	}
	h1 {
		font-weight: 600;
		font-size: 2.5rem;
		color: var(--color-blue-800);
	}
	.label {
		font-weight: 600;
		font-size: 1.5rem;
		color: var(--color-blue-800);
	}
	.help {
		color: var(--color-muted-text-on-light);
	}
	input {
		width: 100%;

		border: solid 1px #ccc;
		padding: 8px 12px;
		border-radius: 4px;
	}
	.buttons {
		display: flex;
		gap: 16px;
		border-radius: 64px;
		padding: 16px;
		box-shadow: var(--shadow);
	}
	.button {
		white-space: nowrap;
		color: var(--color-text-on-dark);
		border-radius: 100vw;
		padding: 16px;
		padding-left: 24px;
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
	canvas {
		transform: scale(var(--scale));
		width: 100%;
	}
</style>
