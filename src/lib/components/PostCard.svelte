<script>
    let { post } = $props();

    function formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }
</script>

<a href="/post/{post.slug}" class="article-card">
    <article>
        <div class="article-header">
            <h2 class="article-title">{post.title}</h2>
            <div class="article-meta">
                <span>{formatDate(post.created_at)}</span>
                {#if post.reading_time}
                    <span>{post.reading_time} мин чтения</span>
                {/if}
            </div>
        </div>
        {#if post.tags.length > 0}
            <div class="article-tags">
                {#each post.tags as tag}
                    <span class="article-tag">{tag}</span>
                {/each}
            </div>
        {/if}
        {#if post.excerpt}
            <p class="article-preview">{post.excerpt}</p>
        {/if}
        <span class="read-more">Читать полностью</span>
    </article>
</a>

<style lang="scss">
    .article-card {
        display: block;
        text-decoration: none;
        color: inherit;
        cursor: pointer;
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 2px;
        padding: 32px;
        margin-bottom: 20px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;

        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 3px;
            background: var(--accent);
            transform: scaleY(0);
            transition: transform 0.3s ease;
            transform-origin: bottom;
        }

        &:hover::before {
            transform: scaleY(1);
            transform-origin: top;
        }

        &:hover {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
            border-color: rgba(45, 90, 74, 0.2);
        }
    }

    .article-header {
        margin-bottom: 16px;
    }

    .article-title {
        font-family: "Cormorant Garamond", serif;
        font-size: 28px;
        font-weight: 500;
        line-height: 1.3;
        margin-bottom: 12px;
        letter-spacing: -0.01em;
        color: var(--text-primary);
    }

    .article-meta {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        font-size: 12px;
        color: var(--text-tertiary);
        font-weight: 400;
        letter-spacing: 0.02em;

        span {
            display: flex;
            align-items: center;
            gap: 6px;

            &::before {
                content: "·";
                font-size: 14px;
            }

            &:first-child::before {
                content: "";
            }
        }
    }

    .article-tags {
        display: flex;
        gap: 8px;
        margin-bottom: 16px;
        flex-wrap: wrap;
    }

    .article-tag {
        font-size: 11px;
        padding: 4px 10px;
        background: var(--accent-light);
        color: var(--accent);
        border-radius: 12px;
        font-weight: 500;
        letter-spacing: 0.02em;
    }

    .article-preview {
        color: var(--text-secondary);
        font-size: 15px;
        line-height: 1.7;
        margin-bottom: 20px;
        font-weight: 300;
    }

    .read-more {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--accent);
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        transition: gap 0.3s ease;
        letter-spacing: 0.02em;

        &::after {
            content: "→";
            transition: transform 0.3s ease;
        }

        &:hover {
            gap: 12px;

            &::after {
                transform: translateX(4px);
            }
        }
    }

    @media (max-width: 600px) {
        .article-card {
            padding: 24px;
        }

        .article-title {
            font-size: 24px;
        }

        .article-meta {
            font-size: 11px;
        }
    }
</style>
