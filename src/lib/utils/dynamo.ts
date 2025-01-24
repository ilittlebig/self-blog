/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-23
 */

import { env } from "$env/dynamic/private";
import { PUBLIC_AWS_REGION } from "$env/static/public";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
	region: PUBLIC_AWS_REGION,
	credentials: {
		accessKeyId: env.AWS_ACCESS_KEY_ID,
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY
	}
});

export const ddb = DynamoDBDocumentClient.from(client);
