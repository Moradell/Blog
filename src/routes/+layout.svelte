<script>
    let { children } = $props();
    import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
    <title>Блог</title>
</svelte:head>

<div class="site">
    <Header />

    <div class="content">
        <div class="container">
            <main>
                {@render children()}
            </main>
        </div>
    </div>

    <footer>
        <div class="container">
            <p>&copy; {new Date().getFullYear()} Блог</p>
        </div>
    </footer>
</div>

<style lang="scss">
    :global(:root) {
        --bg-primary: #fafaf8;
        --bg-secondary: #ffffff;
        --text-primary: #1a1a1a;
        --text-secondary: #666666;
        --text-tertiary: #999999;
        --accent: #2d5a4a;
        --accent-light: #e8f0ed;
        --border: #e8e8e6;
        --hover: #f5f5f3;
    }

    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :global(body) {
        font-family: "Work Sans", sans-serif;
        background: var(--bg-primary);
        color: var(--text-primary);
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
    }

    :global(a) {
        color: var(--accent);
    }

    /* Markdown content styles */
    :global(.markdown-body) {
        h1,
        h2,
        h3,
        h4 {
            font-family: "Cormorant Garamond", serif;
            font-weight: 500;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            letter-spacing: -0.01em;
        }

        p {
            margin-bottom: 1em;
            font-weight: 300;
            line-height: 1.7;
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
            border-radius: 4px;
            overflow-x: auto;
            margin-bottom: 1em;
            font-size: 0.875rem;
            line-height: 1.6;
        }

        code {
            font-family: "SF Mono", "Fira Code", monospace;
            font-size: 0.9em;
        }

        :not(pre) > code {
            background: var(--accent-light);
            color: var(--accent);
            padding: 0.15em 0.4em;
            border-radius: 3px;
        }

        blockquote {
            border-left: 3px solid var(--accent);
            padding-left: 1rem;
            color: var(--text-secondary);
            margin-bottom: 1em;
            font-style: italic;
        }

        :global(img) {
            max-width: 100%;
            height: auto;
            display: block;
            border-radius: 4px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1em;

            th,
            td {
                border: 1px solid var(--border);
                padding: 0.5rem 0.75rem;
                text-align: left;
            }

            th {
                background: var(--hover);
                font-weight: 500;
            }
        }

        hr {
            border: none;
            border-top: 1px solid var(--border);
            margin: 2em 0;
        }
    }

    .site {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .container {
        max-width: 780px;
        width: 100%;
        margin: 0 auto;
        padding: 0 24px;
    }

    .content {
        flex: 1;
    }

    main {
        padding: 0 0 80px;
    }

    footer {
        text-align: center;
        padding: 1.5rem 0;
        font-size: 0.85rem;
        color: var(--text-tertiary);

        :global(.container) {
            border-top: 1px solid var(--border);
            padding-top: 1.5rem;
        }
    }

    @media (max-width: 600px) {
        .container {
            padding: 0 20px;
        }
    }
</style>
