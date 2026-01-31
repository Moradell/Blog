<script>
	import { goto } from '$app/navigation';
	import { getAllPosts, createPost, deletePost } from '$lib/api.js';
	import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';

	let apiKey = $state('');
	let authenticated = $state(false);
	/** @type {any[]} */
	let posts = $state([]);
	let error = $state('');

	// New post form
	let title = $state('');
	let slug = $state('');
	let excerpt = $state('');
	let content = $state('');
	let published = $state(false);
	let saving = $state(false);

	$effect(() => {
		const stored = localStorage.getItem('blog_api_key');
		if (stored) {
			apiKey = stored;
			authenticate();
		}
	});

	async function authenticate() {
		error = '';
		try {
			posts = await getAllPosts(apiKey);
			authenticated = true;
			localStorage.setItem('blog_api_key', apiKey);
		} catch (err) {
			error = 'Invalid API key';
			authenticated = false;
		}
	}

	function logout() {
		localStorage.removeItem('blog_api_key');
		authenticated = false;
		apiKey = '';
		posts = [];
	}

	function generateSlug() {
		slug = title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
	}

	async function handleCreate() {
		error = '';
		saving = true;
		try {
			await createPost(apiKey, { title, slug, content, excerpt, published });
			title = '';
			slug = '';
			content = '';
			excerpt = '';
			published = false;
			posts = await getAllPosts(apiKey);
		} catch (/** @type {any} */ err) {
			error = err.message;
		} finally {
			saving = false;
		}
	}

	/** @param {string} postSlug */
	async function handleDelete(postSlug) {
		if (!confirm('Delete this post?')) return;
		try {
			await deletePost(apiKey, postSlug);
			posts = await getAllPosts(apiKey);
		} catch (/** @type {any} */ err) {
			error = err.message;
		}
	}

	/** @param {string} dateStr */
	function formatDate(dateStr) {
		return new Date(dateStr).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Admin - Blog</title>
</svelte:head>

{#if !authenticated}
	<div class="auth">
		<h1>Admin</h1>
		<form onsubmit={(e) => { e.preventDefault(); authenticate(); }}>
			<input type="password" bind:value={apiKey} placeholder="API Key" />
			<button type="submit">Login</button>
		</form>
		{#if error}
			<p class="error">{error}</p>
		{/if}
	</div>
{:else}
	<div class="admin">
		<div class="admin-header">
			<h1>Admin</h1>
			<button class="btn-logout" onclick={logout}>Logout</button>
		</div>

		{#if error}
			<p class="error">{error}</p>
		{/if}

		<section class="create-form">
			<h2>New Post</h2>
			<form onsubmit={(e) => { e.preventDefault(); handleCreate(); }}>
				<div class="field">
					<label for="title">Title</label>
					<input id="title" bind:value={title} oninput={generateSlug} placeholder="Post title" />
				</div>
				<div class="field">
					<label for="slug">Slug</label>
					<input id="slug" bind:value={slug} placeholder="post-slug" />
				</div>
				<div class="field">
					<label for="excerpt">Excerpt</label>
					<textarea id="excerpt" bind:value={excerpt} rows="2" placeholder="Brief description..."></textarea>
				</div>
				<MarkdownEditor bind:value={content} />
				<div class="actions">
					<label class="checkbox">
						<input type="checkbox" bind:checked={published} />
						Publish
					</label>
					<button type="submit" class="btn-primary" disabled={saving || !title || !slug}>
						{saving ? 'Saving...' : 'Create Post'}
					</button>
				</div>
			</form>
		</section>

		<section class="posts-list">
			<h2>Posts</h2>
			{#if posts.length === 0}
				<p class="empty">No posts yet.</p>
			{:else}
				{#each posts as post (post.id)}
					<div class="post-row">
						<div class="post-info">
							<strong>{post.title}</strong>
							<span class="meta">
								{formatDate(post.created_at)}
								{#if !post.published}
									<span class="draft">Draft</span>
								{/if}
							</span>
						</div>
						<div class="post-actions">
							<button onclick={() => goto(`/admin/edit/${post.slug}`)}>Edit</button>
							<button class="btn-danger" onclick={() => handleDelete(post.slug)}>Delete</button>
						</div>
					</div>
				{/each}
			{/if}
		</section>
	</div>
{/if}

<style lang="scss">
	.auth {
		max-width: 320px;
		margin: 4rem auto;
		text-align: center;

		h1 {
			margin-bottom: 1.5rem;
		}

		form {
			display: flex;
			gap: 0.5rem;
		}

		input {
			flex: 1;
			padding: 0.5rem 0.75rem;
			border: 1px solid #d1d5db;
			border-radius: 6px;
			font-size: 0.9rem;
		}

		button {
			padding: 0.5rem 1rem;
			background: #6366f1;
			color: #fff;
			border: none;
			border-radius: 6px;
			cursor: pointer;

			&:hover {
				background: #4f46e5;
			}
		}
	}

	.error {
		color: #dc2626;
		font-size: 0.9rem;
		margin-top: 0.5rem;
	}

	.admin-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	.btn-logout {
		background: none;
		border: 1px solid #d1d5db;
		padding: 0.3rem 0.75rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.85rem;
		color: #6b7280;

		&:hover {
			background: #f3f4f6;
		}
	}

	.create-form {
		margin-bottom: 3rem;

		h2 {
			margin-bottom: 1rem;
			font-size: 1.2rem;
		}

		form {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
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

	.posts-list {
		h2 {
			margin-bottom: 1rem;
			font-size: 1.2rem;
		}

		.empty {
			color: #6b7280;
		}
	}

	.post-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 0;
		border-bottom: 1px solid #e5e7eb;
	}

	.post-info {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;

		.meta {
			font-size: 0.8rem;
			color: #6b7280;
		}
	}

	.draft {
		background: #fef3c7;
		color: #92400e;
		padding: 0.1rem 0.4rem;
		border-radius: 3px;
		font-size: 0.75rem;
		margin-left: 0.35rem;
	}

	.post-actions {
		display: flex;
		gap: 0.5rem;

		button {
			padding: 0.3rem 0.6rem;
			border: 1px solid #d1d5db;
			background: #fff;
			border-radius: 4px;
			font-size: 0.8rem;
			cursor: pointer;

			&:hover {
				background: #f3f4f6;
			}
		}
	}

	.btn-danger {
		color: #dc2626 !important;
		border-color: #fca5a5 !important;

		&:hover {
			background: #fef2f2 !important;
		}
	}
</style>
