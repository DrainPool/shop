import { expect, test } from "bun:test";
import { matchesPhotoSignature, photoMetadataSchema } from "./engravingPhoto";
import { customizationSchema } from "./cartValidation";

test("Kunden kan beställa gravyr med foto utan text", () => {
  expect(customizationSchema.safeParse({ line1: "", line2: "", note: "", giftMessage: "", withoutEngraving: false, hasPhoto: true }).success).toBe(true);
  expect(customizationSchema.safeParse({ line1: "", line2: "", note: "", giftMessage: "", withoutEngraving: false, hasPhoto: false }).success).toBe(false);
});
test("Bildstorleken begränsas till 10 MB", () => {
  expect(photoMetadataSchema.safeParse({ name: "foto.jpg", type: "image/jpeg", size: 10485760 }).success).toBe(true);
  expect(photoMetadataSchema.safeParse({ name: "foto.jpg", type: "image/jpeg", size: 10485761 }).success).toBe(false);
});
test("HTML eller SVG får inte laddas upp som foto", () => {
  expect(photoMetadataSchema.safeParse({ name: "foto.svg", type: "image/svg+xml", size: 20 }).success).toBe(false);
  expect(matchesPhotoSignature(new TextEncoder().encode("<html>"), "image/jpeg")).toBe(false);
  expect(matchesPhotoSignature(new Uint8Array([255, 216, 255]), "image/jpeg")).toBe(true);
});