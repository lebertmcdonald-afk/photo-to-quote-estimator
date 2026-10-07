import { useRef, useState } from "react";
import { loadImageFromFile } from "../../lib/resizeImage.js";

const MAX_PHOTOS = 8;

export default function StepPhotos({ photos, setPhotos }) {
  const inputRef = useRef(null);
  const [note, setNote] = useState("");

  const addFiles = async (fileList) => {
    const incoming = Array.from(fileList || []);
    const remaining = Math.max(0, MAX_PHOTOS - photos.length);
    const selected = incoming.slice(0, remaining);

    const added = [];
    let failed = 0;

    for (const file of selected) {
      try {
        // Decoding here means an unreadable file is caught now, while the
        // customer can still pick a different one, rather than at submit.
        const { url } = await loadImageFromFile(file);
        added.push({
          id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
          file,
          url,
        });
      } catch {
        failed += 1;
      }
    }

    if (added.length > 0) setPhotos((prev) => [...prev, ...added]);

    if (failed === 0) setNote("");
    else if (failed === 1) setNote("One photo couldn't be added. Try a different photo.");
    else setNote(`${failed} photos couldn't be added. Try different photos.`);
  };

  const removePhoto = (id) => {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.id !== id);
    });
    setNote("");
  };

  const atLimit = photos.length >= MAX_PHOTOS;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-[15px] text-muted">
          Add photos of the roof so Ridgeline Roofing can see the job. Up to {MAX_PHOTOS} photos.
        </p>
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={atLimit}
        className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-blue-dashed bg-blue-soft-2 px-4 py-6 text-blue disabled:opacity-50"
        style={{ cursor: atLimit ? "not-allowed" : "pointer" }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 7h3l2-3h6l2 3h3v12H4z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
        <span className="text-[14px] font-semibold">
          {atLimit ? "Photo limit reached" : "Add photos"}
        </span>
        <span className="text-[12px] text-ink-soft">
          {photos.length} of {MAX_PHOTOS} added
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
        className="hidden"
      />

      {note && (
        <p
          role="status"
          className="rounded-[10px] bg-red-pill-bg px-3 py-2.5 text-[14px] text-red-pill-fg"
        >
          {note}
        </p>
      )}

      {photos.length > 0 && (
        <ul className="m-0 grid list-none grid-cols-4 gap-2 p-0">
          {photos.map((p) => (
            <li key={p.id} className="relative" style={{ aspectRatio: 1 }}>
              <img src={p.url} alt="" className="h-full w-full rounded-[8px] object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(p.id)}
                aria-label="Remove photo"
                className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full border-0 bg-navy text-white"
                style={{ cursor: "pointer" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="text-[13px] text-ink-soft">Photos are uploaded when you submit.</p>
    </div>
  );
}
