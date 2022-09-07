<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	if (browser) {
		goto('/base-converter');
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<style lang="scss">
</style>
