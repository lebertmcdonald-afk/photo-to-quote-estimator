const items = [
  "Branded quote request page",
  "Photo and file upload",
  "Estimate range logic based on your pricing",
  "Owner notification email",
  "Lead database",
  "Admin view of all requests",
  "Custom questions for your service type",
];

function Check() {
  return (
    <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-blue text-white">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12l5 5 9-10" />
      </svg>
    </span>
  );
}

export default function WhatYouGet() {
  return (
    <section className="section-y bg-panel">
      <div
        className="container-x grid items-start"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
          gap: "40px 72px",
        }}
      >
        <div className="flex flex-col gap-4">
          <h2 className="m-0 h-display">What your business gets</h2>
          <p className="m-0 text-muted" style={{ maxWidth: "30em" }}>
            We build and set it up for you. You hand over your pricing and the questions you
            usually ask, and we turn that into a working quote system with your name on it.
          </p>
        </div>

        <ul className="m-0 list-none rounded-2xl border border-border bg-white px-6 py-2">
          {items.map((item, i) => (
            <li
              key={item}
              className={
                "flex items-center gap-[14px] py-[14px] font-semibold" +
                (i < items.length - 1 ? " border-b border-divider-soft" : "")
              }
            >
              <Check />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
