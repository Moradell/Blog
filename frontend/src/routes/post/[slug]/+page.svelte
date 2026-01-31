<script>
	let { data } = $props();

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
	<title>{data.post.title} - Blog</title>
</svelte:head>

<article>
	<header>
		<time datetime={data.post.created_at}>{formatDate(data.post.created_at)}</time>
		<h1>{data.post.title}</h1>
	</header>
	<div class="markdown-body">
		{@html data.post.html_content}
	</div>
</article>

<style lang="scss">
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
