/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-26
 */

import { PUBLIC_AWS_REGION } from "$env/static/public";
import { env } from "$env/dynamic/private";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { json } from "@sveltejs/kit";

const s3 = new S3Client({
	credentials: {
		accessKeyId: env.AWS_ACCESS_KEY_ID,
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
	},
	region: env.AWS_REGION,
});

export const POST = async ({ request }) => {
	try {
		const formData = await request.formData();
		const file = formData.get("file") as Blob;

		if (!(file instanceof File)) {
			return json({ error: "Invalid file or no file uploaded" }, { status: 400 });
		}

		const buffer = Buffer.from(await file.arrayBuffer());
		const params = {
			Bucket: env.AWS_BUCKET_NAME,
			Key: `uploads/${file.name}`,
			Body: buffer,
			ContentType: file.type,
		};

		await s3.send(new PutObjectCommand(params));
		const fileUrl = `https://${env.AWS_BUCKET_NAME}.s3.${PUBLIC_AWS_REGION}.amazonaws.com/uploads/${file.name}`;
		return json({ fileUrl }, { status: 200 });
	} catch (err: any) {
		return json({ error: err.message }, { status: 500 });
	}
};
