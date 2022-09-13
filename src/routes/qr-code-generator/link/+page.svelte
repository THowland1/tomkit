<script lang="ts">
	import { getContentContext } from '../content-context';

	const content = getContentContext();
	const defaultContent = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
	$content = defaultContent;
	$: {
		if ($content === '') {
			$content = defaultContent;
		}
	}
	let pretend: HTMLInputElement;
	let fontscale = 1;
</script>

<div class="whole-thing">
	<h2 class="h2">Link</h2>
	<div class="input-container">
		<input
			class="input"
			type="text"
			bind:value={$content}
			style:font-size="{fontscale}em"
			on:input={() => (fontscale = pretend.clientWidth / pretend.scrollWidth)}
		/>
		<input class="pretend input" type="text" value={$content} bind:this={pretend} />
	</div>
</div>

<style lang="scss">
	.whole-thing {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
	}
	.h2 {
		color: var(--color-blue-400);
		font-size: 3rem;
		font-weight: 600;
		margin-bottom: 16px;
	}
	.input-container {
		position: relative;
		font-size: 2rem;
		.input {
			width: 100%;
			line-height: 1.5;
			color: #253956;
			border-bottom: solid 1px var(--color-muted-text-on-light);
		}
		.pretend {
			position: absolute;
			top: 0rem;
			bottom: 0rem;
			left: 0;
			right: 0;
			pointer-events: none;
			opacity: 0;
		}
	}
</style>
