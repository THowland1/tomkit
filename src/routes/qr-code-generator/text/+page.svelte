<script lang="ts">
	import { getContentContext } from '../content-context';

	const content = getContentContext();
	const defaultContent = 'Edit your text here';
	$content = defaultContent;
	$: {
		if ($content === '') {
			$content = defaultContent;
		}
	}
</script>

<div class="whole-thing">
	<h2 class="h2">Text</h2>
	<textarea class="input" type="text" bind:value={$content} />
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
	.input {
		line-height: 1.5;
		font-size: 2rem;
		color: #253956;
		border-bottom: solid 1px var(--color-muted-text-on-light);
	}
</style>
