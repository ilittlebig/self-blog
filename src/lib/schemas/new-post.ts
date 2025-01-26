/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-26
 */

import { z } from "zod";

export const formSchema = z.object({
	title: z
		.string()
		.min(1, { message: "The title cannot be empty" })
		.max(255, { message: "The title cannot exceed 255 characters" }),
	summary: z
		.string()
		.min(1, { message: "The summary cannot be empty" })
		.max(500, { message: "The summary cannot exceed 500 characters" }),
	tags: z
		.string()
		.transform(value => value.split(",").map(tag => tag.trim()).filter(tag => tag))
		.refine(tags => Array.isArray(tags) && tags.length > 0, {
			message: "At least one tag is required",
		}),
	thumbnail: z
		.instanceof(File, { message: "You must select a file" })
		.refine(file => file?.size !== undefined && file.size <= 2 * 1024 * 1024, {
			message: "File must be under 2MB",
		})
		.refine(file => ["image/jpeg", "image/png"].includes(file?.type || ""), {
			message: "File must be a JPEG or PNG image",
		}),
	content: z.string().min(1, { message: "The content cannot be empty" }),
	featured: z.boolean().default(false),
});

export type FormData = z.infer<typeof formSchema>;
