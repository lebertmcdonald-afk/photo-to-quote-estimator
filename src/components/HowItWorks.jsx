const steps = [
  {
    n: 1,
    title: "Customer submits job details and photos",
    body: "They answer a short set of questions for your service and upload photos from their phone. Takes a few minutes.",
  },
  {
    n: 2,
    title: "AI organizes the request and generates an estimate range",
    body: "It sorts the answers and photos into a clear job summary, then applies your pricing rules to give a ballpark range.",
  },
  {
    n: 3,
    title: "You get a qualified lead and take it from there",
    body: "Send the final quote or book an inspection. You start the conversation with everything you need already in hand.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="section-y">
      <div className="container-x flex flex-col gap-11">
        <h2 className="m-0 h-display">How it works</h2>
        <ol
          className="m-0 grid list-none gap-5 p-0"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}
        >
          {steps.map((s) => (
            <li
              key={s.n}
              className="flex flex-col gap-[14px] border-t-4 border-navy pt-[22px]"
            >
              <span
                className="font-display font-extrabold text-blue"
                style={{ fontSize: 56, lineHeight: 1 }}
              >
                {s.n}
              </span>
              <h3 className="m-0 text-[21px] leading-[1.25]">{s.title}</h3>
              <p className="m-0 text-base text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
