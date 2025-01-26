/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-23
 */

import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";
import { ScanCommand, PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { extractAndValidateToken } from "$lib/utils/server";
import { ddb } from "$lib/utils/dynamo";

const TABLE_NAME = env.BLOG_POSTS_TABLE_NAME;

export const GET = async () => {
	try {
		const result = await ddb.send(new ScanCommand({ TableName: TABLE_NAME }));
		const items = result.Items?.map(item => {
			const post = { ...item };
			if (post.tags instanceof Set) {
				post.tags = Array.from(post.tags);
			}
			return post;
		});
		return json(items, { status: 200 });
	} catch (err: any) {
		return json({ error: err.message }, { status: 500 });
	}
};

export const POST = async ({ request }) => {
	try {
		const authHeader = request.headers.get("Authorization");
		await extractAndValidateToken(authHeader);

		const body = await request.json();
		const newPost = {
			id: Date.now().toString(),
			...body
		};
		await ddb.send(new PutCommand({ TableName: TABLE_NAME, Item: newPost }));
		return json(newPost, { status: 201 });
	} catch (err: any) {
		return json({ error: err.message }, { status: 500 });
	}
};

export const DELETE = async ({ request }) => {
	try {
		const authHeader = request.headers.get("Authorization");
		await extractAndValidateToken(authHeader);

		const { id } = await request.json();
		if (!id) {
			return json({ error: "Post ID is required" }, { status: 400 });
		}

		await ddb.send(new DeleteCommand({
			TableName: TABLE_NAME,
			Key: { id },
		}));
		return json({ message: "Post deleted successfully" }, { status: 200 });
	} catch (err: any) {
		return json({ error: err.message }, { status: 500 });
	}
};
