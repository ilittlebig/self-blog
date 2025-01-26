/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-26
 */

import { POST } from "$lib/services/blog-api";

export const uploadFileToS3 = async (file: File): Promise<string> => {
	const formData = new FormData();
	formData.append("file", file);

	const response = await POST("/upload-to-s3", formData, "multipart/form-data");
	if (!response || !response.fileUrl) {
		throw new Error(`Failed to upload file: ${response.statusText}`);
	}
	return response.fileUrl;
};
