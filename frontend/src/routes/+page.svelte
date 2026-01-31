<script>
	import { getPosts } from '$lib/api.js';
	import PostCard from '$lib/components/PostCard.svelte';

	/** @type {any[]} */
	let posts = $state([]);
	let loading = $state(true);
	let error = $state('');

	$effect(() => {
		getPosts()
			.then((data) => {
				posts = data;
			})
			.catch((err) => {
				error = err.message;
			})
			.finally(() => {
				loading = false;
			});
	});
</script>

<section>
	{#if loading}
		<p class="status">Loading...</p>
	{:else if error}
		<p class="status error">{error}</p>
	{:else if posts.length === 0}
		<p class="status">No posts yet.</p>
	{:else}
		{#each posts as post (post.id)}
			<PostCard {post} />
		{/each}
	{/if}
</section>

<style lang="scss">
	section {
		padding-top: 1rem;
	}

	.status {
		text-align: center;
		color: #6b7280;
		padding: 3rem 0;
	}

	.error {
		color: #dc2626;
	}
</style>
