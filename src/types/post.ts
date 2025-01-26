/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-24
 */

export interface Post {
	title: string;
	content: string;
	author: string;
	id: string;
	created_at: string;
	featured_at?: string;
	tags: string[];
	summary: string;
	status: "published" | "draft";
	thumbnail: string;
}

export interface EditablePost {
	title: string;
	content: string;
	tags: string[];
	summary: string;
	featured?: boolean;
	thumbnail: File | string;
}
