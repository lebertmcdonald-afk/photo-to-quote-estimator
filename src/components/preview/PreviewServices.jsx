const SERVICES = [
  {
    name: "Roof Repair",
    copy: "Shingles, flashing and small damaged areas put back in order.",
    icon: (
      <>
        <path d="M3 11l9-7 9 7" />
        <path d="M5 10v9h14v-9" />
        <path d="M9.5 14.5l2 2 3.5-3.5" />
      </>
    ),
  },
  {
    name: "Roof Replacement",
    copy: "The old roof comes off and a new one goes on from the deck up.",
    icon: (
      <>
        <path d="M2 9l10-6 10 6" />
        <path d="M2 14l10-6 10 6" />
        <path d="M2 19l10-6 10 6" />
      </>
    ),
  },
  {
    name: "Leak Repair",
    copy: "We trace where the water is getting in, then seal that spot.",
    icon: (
      <>
        <path d="M12 3s6 6.5 6 10.5a6 6 0 0 1-12 0C6 9.5 12 3 12 3z" />
      </>
    ),
  },
  {
    name: "Storm Damage",
    copy: "Repairs to roofs hit by wind, hail or falling branches.",
    icon: (
      <>
        <path d="M6 15a4 4 0 0 1 .6-8A6 6 0 0 1 18 8.5a3.5 3.5 0 0 1 .3 6.9" />
        <path d="M13 13l-3 5h4l-2 4" />
      </>
    ),
  },
  {
    name: "Roof Inspections",
    copy: "A close look at the roof, with notes and photos of what we find.",
    icon: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="M20 20l-4.5-4.5" />
      </>
    ),
  },
  {
    name: "Gutters",
    copy: "Gutter cleaning, gutter repairs and new gutter installs.",
    icon: (
      <>
        <path d="M3 7h18v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M8 13v5" />
        <path d="M16 13v5" />
      </>
    ),
  },
];

export default function PreviewServices({ city }) {
  return (
    <section className="py-[72px] sm:py-[88px]">
      <div className="preview-wrap">
        <div className="mb-[46px] max-w-[640px]">
          <span className="text-xs font-bold uppercase tracking-[2px] text-preview-brand">
            Services
          </span>
          <h2 className="mb-3.5 mt-2.5 text-[clamp(28px,3.4vw,42px)] font-extrabold leading-[1.08] tracking-[-1px] text-preview-ink">
            What we do on roofs
          </h2>
          <p className="text-[18px] text-preview-muted">
            The work we get called out for most{city ? ` around ${city}` : ""}.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[22px] md:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.name}
              className="rounded-2xl border border-preview-line bg-preview-surface p-[30px]"
            >
              <div className="mb-[18px] grid h-[52px] w-[52px] place-items-center rounded-[14px] bg-preview-brand/[0.13] text-preview-brand">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {s.icon}
                </svg>
              </div>
              <h3 className="mb-2 text-[19px] font-bold tracking-[-0.3px] text-preview-ink">
                {s.name}
              </h3>
              <p className="text-[15px] text-preview-muted">{s.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
