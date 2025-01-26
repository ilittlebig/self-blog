/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-25
 */

import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { ddb } from "$lib/utils/dynamo";

const TABLE_NAME = env.BLOG_POSTS_TABLE_NAME;

export const GET = async () => {
	try {
		const result = await ddb.send(new ScanCommand({
			TableName: TABLE_NAME,
			FilterExpression: "attribute_exists(featured_at) AND #status = :status",
			ExpressionAttributeValues: {
				":status": { S: "published" },
			},
			ExpressionAttributeNames: {
				"#status": "status",
			},
		}));

		const items = result.Items?.map(item => {
			const unmarshalledItem = unmarshall(item);
			if (unmarshalledItem.tags instanceof Set) {
				unmarshalledItem.tags = [...unmarshalledItem.tags];
			}
			return unmarshalledItem;
		})
		return json(items, { status: 200 });
	} catch (err: any) {
		console.log(err);
		return json({ error: err.message }, { status: 500 });
	}
};
