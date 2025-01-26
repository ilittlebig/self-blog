/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-23
 */

import { PUBLIC_AWS_REGION } from "$env/static/public";
import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";
import { ScanCommand, PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { extractAndValidateToken } from "$lib/utils/server";
import { ddb } from "$lib/utils/dynamo";

const TABLE_NAME = env.BLOG_POSTS_TABLE_NAME;

const s3 = new S3Client({
	credentials: {
		accessKeyId: env.AWS_ACCESS_KEY_ID,
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
	},
	region: PUBLIC_AWS_REGION,
});

export const GET = async () => {
	try {
		const result = await ddb.send(new ScanCommand({ TableName: TABLE_NAME }));
		const items = result.Items?.map(item => {
			const post = { ...item };
			if (post.tags instanceof Set) {
				post.tags = Array.from(post.tags);
			}
			return post;
		}).filter(post => post.status !== "draft");
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

		const { id, thumbnail } = await request.json();
		if (!id) {
			return json({ error: "Post ID is required" }, { status: 400 });
		}

		const fileKey = thumbnail.replace(
			`https://${env.AWS_BUCKET_NAME}.s3.${PUBLIC_AWS_REGION}.amazonaws.com/`,
			""
		);

		await s3.send(new DeleteObjectCommand({
			Bucket: env.AWS_BUCKET_NAME,
			Key: fileKey,
		}));

		await ddb.send(new DeleteCommand({
			TableName: TABLE_NAME,
			Key: { id },
		}));
		return json({ message: "Post deleted successfully" }, { status: 200 });
	} catch (err: any) {
		return json({ error: err.message }, { status: 500 });
	}
};
