import { getPost, getAllSlugs } from "$lib/posts.js";
import { error } from "@sveltejs/kit";

export const prerender = true;

export function load({ params }) {
  try {
    return {
      post: getPost(params.slug),
    };
  } catch {
    error(404, "Post not found");
  }
}

export function entries() {
  return getAllSlugs().map((slug) => ({ slug }));
}
