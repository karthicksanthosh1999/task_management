import { v2 as cloudinary } from "cloudinary";

// ✅ Configure Cloudinary (once globally)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

/**
 * Upload an image file to Cloudinary.
 * @param file - The image File object from FormData.
 * @param folder - Optional Cloudinary folder name.
 * @returns The uploaded image's secure URL and public_id.
 */

export const uploadImage = async (file: File, folder = "users") => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploadResult = await cloudinary.uploader.upload(base64Image, {
        folder,
    });

    return {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
    };
};

/**
 * Delete an image from Cloudinary by its public_id.
 * @param publicId - The Cloudinary public_id of the image to delete.
 */
export const deleteImage = async (publicId: string) => {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
};

/**
 * Update an image — delete old one and upload new one.
 * @param newFile - The new File to upload.
 * @param oldPublicId - Optional public_id of the old image.
 * @param folder - Optional Cloudinary folder.
 * @returns The new uploaded image details.
 */
export const updateImage = async (
    newFile: File,
    oldPublicId?: string,
    folder = "users"
) => {
    if (oldPublicId) {
        await deleteImage(oldPublicId);
    }
    return await uploadImage(newFile, folder);
};
