<script lang="ts">
	import clickOutside from '$lib/directives/click-outside';

	import type { Base } from './Base';

	export let base: Base | null;
	export let onSubmit = () => {};
	export let readonly = false;
</script>

<div class:show={base} class="modal-bg">
	<div class="modal" use:clickOutside on:click_outside={() => (base = null)}>
		{#if base}
			<div class="form">
				<div class="title">{base.name}</div>
				<div class="fields">
					<label class="form-cell">Name</label>
					{#if readonly}
						<div class="form-cell">{base.name}</div>
					{:else}
						<div class="form-cell" contenteditable bind:textContent={base.name} />
					{/if}
					<label class="form-cell">Charset</label>
					{#if readonly}
						<div class="form-cell charset">{base.charset}</div>
					{:else}
						<div class="form-cell charset" contenteditable bind:textContent={base.charset} />
					{/if}
					<label class="form-cell" />
					{#if readonly}
						<div class="form-cell description">{base.description}</div>
					{:else}
						<div
							class="form-cell description"
							contenteditable
							bind:textContent={base.description}
						/>
					{/if}
				</div>
			</div>
			{#if !readonly}
				<div class="button-container">
					<button on:click={onSubmit} class="button">Add</button>
				</div>
			{/if}
			<div class="button-container">
				<button on:click={() => (base = null)} class="button">Cancel</button>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.form {
		padding: 16px;
		min-width: 300px;

		.title {
			color: #999;
			text-align: center;
			font-size: 0.8rem;
			text-transform: uppercase;
			letter-spacing: 0.5px;
		}
		.fields {
			display: grid;
			grid-template-columns: auto 1fr;
		}
		.form-cell {
			border-bottom: solid 1px hsla(0, 0, 0, 0.1);
			padding: 8px;
			opacity: 0.7;
			&[contenteditable] {
				opacity: 1;
			}
		}
		label {
			color: #999;
			font-size: 0.8rem;
			border-right: solid 1px hsla(0, 0, 0, 0.1);
		}
	}

	.button-container {
		padding: 16px;
		display: flex;
		justify-content: center;
	}
	.button {
		color: #999;
		font-weight: 300;
		cursor: pointer;
		&:hover {
			color: #666;
		}
	}

	.modal-bg {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: #0003;
		opacity: 0;
		transition: opacity 0.3s;
		display: flex;
		pointer-events: none;

		&.show {
			opacity: 1;
			pointer-events: all;
		}
	}
	.charset {
		overflow-wrap: anywhere;
		font-family: monospace;
	}
	.description {
		height: 4em;
	}
	.modal {
		background-color: #fff;
		border-radius: 4px;
		max-width: 700px;
	}
</style>
