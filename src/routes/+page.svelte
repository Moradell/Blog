<script>
    import PostCard from "$lib/components/PostCard.svelte";
    import TagFilter from "$lib/components/TagFilter.svelte";

    let { data } = $props();

    let activeTag = $state("all");

    const allTags = $derived(
        [...new Set(data.posts.flatMap((p) => p.tags))].sort(),
    );

    const filteredPosts = $derived(
        activeTag === "all"
            ? data.posts
            : data.posts.filter((p) => p.tags.includes(activeTag)),
    );
</script>

{#if allTags.length > 0}
    <TagFilter
        tags={allTags}
        active={activeTag}
        onselect={(tag) => (activeTag = tag)}
    />
{/if}

<section class="articles">
    {#if filteredPosts.length === 0}
        <p class="no-articles">Статей с выбранным тегом не найдено</p>
    {:else}
        {#each filteredPosts as post (post.slug)}
            <PostCard {post} />
        {/each}
    {/if}
</section>

<style lang="scss">
    .articles {
        /* padding-top: 32px; */
    }

    .no-articles {
        text-align: center;
        padding: 60px 20px;
        color: var(--text-tertiary);
        font-size: 15px;
        font-style: italic;
    }
</style>
