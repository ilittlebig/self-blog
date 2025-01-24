/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-24
 */

import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddb } from "$lib/aws/dynamo";

const TABLE_NAME = env.BLOG_POSTS_TABLE_NAME;

export const GET = async ({ params }) => {
	try {
		const { id } = params;
		const result = await ddb.send(new GetCommand({
			TableName: TABLE_NAME,
			Key: { id }
		}));

		if (!result.Item) {
			return json({ error: "Post not found" }, { status: 404 });
		}
		return json(result.Item, { status: 200 });
	} catch (err: any) {
		return json({ error: err.message }, { status: 500 });
	}
};
