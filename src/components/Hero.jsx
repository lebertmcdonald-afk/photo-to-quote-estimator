import { Link } from "react-router-dom";
import { bookingLink } from "../config.js";

export default function Hero() {
  return (
    <section
      id="top"
      className="bg-navy text-white"
      style={{
        paddingTop: "clamp(48px, 8vw, 96px)",
        paddingBottom: "clamp(64px, 9vw, 120px)",
      }}
    >
      <div
        className="container-x grid items-center gap-14"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
        }}
      >
        {/* Copy column */}
        <div className="flex flex-col gap-6">
          <p className="m-0 inline-flex self-start items-center gap-2 rounded-full border border-navy-400 bg-navy-600 px-3 py-[7px] text-sm font-semibold text-navy-ink-3">
            For roofers, painters, landscapers, fencers, pavers and cleaners
          </p>

          <h1 className="m-0 h-hero">
            Send quotes faster. Win jobs before your competitors reply.
          </h1>

          <p
            className="m-0 text-navy-ink-3"
            style={{ fontSize: "clamp(18px, 1.6vw, 20px)", lineHeight: 1.55, maxWidth: "34em" }}
          >
            Instant Quote AI lets prospects upload job details and photos, then turns the request
            into a structured estimate range and follow-up-ready lead.
          </p>

          <div className="mt-1 flex flex-wrap gap-3">
            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book a demo
            </a>
            <a href="#how" className="btn-outline-dark">
              See how it works
            </a>
          </div>

          <p className="m-0 text-sm text-navy-ink-2">
            Not a chatbot. Not another dashboard. A quote form that does the first pass for you.
          </p>
        </div>

        {/* Visual column */}
        <div className="flex flex-col items-center">
          <HeroCard />
          <HeroToast />
          <Link
            to="/quote"
            className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy-ink-3 underline decoration-navy-200 underline-offset-4 hover:text-white hover:decoration-white"
          >
            Try the live demo
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function HeroCard() {
  return (
    <div
      className="w-full overflow-hidden rounded-[22px] border-[8px] border-navy-500 bg-white text-navy shadow-hero"
      style={{ maxWidth: 400 }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between border-b border-divider-soft px-5 pt-[18px] pb-[14px]">
        <div>
          <div className="text-xs font-semibold text-ink-soft">Ridgeline Roofing</div>
          <div className="font-display text-[19px] font-bold">Get a roof estimate</div>
        </div>
        <span className="rounded-full bg-blue-soft px-[9px] py-1 text-xs font-semibold text-blue">
          Step 2 of 3
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-[14px] px-5 pb-5 pt-4">
        <div className="grid grid-cols-2 gap-[10px]">
          <div className="rounded-[10px] border border-border px-[11px] py-2">
            <div className="text-[11px] font-semibold text-ink-soft">Job type</div>
            <div className="text-sm font-semibold">Full replacement</div>
          </div>
          <div className="rounded-[10px] border border-border px-[11px] py-2">
            <div className="text-[11px] font-semibold text-ink-soft">Roof size</div>
            <div className="text-sm font-semibold">About 2,100 sq ft</div>
          </div>
        </div>

        {/* Photo uploader */}
        <div className="flex flex-col gap-[10px] rounded-xl border-2 border-dashed border-blue-dashed bg-blue-soft-2 p-3">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-blue">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 7h3l2-3h6l2 3h3v12H4z" />
              <circle cx="12" cy="13" r="3.5" />
            </svg>
            4 photos added
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            <div
              className="flex items-end justify-center overflow-hidden rounded-[7px] bg-[#5C7290]"
              style={{ aspectRatio: 1 }}
            >
              <svg width="100%" height="70%" viewBox="0 0 40 28" aria-hidden="true">
                <path d="M2 18L20 4l18 14v10H2z" fill="#3E4F66" />
                <rect x="15" y="17" width="10" height="11" fill="#2A3749" />
              </svg>
            </div>
            <div
              className="flex items-end overflow-hidden rounded-[7px] bg-[#6E7F96]"
              style={{ aspectRatio: 1 }}
            >
              <svg width="100%" height="80%" viewBox="0 0 40 32" aria-hidden="true">
                <path d="M0 32L40 6v26z" fill="#47586F" />
                <path d="M0 32L40 6" stroke="#2F3D50" strokeWidth="2" />
              </svg>
            </div>
            <div
              className="flex items-center justify-center overflow-hidden rounded-[7px] bg-[#7D8DA3]"
              style={{ aspectRatio: 1 }}
            >
              <svg width="80%" height="80%" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M4 22h24M4 16h24M4 10h24" stroke="#51627A" strokeWidth="3" />
                <path d="M12 10l3 6-2 6" stroke="#2F3D50" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div
              className="flex items-center justify-center rounded-[7px] border border-[#C6D6F3] bg-blue-soft text-xl font-semibold text-blue"
              style={{ aspectRatio: 1 }}
            >
              +
            </div>
          </div>
        </div>

        {/* Estimate panel */}
        <div className="flex flex-col gap-[10px] rounded-xl bg-navy px-4 py-[14px] text-white">
          <div className="text-xs font-semibold text-navy-ink">Your ballpark estimate</div>
          <div
            className="font-display font-extrabold"
            style={{ fontSize: 28, fontStretch: "88%", letterSpacing: "-0.01em" }}
          >
            $11,800 to $15,200
          </div>
          <div className="relative" style={{ height: 22 }} aria-hidden="true">
            <div
              className="absolute rounded"
              style={{ left: 0, right: 0, top: 7, height: 8, background: "#2B4166" }}
            />
            <div
              className="absolute rounded"
              style={{ left: "34%", width: "38%", top: 7, height: 8, background: "#5B8DEF" }}
            />
            <div
              className="absolute"
              style={{
                left: 0,
                right: 0,
                top: 17,
                height: 5,
                backgroundImage:
                  "repeating-linear-gradient(90deg, #4A6288 0 1px, transparent 1px 10%)",
              }}
            />
          </div>
          <div className="text-xs leading-tight text-navy-ink">
            Final price is confirmed after a quick inspection.
          </div>
        </div>

        <button
          type="button"
          className="rounded-[10px] border-0 bg-blue font-sans text-base font-bold text-white"
          style={{ minHeight: 48 }}
        >
          Send my request
        </button>
      </div>
    </div>
  );
}

function HeroToast() {
  return (
    <div
      className="relative flex gap-3 rounded-[14px] bg-white px-4 py-[14px] text-navy shadow-toast"
      style={{
        width: "min(100%, 340px)",
        marginTop: -34,
        marginLeft: "auto",
        marginRight: "max(0px, calc(50% - 250px))",
      }}
    >
      <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[10px] bg-amber-pill-bg text-amber-pill-fg">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      </span>
      <div className="flex min-w-0 flex-col gap-[3px]">
        <div className="text-sm font-bold">New lead: Dana R., roof replacement</div>
        <div className="text-[13px] text-muted">
          4 photos, about 2,100 sq ft, range $11.8k to $15.2k
        </div>
        <div className="text-[13px] font-semibold text-blue">
          Suggested next step: book an inspection
        </div>
      </div>
    </div>
  );
}
