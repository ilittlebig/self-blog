/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-24
 */

import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";
import { GetCommand, UpdateCommand, type UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { ddb } from "$lib/utils/dynamo";

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

		const post = { ...result.Item };
		if (post.tags instanceof Set) {
			post.tags = Array.from(post.tags);
		}
		return json(post, { status: 200 });
	} catch (err: any) {
		return json({ error: err.message }, { status: 500 });
	}
};

export const PATCH = async ({ params, request }) => {
	const { id } = params;
	if (!id) {
		return json({ error: "Post ID is required" }, { status: 400 });
	}

	const body = await request.json();

	const allowedFields = ["title", "content", "tags", "summary", "featured_at", "thumbnail", "status"];
	const updateFields = Object.keys(body).filter((key) => allowedFields.includes(key));

	if (updateFields.length === 0) {
		return json({ error: "No valid fields to update." }, { status: 400 });
	}

	let updateExpression = "";
	const expressionAttributeNames: Record<string, string> = {};
	const expressionAttributeValues: Record<string, any> = {};
	const removeFields: string[] = [];

	updateFields.forEach((field, index) => {
		const fieldKey = `#field${index}`;
		expressionAttributeNames[fieldKey] = field;

		if (field === "featured_at" && body[field] === null) {
			removeFields.push(fieldKey);
		} else {
			const valueKey = `:value${index}`;
			updateExpression += `${fieldKey} = ${valueKey}, `;
			expressionAttributeValues[valueKey] = body[field];
		}
	});

	if (updateExpression.endsWith(", ")) {
		updateExpression = `SET ${updateExpression.slice(0, -2)}`;
	}

	if (removeFields.length > 0) {
		updateExpression += `${updateExpression ? " " : ""}REMOVE ${removeFields.join(", ")}`;
	}

	const updateParams: UpdateCommandInput = {
		TableName: TABLE_NAME,
		Key: { id },
		UpdateExpression: updateExpression,
		ExpressionAttributeNames: expressionAttributeNames,
		ExpressionAttributeValues: Object.keys(expressionAttributeValues).length ? expressionAttributeValues : undefined,
		ReturnValues: "ALL_NEW",
	};

	try {
		const result = await ddb.send(new UpdateCommand(updateParams));
		return json({ message: "Post updated successfully", updated: result.Attributes }, { status: 200 });
	} catch (err: any) {
		return json({ error: "Failed to update post", details: err }, { status: 500 });
	}
};
