<header>
    <div class="container">
        <div class="header-content">
            <img class="profile-photo" src="/me.jpg" alt="Алексей Абдулин" />
            <div class="header-info">
                <h1><a href="/">Алексей Абдулин</a></h1>
                <div class="header-links">
                    <a
                        href="https://t.me/moradell"
                        target="_blank"
                        rel="noopener">Telegram</a
                    >
                    <a
                        href="https://github.com/Moradell"
                        target="_blank"
                        rel="noopener">GitHub</a
                    >
                    <a href="mailto:themoradell@gmail.com">Email</a>
                </div>
            </div>
        </div>
    </div>
</header>

<style lang="scss">
    header {
        padding: 60px 0 0;
        position: sticky;
        top: 0;
        z-index: 100;
        backdrop-filter: blur(10px);
        background: rgba(250, 250, 248, 0.95);
    }

    .container {
        max-width: 780px;
        margin: 0 auto;
        padding: 0 24px;
    }

    .header-content {
        display: flex;
        align-items: center;
        gap: 28px;
        padding-bottom: 40px;
        border-bottom: 1px solid var(--border);
    }

    .profile-photo {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
    }

    .header-info h1 {
        font-family: "Cormorant Garamond", serif;
        font-size: 32px;
        font-weight: 500;
        letter-spacing: -0.02em;
        margin-bottom: 4px;

        a {
            color: inherit;
            text-decoration: none;
        }
    }

    .header-links {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
    }

    .header-links a {
        font-size: 13px;
        color: var(--text-secondary);
        text-decoration: none;
        transition: color 0.2s ease;
        font-weight: 400;
        letter-spacing: 0.01em;

        &::before {
            content: "→ ";
            opacity: 0;
            transition: opacity 0.2s ease;
        }

        &:hover {
            color: var(--accent);

            &::before {
                opacity: 1;
            }
        }
    }

    @media (max-width: 600px) {
        header {
            padding: 40px 0 30px;
        }

        .container {
            padding: 0 20px;
        }

        .header-content {
            gap: 20px;
        }

        .profile-photo {
            width: 60px;
            height: 60px;
        }

        .header-info h1 {
            font-size: 26px;
        }
    }
</style>
