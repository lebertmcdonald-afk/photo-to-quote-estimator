import { bookingLink, contactLink } from "../config.js";

export default function CtaBand() {
  return (
    <section
      id="book"
      className="bg-navy text-white"
      style={{
        paddingTop: "clamp(64px, 9vw, 104px)",
        paddingBottom: "clamp(64px, 9vw, 104px)",
      }}
    >
      <div className="container-x flex flex-wrap items-end justify-between gap-8">
        <div className="flex min-w-0 flex-1 flex-col gap-4" style={{ flexBasis: 520 }}>
          <h2 className="m-0 h-cta">Stop letting quote requests rot in the inbox.</h2>
          <p className="m-0 text-[18px] text-navy-ink-3">
            Built for your service, your pricing logic, and your follow-up process.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: "15px 28px" }}
          >
            Book a demo
          </a>
          <a
            href={contactLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-dark"
          >
            Request a custom version
          </a>
        </div>
      </div>
    </section>
  );
}
