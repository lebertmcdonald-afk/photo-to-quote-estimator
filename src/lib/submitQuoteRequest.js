import { supabase } from "./supabase.js";
import { resizeToJpegBlob } from "./resizeImage.js";

const BUCKET = "quote-photos";

// Uploads photos into a folder named after the request, then writes the row.
// Note: no .select() on the insert. Visitors have insert-only access to
// quote_requests, so asking for the row back would fail RLS.
export async function submitQuoteRequest({
  requestId,
  businessSlug,
  form,
  photos,
  estimateResult,
}) {
  if (!supabase) throw new Error("Supabase is not configured");

  const photoPaths = [];
  let skippedPhotos = 0;

  for (let i = 0; i < photos.length; i++) {
    let blob;
    try {
      blob = await resizeToJpegBlob(photos[i].file);
    } catch {
      skippedPhotos += 1;
      continue;
    }

    const path = `${requestId}/${i + 1}.jpg`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
      contentType: "image/jpeg",
      upsert: false,
    });
    if (error) throw error;
    photoPaths.push(path);
  }

  const { error } = await supabase.from("quote_requests").insert({
    id: requestId,
    business_slug: businessSlug,
    job_type: form.jobType,
    sq_ft: form.sqFtUnknown ? null : Number(form.sqFt),
    sq_ft_unknown: form.sqFtUnknown,
    material: form.material,
    stories: form.stories,
    name: form.name.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    address: form.address.trim(),
    photo_paths: photoPaths,
    estimate_low: estimateResult.needsInspection ? null : estimateResult.low,
    estimate_high: estimateResult.needsInspection ? null : estimateResult.high,
    needs_inspection: !!estimateResult.needsInspection,
  });
  if (error) throw error;

  return { photoPaths, skippedPhotos };
}
