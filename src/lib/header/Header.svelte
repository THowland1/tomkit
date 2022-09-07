<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="header">
	<div class="header-content">
		<a class="wordmark" href="/">TOMKIT</a>
		<nav data-sveltekit-prefetch>
			<ul class="links">
				<li class:active={$page.url.pathname === '/base-converter'}>
					<a href="/base-converter">Base Converter</a>
				</li>
			</ul>
		</nav>
	</div>
</div>

<style>
	.header {
		display: flex;
		justify-content: center;
		background-color: black;
		color: white;
		height: 3rem;
		align-items: center;
		padding-left: 12px;
		padding-right: 12px;
	}
	.wordmark {
		font-weight: 700;
		font-size: 1.5rem;
	}
	.header-content {
		display: flex;
		justify-content: space-between;
		background-color: black;
		color: white;
		max-width: 600px;
		align-items: center;
		flex: 1;
	}
	.links {
		display: flex;
		justify-content: space-between;
		background-color: black;
		color: white;
		max-width: 600px;
		flex: 1;
	}

	.active {
		text-decoration: underline;
		text-decoration-thickness: 2px;
	}
</style>
