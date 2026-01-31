<script>
	let { post } = $props();

	/** @param {string} dateStr */
	function formatDate(dateStr) {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<a href="/post/{post.slug}" class="post-card">
	<article>
		<time datetime={post.created_at}>{formatDate(post.created_at)}</time>
		<h2>{post.title}</h2>
		<p>{post.excerpt}</p>
	</article>
</a>

<style lang="scss">
	.post-card {
		display: block;
		text-decoration: none;
		color: inherit;
		padding: 1.5rem;
		border-bottom: 1px solid #e5e7eb;
		transition: background-color 0.15s;

		&:hover {
			background-color: #f9fafb;
		}

		article {
			max-width: 640px;
		}

		time {
			font-size: 0.85rem;
			color: #6b7280;
		}

		h2 {
			margin: 0.25rem 0 0.5rem;
			font-size: 1.35rem;
			font-weight: 600;
			color: #111827;
		}

		p {
			margin: 0;
			color: #4b5563;
			line-height: 1.6;
		}
	}
</style>
