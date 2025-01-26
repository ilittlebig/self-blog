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
	id?: string;
	title: string;
	content: string;
	tags: string[];
	created_at?: string;
	author?: string;
	featured_at?: string;
	summary: string;
	featured?: boolean;
	thumbnail: File | string;
}
