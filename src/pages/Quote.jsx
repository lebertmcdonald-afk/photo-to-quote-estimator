import { Link } from "react-router-dom";
import QuoteFlow from "../components/quote/QuoteFlow.jsx";

export default function Quote() {
  return (
    <div className="min-h-screen bg-navy font-sans text-navy">
      <header className="border-b border-[#22344F]">
        <div className="container-x flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2.5 text-white no-underline">
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-blue">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 19h16" />
                <path d="M6 15l4-4 3 3 5-6" />
              </svg>
            </span>
            <span
              className="font-display text-xl font-extrabold"
              style={{ fontStretch: "90%", letterSpacing: "-0.01em" }}
            >
              Instant Quote AI
            </span>
          </Link>
          <Link
            to="/"
            className="text-[14px] font-medium text-navy-ink-3 no-underline hover:text-white"
          >
            Back to site
          </Link>
        </div>
      </header>

      <main
        className="container-x"
        style={{ paddingTop: "clamp(24px, 5vw, 56px)", paddingBottom: "clamp(48px, 8vw, 96px)" }}
      >
        <QuoteFlow />
      </main>
    </div>
  );
}
