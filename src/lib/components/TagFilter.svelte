<script>
    let { tags, active = "all", onselect } = $props();
</script>

<section class="tag-filter">
    <h3>Темы</h3>
    <div class="tags">
        <button
            class="tag"
            class:active={active === "all"}
            onclick={() => onselect("all")}>Все</button
        >
        {#each tags as tag}
            <button
                class="tag"
                class:active={active === tag}
                onclick={() => onselect(tag)}>{tag}</button
            >
        {/each}
    </div>
</section>

<style lang="scss">
    .tag-filter {
        display: flex;
        align-items: baseline;
        padding: 32px 0;
    }

    h3 {
        font-family: "Cormorant Garamond", serif;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--text-tertiary);
        padding-right: 32px;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .tag {
        padding: 6px 14px;
        border: 1px solid var(--border);
        border-radius: 20px;
        font-size: 13px;
        font-family: inherit;
        color: var(--text-secondary);
        background: transparent;
        cursor: pointer;
        transition: all 0.25s ease;
        font-weight: 400;

        &:hover {
            border-color: var(--accent);
            color: var(--accent);
            background: var(--accent-light);
        }

        &.active {
            background: var(--accent);
            color: white;
            border-color: var(--accent);
        }
    }
</style>
