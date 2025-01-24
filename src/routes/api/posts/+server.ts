/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-23
 */

import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { extractAndValidateToken } from "$lib/auth-utils";
import { ddb } from "$lib/aws/dynamo";

const TABLE_NAME = env.BLOG_POSTS_TABLE_NAME;

export const GET = async () => {
	try {
		const result = await ddb.send(new ScanCommand({ TableName: TABLE_NAME }));
		return json(result.Items, { status: 200 });
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
