<script>
    let { children } = $props();
    import Header from "$lib/components/Header.svelte";
    import "../markdown.css";
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
