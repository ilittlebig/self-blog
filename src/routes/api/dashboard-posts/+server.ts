/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-26
 */

import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddb } from "$lib/utils/dynamo";
import { extractAndValidateToken } from "$lib/utils/server";

const TABLE_NAME = env.BLOG_POSTS_TABLE_NAME;

export const GET = async ({ request }) => {
	try {
		const authHeader = request.headers.get("Authorization");
		await extractAndValidateToken(authHeader);

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
