<script>
    import PostCard from "$lib/components/PostCard.svelte";

    let { data } = $props();
</script>

<section>
    {#if data.posts.length === 0}
        <p class="status">No posts yet.</p>
    {:else}
        {#each data.posts as post (post.slug)}
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
</style>
