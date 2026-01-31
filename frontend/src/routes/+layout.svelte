<script>
	let { children } = $props();
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<div class="site">
	<header>
		<nav>
			<a href="/" class="logo">Blog</a>
			<a href="/admin">Admin</a>
		</nav>
	</header>

	<main>
		{@render children()}
	</main>

	<footer>
		<p>&copy; {new Date().getFullYear()} Blog</p>
	</footer>
</div>

<style lang="scss">
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		color: #111827;
		background: #fff;
		-webkit-font-smoothing: antialiased;
	}

	:global(a) {
		color: #6366f1;
	}

	/* Markdown content styles */
	:global(.markdown-body) {
		h1,
		h2,
		h3,
		h4 {
			margin-top: 1.5em;
			margin-bottom: 0.5em;
			font-weight: 600;
		}

		p {
			margin-bottom: 1em;
		}

		ul,
		ol {
			margin-bottom: 1em;
			padding-left: 1.5em;
		}

		pre {
			background: #1e1e2e;
			color: #cdd6f4;
			padding: 1rem;
			border-radius: 6px;
			overflow-x: auto;
			margin-bottom: 1em;
			font-size: 0.875rem;
			line-height: 1.6;
		}

		code {
			font-family: 'SF Mono', 'Fira Code', monospace;
			font-size: 0.9em;
		}

		:not(pre) > code {
			background: #f3f4f6;
			padding: 0.15em 0.4em;
			border-radius: 3px;
		}

		blockquote {
			border-left: 3px solid #d1d5db;
			padding-left: 1rem;
			color: #6b7280;
			margin-bottom: 1em;
		}

		img {
			max-width: 100%;
			border-radius: 6px;
		}

		table {
			width: 100%;
			border-collapse: collapse;
			margin-bottom: 1em;

			th,
			td {
				border: 1px solid #e5e7eb;
				padding: 0.5rem 0.75rem;
				text-align: left;
			}

			th {
				background: #f9fafb;
				font-weight: 600;
			}
		}

		hr {
			border: none;
			border-top: 1px solid #e5e7eb;
			margin: 2em 0;
		}
	}

	.site {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	header {
		border-bottom: 1px solid #e5e7eb;
	}

	nav {
		max-width: 720px;
		margin: 0 auto;
		padding: 1rem 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		font-size: 1.2rem;
		font-weight: 700;
		text-decoration: none;
		color: #111827;
	}

	nav a:not(.logo) {
		text-decoration: none;
		font-size: 0.9rem;
		color: #6b7280;

		&:hover {
			color: #111827;
		}
	}

	main {
		flex: 1;
		max-width: 720px;
		width: 100%;
		margin: 0 auto;
		padding: 2rem 1.5rem;
	}

	footer {
		border-top: 1px solid #e5e7eb;
		text-align: center;
		padding: 1.5rem;
		font-size: 0.85rem;
		color: #9ca3af;
	}
</style>
