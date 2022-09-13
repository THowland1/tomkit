<script lang="ts">
	import Eye from './icons/Eye.svelte';
	import EyeSlash from './icons/EyeSlash.svelte';

	export let checked: boolean;
</script>

<label class="label">
	<input class="no-appearance" type="checkbox" bind:checked />
	{#if checked}
		<Eye />
	{:else}
		<EyeSlash />
	{/if}
</label>

<style lang="scss">
	.no-appearance {
		position: absolute;
		opacity: 0;
	}
	.label {
		cursor: pointer;
		display: flex;
		align-items: center;
	}
</style>
