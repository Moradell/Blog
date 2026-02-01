import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = path.resolve("content/posts");

/**
 * @param {string} slug
 * @returns {{ slug: string, title: string, excerpt: string, created_at: string, published: boolean, html_content: string }}
 */
export function getPost(slug) {
  const filePath = path.join(POSTS_DIR, slug, "index.md");
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const html_content = marked
    .parse(content, { async: false })
    .replace(/src="\.\/([^"]+)"/g, `src="/content/${slug}/$1"`);

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt ?? "",
    created_at: data.created_at,
    published: data.published !== false,
    html_content,
  };
}

/**
 * @returns {Array<{ slug: string, title: string, excerpt: string, created_at: string }>}
 */
export function getAllPosts() {
  const slugs = getAllSlugs();

  return slugs
    .map((slug) => {
      const post = getPost(slug);
      return post;
    })
    .filter((post) => post.published)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .map(({ slug, title, excerpt, created_at }) => ({
      slug,
      title,
      excerpt,
      created_at,
    }));
}

/** @returns {string[]} */
export function getAllSlugs() {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs.readdirSync(POSTS_DIR).filter((name) => {
    const indexPath = path.join(POSTS_DIR, name, "index.md");
    return fs.existsSync(indexPath);
  });
}
