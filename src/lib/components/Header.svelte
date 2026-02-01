<script>
    export let title = "Blog";
</script>

<nav>
    <a href="/" class="logo">{title}</a>
</nav>

<style lang="scss">
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
</style>
