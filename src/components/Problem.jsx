const items = [
  {
    title: "Requests come in missing the basics",
    body: 'No size, no photos, no clear scope. Just "how much for a new fence?"',
  },
  {
    title: "Staff spend hours chasing details",
    body: "Calls and texts back and forth asking for photos, measurements and what the job actually is.",
  },
  {
    title: "Quotes take days to go out",
    body: "Estimates wait until someone has a free evening to write them up.",
  },
  {
    title: "Faster competitors get the job",
    body: "The first company to send a number often gets the first real conversation.",
  },
  {
    title: "Leads go cold in the inbox",
    body: "Half-finished requests sit in email and voicemail until nobody remembers to follow up.",
  },
];

function XIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function Problem() {
  return (
    <section className="section-y">
      <div
        className="container-x grid items-start"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
          gap: "48px 72px",
        }}
      >
        <div className="flex flex-col gap-[18px]">
          <h2 className="m-0 h-display">Manual estimates leak revenue.</h2>
          <p className="m-0 text-muted" style={{ maxWidth: "30em" }}>
            Most quote requests show up as a one-line email or a missed call. By the time your team
            has the details, the customer has already heard back from someone else.
          </p>
        </div>

        <ul className="m-0 flex list-none flex-col border-t border-border p-0">
          {items.map((item) => (
            <li
              key={item.title}
              className="flex gap-4 border-b border-border py-[18px]"
            >
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-red-pill-bg text-red-pill-fg">
                <XIcon />
              </span>
              <div>
                <div className="font-bold">{item.title}</div>
                <div className="text-base text-muted">{item.body}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
