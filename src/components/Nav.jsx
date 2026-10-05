import { bookingLink } from "../config.js";

export default function Nav() {
  return (
    <header className="bg-navy border-b border-[#22344F]">
      <div className="container-x flex flex-wrap items-center justify-between gap-y-3 gap-x-6 py-4">
        <a href="#top" className="flex items-center gap-2.5 text-white no-underline">
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
        </a>

        <nav
          aria-label="Main"
          className="flex flex-wrap items-center gap-y-2 gap-x-[22px]"
        >
          <a
            href="#how"
            className="text-[15px] font-medium text-navy-ink-3 no-underline hover:text-white"
          >
            How it works
          </a>
          <a
            href="#trades"
            className="text-[15px] font-medium text-navy-ink-3 no-underline hover:text-white"
          >
            Trades
          </a>
          <a
            href="#faq"
            className="text-[15px] font-medium text-navy-ink-3 no-underline hover:text-white"
          >
            FAQ
          </a>
          <a
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-light"
          >
            Book a demo
          </a>
        </nav>
      </div>
    </header>
  );
}
