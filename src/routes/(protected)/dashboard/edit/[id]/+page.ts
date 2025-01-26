/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-26
 */

export const load = async ({ fetch, params }) => {
	const id = params.id;
	const response = await fetch("/api/posts/" + id);
	const post = await response.json();
	return { post };
}
