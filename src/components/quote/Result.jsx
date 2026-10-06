import { Link } from "react-router-dom";
import { formatRange } from "../../pricing.js";

export default function Result({ result, form, photoCount }) {
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
        Thanks{form.name ? `, ${titleCaseName(form.name).split(" ")[0]}` : ""}. Ridgeline Roofing
        will reach out soon.
      </p>

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

      <Link
        to="/"
        className="rounded-[10px] bg-blue px-5 text-center font-bold text-white no-underline"
        style={{ minHeight: 48, lineHeight: "48px" }}
      >
        Back to Instant Quote AI
      </Link>
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
