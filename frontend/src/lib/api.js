const BASE_URL = 'https://api.abdulin.dev/api';

/**
 * @param {string} path
 * @param {RequestInit} [options]
 */
async function request(path, options = {}) {
	const res = await fetch(`${BASE_URL}${path}`, {
		headers: {
			'Content-Type': 'application/json',
			...options.headers
		},
		...options
	});

	if (res.status === 204) return null;

	if (!res.ok) {
		const body = await res.json().catch(() => ({}));
		throw new Error(body.detail || `Request failed: ${res.status}`);
	}

	return res.json();
}

/** @param {string} apiKey */
function authHeaders(apiKey) {
	return { 'X-API-Key': apiKey };
}

export function getPosts() {
	return request('/posts');
}

/** @param {string} apiKey */
export function getAllPosts(apiKey) {
	return request('/posts/all', { headers: authHeaders(apiKey) });
}

/** @param {string} slug */
export function getPost(slug) {
	return request(`/posts/${slug}`);
}

/**
 * @param {string} apiKey
 * @param {Record<string, any>} data
 */
export function createPost(apiKey, data) {
	return request('/posts', {
		method: 'POST',
		headers: authHeaders(apiKey),
		body: JSON.stringify(data)
	});
}

/**
 * @param {string} apiKey
 * @param {string} slug
 * @param {Record<string, any>} data
 */
export function updatePost(apiKey, slug, data) {
	return request(`/posts/${slug}`, {
		method: 'PUT',
		headers: authHeaders(apiKey),
		body: JSON.stringify(data)
	});
}

/**
 * @param {string} apiKey
 * @param {string} slug
 */
export function deletePost(apiKey, slug) {
	return request(`/posts/${slug}`, {
		method: 'DELETE',
		headers: authHeaders(apiKey)
	});
}
