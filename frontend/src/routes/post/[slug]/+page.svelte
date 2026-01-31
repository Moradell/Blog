<script>
	import { page } from '$app/stores';
	import { getPost } from '$lib/api.js';

	/** @type {any} */
	let post = $state(null);
	let loading = $state(true);
	let error = $state('');

	$effect(() => {
		const slug = $page.params.slug;
		getPost(slug)
			.then((data) => {
				post = data;
			})
			.catch((err) => {
				error = err.message;
			})
			.finally(() => {
				loading = false;
			});
	});

	/** @param {string} dateStr */
	function formatDate(dateStr) {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	{#if post}
		<title>{post.title} - Blog</title>
	{/if}
</svelte:head>

{#if loading}
	<p class="status">Loading...</p>
{:else if error}
	<p class="status error">{error}</p>
{:else if post}
	<article>
		<header>
			<time datetime={post.created_at}>{formatDate(post.created_at)}</time>
			<h1>{post.title}</h1>
		</header>
		<div class="markdown-body">
			{@html post.html_content}
		</div>
	</article>
{/if}

<style lang="scss">
	.status {
		text-align: center;
		color: #6b7280;
		padding: 3rem 0;
	}

	.error {
		color: #dc2626;
	}

	article header {
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid #e5e7eb;

		time {
			font-size: 0.85rem;
			color: #6b7280;
		}

		h1 {
			margin-top: 0.25rem;
			font-size: 2rem;
			font-weight: 700;
			line-height: 1.3;
		}
	}
</style>
