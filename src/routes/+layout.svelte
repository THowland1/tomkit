<script lang="ts">
	import '../reset.css';
	import '../app.css';
	import Header from '$lib/header/Header.svelte';
</script>

<div class="body">
	<header class="header">
		<Header />
	</header>
	<main class="main">
		<slot />
	</main>
</div>

<style>
	.body {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;
		flex-direction: column;
	}
	.main {
		flex: 1;
		position: relative;
	}
</style>
