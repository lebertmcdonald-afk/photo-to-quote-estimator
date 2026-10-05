const trades = [
  { name: "Roofing", tags: ["Roof photos", "Square footage", "Repair or replace"] },
  { name: "Painting", tags: ["Rooms", "Surfaces", "Condition", "Photos"] },
  { name: "Landscaping", tags: ["Yard scope", "Materials", "Area size"] },
  { name: "Fencing", tags: ["Length", "Material", "Site photos"] },
  { name: "Cleaning", tags: ["Property size", "Service type", "Frequency"] },
  { name: "Paving", tags: ["Area size", "Damage photos", "Surface type"] },
];

export default function Trades() {
  return (
    <section id="trades" className="section-y bg-navy text-white">
      <div className="container-x flex flex-col gap-11">
        <div className="flex max-w-[720px] flex-col gap-[14px]">
          <h2 className="m-0 h-display">Set up for the way your trade quotes</h2>
          <p className="m-0 text-navy-ink-3">
            Each version asks for the details you would ask for on the phone. Here is what that
            looks like for a few trades.
          </p>
        </div>

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}
        >
          {trades.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-[14px] rounded-[14px] border border-navy-400 bg-navy-700 p-[22px]"
            >
              <h3 className="m-0 font-display text-2xl font-bold">{t.name}</h3>
              <div className="flex flex-wrap gap-2">
                {t.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-navy-300 px-[11px] py-[5px] text-sm text-navy-ink-4"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="m-0 text-base text-navy-ink-3">
          Different trade? If you write estimates by hand today, we can build the questions around
          how you price.
        </p>
      </div>
    </section>
  );
}
