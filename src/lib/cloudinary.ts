export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";

export function getCloudinaryUrl(publicId: string, options?: { width?: number; height?: number; quality?: string }): string {
  const params = new URLSearchParams();
  if (options?.width) params.set("w", String(options.width));
  if (options?.height) params.set("h", String(options.height));
  if (options?.quality) params.set("q", options.quality);
  const qs = params.toString();
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${qs ? qs + "/" : ""}${publicId}`;
}

export async function uploadToCloudinary(file: File, folder: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "princeachar");
  formData.append("folder", folder);

  const res = await fetch(`https://api.cloudinary.com/v1_/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.secure_url as string;
}
