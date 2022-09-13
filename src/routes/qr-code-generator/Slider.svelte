<script lang="ts">
	interface $$Props extends Omit<svelte.JSX.HTMLAttributes<HTMLInputElement>, 'value'> {
		value: number;
		thumbcolor: string;
		trackcolor: string;
	}
	export let value: number;
	export let thumbcolor: string;
	export let trackcolor: string;
</script>

<input
	type="range"
	class="slider"
	id="myRange"
	{...$$restProps}
	bind:value
	style:--color-track={trackcolor}
	style:--color-thumb={thumbcolor}
/>

<style lang="scss">
	:root {
		--color-track: #d3d3d3;
		--color-thumb: #04aa6d;
	}
	.slider {
		-webkit-appearance: none;
		width: 100%;
		height: 0.25em;
		background: #d3d3d3;
		background: var(--color-track);
		outline: none;
		-webkit-transition: 0.2s;
		transition: opacity 0.2s;
		border-radius: 1em;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 1em;
		height: 1em;
		border-radius: 1em;
		background: var(--color-thumb);
		background: white;
		cursor: pointer;
	}

	.slider::-moz-range-thumb {
		width: 1em;
		height: 1em;
		background: var(--color-thumb);
		cursor: pointer;
	}
</style>
