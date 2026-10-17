import Stars from "./Stars.jsx";

// Pexels, free commercial licence, no attribution required. Landscape, so it
// crops cleanly in a wide hero. No people and no branding in shot.
const HERO_IMG =
  "https://images.pexels.com/photos/29114658/pexels-photo-29114658.jpeg?auto=compress&cs=tinysrgb&w=1600";

export default function PreviewHero({ city, state, phone, phoneHref, rating, reviewCount }) {
  const place = [city, state].filter(Boolean).join(", ");
  const showRating = Boolean(rating) && Boolean(reviewCount);

  return (
    <section className="relative flex items-center overflow-hidden lg:min-h-[92vh]">
      <div
        className="preview-zoom absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${HERO_IMG}')` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg,rgba(7,10,9,.95) 0%,rgba(7,10,9,.82) 40%,rgba(7,10,9,.35) 75%,rgba(7,10,9,.55) 100%),linear-gradient(0deg,rgba(7,10,9,.9) 2%,transparent 38%)",
        }}
        aria-hidden="true"
      />

      <div className="preview-wrap relative max-w-[760px] py-[90px] lg:pt-[120px]">
        {place && (
          <span className="mb-[26px] inline-flex items-center gap-[9px] rounded-full border border-preview-brand/25 bg-preview-brand/[0.13] px-[15px] py-2 text-[13.5px] font-semibold text-[#7EE3B3]">
            <span className="h-2 w-2 rounded-full bg-preview-brand shadow-[0_0_0_4px_rgba(45,190,126,.22)]" />
            {place}
          </span>
        )}

        <h1 className="text-[clamp(38px,5.4vw,68px)] font-black leading-[1.02] tracking-[-1.8px] text-preview-ink">
          Roof problems fixed right
          {city && (
            <>
              {" "}
              <span className="text-preview-brand">in {city}</span>
            </>
          )}
        </h1>

        <p className="my-6 max-w-[560px] text-[18px] text-[#CDD6D0] sm:text-[20px]">
          Repairs, replacements, inspections and gutter work for homes
          {city ? ` around ${city}` : ""}. Send a few photos and get a ballpark price to start from.
        </p>

        <div className="flex flex-wrap gap-3.5">
          <a
            href="#quote"
            className="inline-flex items-center gap-2 rounded-xl bg-preview-brand px-[26px] py-[15px] text-base font-bold text-[#06120C] no-underline shadow-[0_10px_30px_rgba(45,190,126,.32)]"
            style={{ minHeight: 52 }}
          >
            Get an instant quote
          </a>
          {phone && (
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 rounded-xl border-[1.5px] border-preview-line-2 bg-white/5 px-[26px] py-[15px] text-base font-bold text-preview-ink no-underline backdrop-blur-sm"
              style={{ minHeight: 52 }}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
              </svg>
              Call {phone}
            </a>
          )}
        </div>

        {showRating && (
          <div className="mt-[38px] flex items-center gap-3">
            <Stars count={rating} size={16} />
            <small className="text-[14px] text-[#B9C3BD]">
              <b className="text-preview-ink">{rating}</b> from{" "}
              <b className="text-preview-ink">{reviewCount}</b> Google reviews
            </small>
          </div>
        )}
      </div>
    </section>
  );
}
