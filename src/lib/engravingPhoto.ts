import { z } from "zod";

export const MAX_PHOTO_BYTES = 10 * 1024 * 1024;
export const photoMetadataSchema = z.object({
  name: z.string().min(1).max(160),
  size: z.number().int().min(1).max(MAX_PHOTO_BYTES, "Bilden får vara högst 10 MB"),
  type: z.enum(["image/jpeg", "image/png", "image/webp"], {
    errorMap: () => ({ message: "Välj en JPG-, PNG- eller WebP-bild" }),
  }),
});

export function matchesPhotoSignature(bytes: Uint8Array, type: string) {
  if (type === "image/jpeg") return bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  if (type === "image/png") return [137, 80, 78, 71, 13, 10, 26, 10].every((v, i) => bytes[i] === v);
  if (type === "image/webp") return String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  return false;
}

export type EngravingPhoto = { url: string; name: string };