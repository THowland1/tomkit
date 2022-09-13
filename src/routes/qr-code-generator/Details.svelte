<script lang="ts">
	import ChevronDown from './icons/ChevronDown.svelte';

	export let title: string;
	export let color: string;
	export let background: string;
	export let borderRadius: string;
	let open = false;
	let contentsHeight = 0;
	$: containerHeight = open ? contentsHeight : 0;
</script>

<div style:color style:background class="whole-thing" style:border-radius={borderRadius}>
	<label class="heading">
		<input class="no-appearance" type="checkbox" bind:checked={open} />
		<div class="title">{title}</div>
		<div class="chevron" class:upsidedown={open}>
			<ChevronDown />
		</div>
	</label>
	<div class="contents-container" style:height="{containerHeight}px">
		<div class="contents" bind:clientHeight={contentsHeight}>
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	.no-appearance {
		position: absolute;
		opacity: 0;
	}
	.contents-container {
		overflow-y: hidden;
		transition: height 0.15s ease-in-out;
	}
	.heading {
		cursor: pointer;
		display: flex;
		align-items: center;
		padding: 16px;
		.title {
			flex: 1;
			font-size: 0.8em;
		}
	}
	.contents {
		padding: 16px;
		padding-top: 0;
	}
	.chevron {
		transform: rotate(0);
		transition: transform 0.15s ease-in-out;
		&.upsidedown {
			transform: rotate(0.5turn);
		}
	}
</style>
