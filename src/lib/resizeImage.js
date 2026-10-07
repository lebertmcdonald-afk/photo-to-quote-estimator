const MAX_WIDTH = 1600;
const JPEG_QUALITY = 0.85;

// Resolves with a decoded image plus the object URL backing it.
// The caller owns revoking that URL.
// Rejects when the browser cannot decode the file, which is how a HEIC
// from an iPhone behaves on most non-Safari browsers.
export function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve({ img, url });
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not decode image"));
    };
    img.src = url;
  });
}

// Scales down to MAX_WIDTH and re-encodes as JPEG.
// Never upscales. The re-encode also normalises HEIC to JPEG on browsers
// that can decode it, which keeps uploads inside the bucket's mime allowlist.
export async function resizeToJpegBlob(file, maxWidth = MAX_WIDTH) {
  const { img, url } = await loadImageFromFile(file);
  try {
    const scale = Math.min(1, maxWidth / img.naturalWidth);
    const width = Math.max(1, Math.round(img.naturalWidth * scale));
    const height = Math.max(1, Math.round(img.naturalHeight * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not available");
    ctx.drawImage(img, 0, 0, width, height);

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY)
    );
    if (!blob) throw new Error("Could not encode image");
    return blob;
  } finally {
    URL.revokeObjectURL(url);
  }
}
