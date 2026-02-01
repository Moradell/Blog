<script>
    let { data } = $props();

    function formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }
</script>

<svelte:head>
    <title>{data.post.title} - Блог</title>
</svelte:head>

<article>
    <header>
        <div class="meta">
            <span>{formatDate(data.post.created_at)}</span>
            {#if data.post.reading_time}
                <span>{data.post.reading_time} мин чтения</span>
            {/if}
        </div>
        <h1>{data.post.title}</h1>
    </header>
    <div class="markdown-body">
        {@html data.post.html_content}
    </div>
    <footer>
        <a href="/" class="back">&larr; Все статьи</a>
    </footer>
</article>

<style lang="scss">
    article header {
        margin: 2rem 0;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--border);

        h1 {
            font-family: "Cormorant Garamond", serif;
            margin-top: 0.25rem;
            font-size: 2.2rem;
            font-weight: 500;
            line-height: 1.3;
            letter-spacing: -0.02em;
            color: var(--text-primary);
        }
    }

    .meta {
        display: flex;
        gap: 16px;
        font-size: 13px;
        color: var(--text-tertiary);
        letter-spacing: 0.02em;

        span + span::before {
            content: "· ";
        }
    }

    article footer {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid var(--border);
    }

    .back {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: var(--accent);
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.02em;
        transition: gap 0.2s ease;

        &:hover {
            gap: 10px;
        }
    }

    @media (max-width: 600px) {
        article header h1 {
            font-size: 1.8rem;
        }
    }
</style>
