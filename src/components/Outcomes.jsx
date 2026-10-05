const cards = [
  {
    title: "Captures the right details upfront",
    body: "Questions built for your trade, so every request includes size, materials, condition and timing.",
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </>
    ),
  },
  {
    title: "Accepts job photos and files",
    body: "Customers snap photos with their phone or attach plans and old quotes in the same step.",
    icon: (
      <>
        <path d="M4 7h3l2-3h6l2 3h3v12H4z" />
        <circle cx="12" cy="13" r="3.5" />
      </>
    ),
  },
  {
    title: "Creates a ballpark estimate range",
    body: "Your own pricing rules produce a low and high range. The customer knows what to expect before you call.",
    icon: (
      <>
        <path d="M3 17h18" />
        <path d="M6 17v-3M10 17v-5M14 17v-3M18 17v-5" />
        <path d="M8 8h8" />
      </>
    ),
  },
  {
    title: "Sends the owner a clean lead summary",
    body: "One email with the scope, photos, range and a suggested next step. Ready to call back.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
  },
];

export default function Outcomes() {
  return (
    <section className="section-y bg-panel">
      <div className="container-x flex flex-col gap-11">
        <div className="flex max-w-[720px] flex-col gap-[14px]">
          <h2 className="m-0 h-display">A quote request that does the first pass for you.</h2>
          <p className="m-0 text-muted">
            The work your office does before a quote can even start now happens on the form itself.
          </p>
        </div>

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }}
        >
          {cards.map((c) => (
            <div
              key={c.title}
              className="flex flex-col gap-3 rounded-[14px] border border-border bg-white p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-blue-soft text-blue">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {c.icon}
                </svg>
              </span>
              <h3 className="m-0 text-[19px] leading-[1.25]">{c.title}</h3>
              <p className="m-0 text-base text-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
