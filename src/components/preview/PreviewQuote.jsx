import QuoteFlow from "../quote/QuoteFlow.jsx";

// Pexels, free commercial licence, no attribution required. Sits under the
// green wash so the band keeps its colour but picks up some roof texture.
const BAND_IMG =
  "https://images.pexels.com/photos/38781381/pexels-photo-38781381.jpeg?auto=compress&cs=tinysrgb&w=1000";

export default function PreviewQuote({ businessName, city, state, phone, phoneHref }) {
  const place = [city, state].filter(Boolean).join(", ");

  return (
    <section id="quote" className="scroll-mt-[90px] py-[72px] sm:py-[88px]">
      <div className="preview-wrap">
        <div
          className="grid items-center gap-10 overflow-hidden rounded-[26px] p-[34px] text-[#06120C] lg:grid-cols-[1.05fr_.95fr] lg:gap-12 lg:p-[54px]"
          style={{
            backgroundImage: `linear-gradient(135deg,rgba(21,184,115,.93),rgba(14,125,78,.95)),url('${BAND_IMG}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <h2 className="mb-3.5 text-[clamp(28px,3.4vw,42px)] font-extrabold leading-[1.08] tracking-[-1px]">
              Get a ballpark price now
            </h2>
            <p className="mb-[26px] max-w-[430px] text-[17.5px] font-medium text-[#06301F]">
              Answer a few quick questions, add photos of the roof, and see an estimate range before
              anyone comes out.
            </p>

            {phone && (
              <a
                href={phoneHref}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-[26px] py-[15px] text-base font-bold text-[#0A0D0C] no-underline"
                style={{ minHeight: 52 }}
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
                Call {phone}
              </a>
            )}

            {place && (
              <div className="mt-[22px] flex items-center gap-2 text-[14.5px] font-semibold text-[#0A3A25]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                {place}
              </div>
            )}
          </div>

          <div>
            <p className="mx-auto mb-3 max-w-[520px] rounded-[10px] bg-[#06120C]/15 px-3.5 py-2.5 text-[13.5px] font-semibold">
              Demo: prices are samples. On your live site, requests go straight to you.
            </p>
            <QuoteFlow businessName={businessName} embedded />
          </div>
        </div>
      </div>
    </section>
  );
}
