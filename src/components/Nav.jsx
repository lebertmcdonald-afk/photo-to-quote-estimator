import { useEffect, useState } from "react";
import { bookingLink } from "../config.js";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="bg-navy border-b border-[#22344F]">
      <div className="container-x flex flex-wrap items-center justify-between gap-y-3 gap-x-6 py-4">
        {/* Logo */}
        <a
          href="#top"
          onClick={close}
          className="flex items-center gap-2.5 text-white no-underline"
        >
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

        {/* Desktop / tablet nav (unchanged, hidden on mobile) */}
        <nav
          aria-label="Main"
          className="hidden md:flex md:flex-wrap md:items-center md:gap-y-2 md:gap-x-[22px]"
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

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-11 w-11 items-center justify-center rounded-lg border-0 bg-transparent text-white md:hidden"
          style={{ cursor: "pointer" }}
        >
          {open ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-[#22344F] bg-navy md:hidden"
        >
          <nav
            aria-label="Mobile"
            className="container-x flex flex-col items-start gap-1 py-3"
          >
            <a
              href="#how"
              onClick={close}
              className="flex min-h-[44px] w-full items-center text-[16px] font-medium text-navy-ink-3 no-underline hover:text-white"
            >
              How it works
            </a>
            <a
              href="#trades"
              onClick={close}
              className="flex min-h-[44px] w-full items-center text-[16px] font-medium text-navy-ink-3 no-underline hover:text-white"
            >
              Trades
            </a>
            <a
              href="#faq"
              onClick={close}
              className="flex min-h-[44px] w-full items-center text-[16px] font-medium text-navy-ink-3 no-underline hover:text-white"
            >
              FAQ
            </a>
            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="btn-light mt-2"
            >
              Book a demo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
