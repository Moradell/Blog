<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getPost, updatePost, deletePost } from '$lib/api.js';
	import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';

	let apiKey = $state('');
	let loading = $state(true);
	let saving = $state(false);
	let error = $state('');

	let title = $state('');
	let slug = $state('');
	let excerpt = $state('');
	let content = $state('');
	let published = $state(false);

	$effect(() => {
		apiKey = localStorage.getItem('blog_api_key') || '';
		if (!apiKey) {
			goto('/admin');
			return;
		}
		const postSlug = $page.params.slug;
		getPost(postSlug)
			.then((data) => {
				title = data.title;
				slug = data.slug;
				excerpt = data.excerpt;
				content = data.content;
				published = data.published;
			})
			.catch((err) => {
				error = err.message;
			})
			.finally(() => {
				loading = false;
			});
	});

	async function handleSave() {
		error = '';
		saving = true;
		try {
			const originalSlug = $page.params.slug;
			await updatePost(apiKey, originalSlug, { title, slug, content, excerpt, published });
			goto('/admin');
		} catch (/** @type {any} */ err) {
			error = err.message;
		} finally {
			saving = false;
		}
	}

	async function handleDelete() {
		if (!confirm('Delete this post?')) return;
		try {
			await deletePost(apiKey, $page.params.slug);
			goto('/admin');
		} catch (/** @type {any} */ err) {
			error = err.message;
		}
	}
</script>

<svelte:head>
	<title>Edit: {title} - Blog</title>
</svelte:head>

{#if loading}
	<p class="status">Loading...</p>
{:else}
	<div class="edit-page">
		<div class="edit-header">
			<h1>Edit Post</h1>
			<a href="/admin">&larr; Back</a>
		</div>

		{#if error}
			<p class="error">{error}</p>
		{/if}

		<form onsubmit={(e) => { e.preventDefault(); handleSave(); }}>
			<div class="field">
				<label for="title">Title</label>
				<input id="title" bind:value={title} />
			</div>
			<div class="field">
				<label for="slug">Slug</label>
				<input id="slug" bind:value={slug} />
			</div>
			<div class="field">
				<label for="excerpt">Excerpt</label>
				<textarea id="excerpt" bind:value={excerpt} rows="2"></textarea>
			</div>
			<MarkdownEditor bind:value={content} />
			<div class="actions">
				<div class="left">
					<label class="checkbox">
						<input type="checkbox" bind:checked={published} />
						Published
					</label>
					<button type="button" class="btn-danger" onclick={handleDelete}>Delete</button>
				</div>
				<button type="submit" class="btn-primary" disabled={saving}>
					{saving ? 'Saving...' : 'Save'}
				</button>
			</div>
		</form>
	</div>
{/if}

<style lang="scss">
	.status {
		text-align: center;
		color: #6b7280;
		padding: 3rem 0;
	}

	.error {
		color: #dc2626;
		font-size: 0.9rem;
		margin-bottom: 1rem;
	}

	.edit-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;

		h1 {
			font-size: 1.5rem;
		}

		a {
			font-size: 0.9rem;
			text-decoration: none;
			color: #6b7280;

			&:hover {
				color: #111827;
			}
		}
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;

		label {
			font-weight: 600;
			font-size: 0.9rem;
			color: #374151;
		}

		input,
		textarea {
			padding: 0.5rem 0.75rem;
			border: 1px solid #d1d5db;
			border-radius: 6px;
			font-size: 0.9rem;
			font-family: inherit;

			&:focus {
				outline: none;
				border-color: #6366f1;
				box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.15);
			}
		}
	}

	.actions {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left {
			display: flex;
			align-items: center;
			gap: 1rem;
		}
	}

	.checkbox {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
		cursor: pointer;

		input {
			width: 16px;
			height: 16px;
		}
	}

	.btn-primary {
		padding: 0.5rem 1.25rem;
		background: #6366f1;
		color: #fff;
		border: none;
		border-radius: 6px;
		font-size: 0.9rem;
		cursor: pointer;

		&:hover {
			background: #4f46e5;
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}

	.btn-danger {
		padding: 0.3rem 0.6rem;
		border: 1px solid #fca5a5;
		background: #fff;
		color: #dc2626;
		border-radius: 4px;
		font-size: 0.85rem;
		cursor: pointer;

		&:hover {
			background: #fef2f2;
		}
	}
</style>
