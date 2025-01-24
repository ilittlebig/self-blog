/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-23
 */

import { env } from "$env/dynamic/private";
import { PUBLIC_AWS_REGION } from "$env/static/public";
import { json } from "@sveltejs/kit";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { extractAndValidateToken } from "$lib/utils/server";
import { ddb } from "$lib/utils/dynamo";

const TABLE_NAME = env.BLOG_POSTS_TABLE_NAME;

export const GET = async () => {
	try {
		console.log("abc");
		const tables = await ddb.send(new ListTablesCommand({}));
		console.log("Available tables:", tables.TableNames);
		console.log("TABLE_NAME =", TABLE_NAME);
		console.log("REGION =", PUBLIC_AWS_REGION);
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
