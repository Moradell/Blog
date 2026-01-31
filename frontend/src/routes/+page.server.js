import { getAllPosts } from '$lib/posts.js';

export const prerender = true;

export function load() {
	return {
		posts: getAllPosts()
	};
}
