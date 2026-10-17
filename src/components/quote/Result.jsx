import { Link } from "react-router-dom";
import { formatRange } from "../../pricing.js";

// Pexels, free commercial licence, no attribution required. One finished roof
// per material. No people, logos or brand names in any of them.
const AFTER_PHOTOS = {
  asphalt: { id: 534228, alt: "A house with a new asphalt shingle roof" },
  metal: { id: 11767927, alt: "A house with a dark standing seam metal roof" },
  tile: { id: 4906292, alt: "A house with a terracotta tile roof" },
  flat: { id: 7598378, alt: "A modern house with a flat roof" },
  unsure: { id: 209315, alt: "A house with a clean new roof" },
};

const pexelsUrl = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600`;

export default function Result({
  result,
  form,
  photoCount,
  firstPhotoUrl,
  businessName = "Ridgeline Roofing",
  embedded = false,
}) {
  const firstName = form.name ? titleCaseName(form.name).split(" ")[0] : "";
  const after = AFTER_PHOTOS[form.material] || AFTER_PHOTOS.unsure;

  return (
    <div className="flex flex-col gap-5">
      {/* Dark estimate panel */}
      <div className="flex flex-col gap-[10px] rounded-xl bg-navy px-4 py-[18px] text-white">
        <div className="text-xs font-semibold text-navy-ink">Your ballpark estimate</div>
        {result.needsInspection ? (
          <div
            className="font-display font-extrabold"
            style={{ fontSize: 26, fontStretch: "88%", letterSpacing: "-0.01em" }}
          >
            Inspection needed
          </div>
        ) : (
          <div
            className="font-display font-extrabold"
            style={{ fontSize: 28, fontStretch: "88%", letterSpacing: "-0.01em" }}
          >
            {formatRange(result)}
          </div>
        )}
        <div className="text-xs leading-tight text-navy-ink">
          Final price is confirmed after a quick inspection.
        </div>
      </div>

      <p className="text-[16px] font-semibold text-navy">
        {embedded ? (
          <>
            Thanks{firstName ? `, ${firstName}` : ""}. In the live version, {businessName} gets this
            request instantly.
          </>
        ) : (
          <>
            Thanks{firstName ? `, ${firstName}` : ""}. {businessName} will reach out soon.
          </>
        )}
      </p>

      {/* Before and after. Preview pages only, where it sells the idea. */}
      {embedded && (
        <div className={firstPhotoUrl ? "grid gap-3 sm:grid-cols-2" : ""}>
          {firstPhotoUrl && (
            <figure className="m-0">
              <figcaption className="mb-1.5 text-[13px] font-semibold text-ink-soft">
                Your roof today
              </figcaption>
              <img
                src={firstPhotoUrl}
                alt="The roof you photographed"
                className="aspect-[4/3] w-full rounded-xl border border-border object-cover"
              />
            </figure>
          )}
          <figure className="m-0">
            <figcaption className="mb-1.5 text-[13px] font-semibold text-ink-soft">
              What a new roof can look like
            </figcaption>
            <img
              src={pexelsUrl(after.id)}
              alt={after.alt}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-xl border border-border object-cover"
            />
            <p className="mt-1.5 text-[12px] leading-snug text-ink-soft">
              Example photo, not this job. On your live site, this shows your own finished work.
            </p>
          </figure>
        </div>
      )}

      {/* Request recap */}
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="bg-panel px-4 py-2.5 text-[13px] font-semibold text-ink-soft">
          What we received
        </div>
        <dl
          className="m-0 grid gap-y-2 gap-x-4 px-4 py-3 text-[14px]"
          style={{ gridTemplateColumns: "max-content minmax(0, 1fr)" }}
        >
          <dt className="text-ink-soft">Job</dt>
          <dd className="m-0 font-semibold">{jobLabel(form.jobType)}</dd>
          <dt className="text-ink-soft">Size</dt>
          <dd className="m-0 font-semibold">
            {form.sqFtUnknown ? "Not sure" : `About ${Number(form.sqFt).toLocaleString()} sq ft`}
          </dd>
          <dt className="text-ink-soft">Material</dt>
          <dd className="m-0 font-semibold">{materialLabel(form.material)}</dd>
          <dt className="text-ink-soft">Stories</dt>
          <dd className="m-0 font-semibold">{form.stories}</dd>
          <dt className="text-ink-soft">Photos</dt>
          <dd className="m-0 font-semibold">{photoCount}</dd>
          <dt className="text-ink-soft">Contact</dt>
          <dd className="m-0 font-semibold">
            {titleCaseName(form.name)}, {form.phone}
          </dd>
          <dt className="text-ink-soft">Address</dt>
          <dd className="m-0 font-semibold">{form.address}</dd>
        </dl>
      </div>

      {!embedded && (
        <Link
          to="/"
          className="rounded-[10px] bg-blue px-5 text-center font-bold text-white no-underline"
          style={{ minHeight: 48, lineHeight: "48px" }}
        >
          Back to Instant Quote AI
        </Link>
      )}
    </div>
  );
}

function titleCaseName(s) {
  return (s || "").toLowerCase().replace(/\b\p{L}/gu, (c) => c.toUpperCase());
}

function jobLabel(v) {
  return (
    { full: "Full replacement", repair: "Repair", unsure: "Not sure" }[v] || v || ""
  );
}

function materialLabel(v) {
  return (
    {
      asphalt: "Asphalt shingles",
      metal: "Metal",
      tile: "Tile",
      flat: "Flat",
      unsure: "Not sure",
    }[v] || v || ""
  );
}
