import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { randomBytes } from "node:crypto"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function slugify(val: string): string {
  return val
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}


export function generateOrderNumber(){
  const now = new Date()
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")

  const datePart = `${year}${month}${day}`
  const randomPart = randomBytes(4).toString("hex").toUpperCase()
  return `ADH-${datePart}-${randomPart}`
 
}


// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });


/**
 * Uploads a file buffer directly to Cloudinary
 *  The secure URL of the uploaded image
//  */
// export async function uploadToCloudinary(fileBuffer: Buffer): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       { folder: "auntie-d-herbs/products" },
//       (error, result) => {
//         if (error) {
//           console.error("Cloudinary Detailed Error:", error);
//           return reject(error);

//         }
//         if (result) resolve(result.secure_url);
//         else reject(new Error("Cloudinary upload failed with no result."));
//       }
//     );

//     uploadStream.end(fileBuffer);
//   });
// }