<script>
	import { marked } from 'marked';

	let { value = $bindable(''), label = 'Content' } = $props();
	let showPreview = $state(false);

	let html = $derived(marked(value || ''));
</script>

<div class="editor">
	<div class="editor-header">
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label>{label}</label>
		<button type="button" class="toggle-preview" onclick={() => (showPreview = !showPreview)}>
			{showPreview ? 'Edit' : 'Preview'}
		</button>
	</div>

	{#if showPreview}
		<div class="preview markdown-body">{@html html}</div>
	{:else}
		<textarea bind:value placeholder="Write your post in Markdown..." rows="20"></textarea>
	{/if}
</div>

<style lang="scss">
	.editor {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.editor-header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		label {
			font-weight: 600;
			font-size: 0.9rem;
			color: #374151;
		}
	}

	.toggle-preview {
		background: none;
		border: 1px solid #d1d5db;
		padding: 0.3rem 0.75rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.85rem;
		color: #374151;

		&:hover {
			background-color: #f3f4f6;
		}
	}

	textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #d1d5db;
		border-radius: 6px;
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 0.9rem;
		line-height: 1.6;
		resize: vertical;
		box-sizing: border-box;

		&:focus {
			outline: none;
			border-color: #6366f1;
			box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.15);
		}
	}

	.preview {
		border: 1px solid #d1d5db;
		border-radius: 6px;
		padding: 1rem;
		min-height: 300px;
		line-height: 1.7;
	}
</style>
