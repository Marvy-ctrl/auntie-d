import { v2 as cloudinary } from "cloudinary";

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!CLOUDINARY_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error("Missing Cloudinary environment variables. Please set CLOUDINARY_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.");
}



cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file buffer directly to Cloudinary
 * @param fileBuffer - The buffer from the incoming multipart request
 * @returns The secure URL of the uploaded image
 */
export async function uploadToCloudinary(fileBuffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "auntie-d-herbs/products" },
      (error, result) => {
        if (error) {
            try {
              console.error("Cloudinary Detailed Error:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
            } catch (e) {
              console.error("Cloudinary Detailed Error (stringify failed):", error);
            }
          return reject(error);
        }
        if (result) resolve(result.secure_url);
        else reject(new Error("Cloudinary upload failed with no result."));
      }
    );

    uploadStream.end(fileBuffer);
  });
}




