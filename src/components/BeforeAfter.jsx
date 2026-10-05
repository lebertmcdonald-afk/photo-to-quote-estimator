function XIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#B42318"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function BeforeAfter() {
  return (
    <section className="section-y">
      <div className="container-x flex flex-col gap-11">
        <h2 className="m-0 h-display max-w-[720px]">
          The same enquiry, two different mornings
        </h2>

        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))" }}
        >
          {/* Before */}
          <div
            className="flex flex-col gap-5 rounded-2xl border border-border bg-panel"
            style={{ padding: "clamp(22px, 3vw, 32px)" }}
          >
            <div className="flex flex-col gap-2">
              <span className="self-start rounded-full bg-red-pill-bg px-[11px] py-1 text-sm font-bold text-red-pill-fg">
                Before
              </span>
              <p className="m-0 text-[20px] font-semibold leading-[1.35]">
                Quote requests arrive half-empty. Staff chase details. Prospects wait.
              </p>
            </div>

            <div className="flex flex-col gap-1.5 rounded-xl border border-border bg-white p-4">
              <div className="text-[13px] text-ink-soft">From: mike.t@email.com</div>
              <div className="text-base">"hi how much for a fence in my backyard? thanks"</div>
            </div>

            <ul
              className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-2.5 p-0 text-[15px] text-muted"
            >
              {["No length", "No material", "No photos", "No phone number"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <XIcon />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div
            className="flex flex-col gap-5 rounded-2xl border-2 border-blue bg-white"
            style={{ padding: "clamp(22px, 3vw, 32px)" }}
          >
            <div className="flex flex-col gap-2">
              <span className="self-start rounded-full bg-blue-soft px-[11px] py-1 text-sm font-bold text-blue">
                After
              </span>
              <p className="m-0 text-[20px] font-semibold leading-[1.35]">
                Every enquiry arrives with scope, photos, estimate range, and a next-step
                recommendation.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-border">
              <div className="flex flex-wrap items-center justify-between gap-1.5 bg-navy px-4 py-[10px] text-sm text-white">
                <span className="font-bold">Mike T., backyard fence</span>
                <span className="text-navy-ink">Lead summary</span>
              </div>
              <dl
                className="m-0 grid gap-y-2 gap-x-4 px-4 py-[14px] text-[15px]"
                style={{ gridTemplateColumns: "max-content minmax(0, 1fr)" }}
              >
                <dt className="text-ink-soft">Scope</dt>
                <dd className="m-0 font-semibold">About 140 ft, 6 ft privacy, cedar</dd>
                <dt className="text-ink-soft">Photos</dt>
                <dd className="m-0 font-semibold">5 site photos, old fence removal needed</dd>
                <dt className="text-ink-soft">Range</dt>
                <dd className="m-0 font-semibold">$6,900 to $8,600</dd>
                <dt className="text-ink-soft">Next step</dt>
                <dd className="m-0 font-semibold text-blue">
                  Call to book a site visit this week
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
