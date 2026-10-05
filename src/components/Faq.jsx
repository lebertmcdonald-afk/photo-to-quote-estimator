import { useState } from "react";

const faqs = [
  {
    q: "Does this replace final quoting?",
    a: "No. The customer gets a ballpark range, and you get a complete request. You still confirm the final price, usually after a site visit or a short call.",
  },
  {
    q: "Can it work for my trade?",
    a: "If you price jobs from things like size, materials, condition and photos, yes. We set up the questions and the range logic around how you already quote.",
  },
  {
    q: "Can I customize pricing rules?",
    a: "Yes. Your rates, minimums and add-ons decide the range. When your prices change, the ranges change with them.",
  },
  {
    q: "Does it work on mobile?",
    a: "Yes. Most people send quote requests from their phone, so the form is built for small screens and lets them upload straight from the camera.",
  },
  {
    q: "What happens after someone submits?",
    a: "The customer sees their estimate range and a note that the final price comes after review. You get an email with the full lead summary, and the request is saved in your admin view so it never gets lost.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="section-y">
      <div
        className="container-x grid items-start"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "32px 72px",
        }}
      >
        <h2 className="m-0 h-display">Questions owners ask</h2>

        <div className="flex flex-col border-t border-border">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-4 border-0 bg-transparent py-5 text-left font-sans text-[18px] font-bold text-navy"
                  style={{ minHeight: 44, cursor: "pointer" }}
                >
                  <span>{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="flex-none text-[26px] font-normal text-blue"
                    style={{
                      transition: "transform 0.2s",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p
                    id={`faq-panel-${i}`}
                    className="m-0 pb-5 text-muted"
                  >
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
