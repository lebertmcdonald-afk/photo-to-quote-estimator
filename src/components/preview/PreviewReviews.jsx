import Stars from "./Stars.jsx";

// Real reviews only. If the business has none, the whole section is skipped
// by the caller rather than filled in with made up ones.
export default function PreviewReviews({ reviews }) {
  return (
    <section className="py-[72px] sm:py-[88px]">
      <div className="preview-wrap">
        <div className="mb-[46px] max-w-[640px]">
          <span className="text-xs font-bold uppercase tracking-[2px] text-preview-brand">
            Straight from Google
          </span>
          <h2 className="mb-3.5 mt-2.5 text-[clamp(28px,3.4vw,42px)] font-extrabold leading-[1.08] tracking-[-1px] text-preview-ink">
            What customers are saying
          </h2>
          <p className="text-[18px] text-preview-muted">
            Taken straight from our Google profile.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[22px] md:grid-cols-3">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="rounded-2xl border border-preview-line bg-preview-surface p-7"
            >
              <div className="mb-3.5">
                <Stars count={r.stars} />
              </div>
              <p className="mb-5 text-[15.5px] text-[#D3DBD6]">{r.text}</p>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-preview-brand/[0.18] font-bold text-preview-brand">
                  {(r.first_name || "?").trim().charAt(0).toUpperCase()}
                </span>
                <div>
                  <div className="text-[15px] font-bold leading-[1.1] text-preview-ink">
                    {r.first_name}
                  </div>
                  <div className="text-[12.5px] text-preview-faint">via Google</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
