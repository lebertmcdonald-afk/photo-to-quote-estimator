import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Progress from "./Progress.jsx";
import StepJob from "./StepJob.jsx";
import StepPhotos from "./StepPhotos.jsx";
import StepContact from "./StepContact.jsx";
import Result from "./Result.jsx";
import { estimate, fetchPricingRules } from "../../pricing.js";
import { submitQuoteRequest } from "../../lib/submitQuoteRequest.js";
import { businessSlug } from "../../config.js";

const EMPTY_FORM = {
  jobType: "",
  sqFt: "",
  sqFtUnknown: false,
  material: "",
  stories: "",
  name: "",
  phone: "",
  email: "",
  address: "",
};

function validateStep(step, form) {
  const errs = {};
  if (step === 1) {
    if (!form.jobType) errs.jobType = "Pick the type of job.";
    if (!form.sqFtUnknown) {
      const n = Number(form.sqFt);
      if (!form.sqFt) errs.sqFt = "Add a size, or tick \"I'm not sure.\"";
      else if (!Number.isFinite(n) || n <= 0) errs.sqFt = "Enter a size in square feet.";
    }
    if (!form.material) errs.material = "Pick a material.";
    if (!form.stories) errs.stories = "Pick the number of stories.";
  }
  if (step === 3) {
    if (!form.name.trim()) errs.name = "Add your name.";
    if (!form.phone.trim()) errs.phone = "Add a phone number so we can call back.";
    if (!form.email.trim()) errs.email = "Add your email.";
    else if (!/.+@.+\..+/.test(form.email)) errs.email = "That email doesn't look right.";
    if (!form.address.trim()) errs.address = "Add the job address.";
  }
  return errs;
}

// The three step card. `embedded` is for the roofer preview pages, where the
// card sits part way down someone else's page instead of filling its own.
export default function QuoteFlow({ businessName = "Ridgeline Roofing", embedded = false }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(EMPTY_FORM);
  const [photos, setPhotos] = useState([]); // [{id, file, url}]
  const [errors, setErrors] = useState({});
  const [rules, setRules] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [result, setResult] = useState(null);

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  // Load the business's rates once. A failure leaves rules null, which
  // estimate() reads as "Inspection needed" rather than guessing.
  useEffect(() => {
    let active = true;
    fetchPricingRules(businessSlug)
      .then((r) => {
        if (active) setRules(r);
      })
      .catch(() => {
        if (active) setRules(null);
      });
    return () => {
      active = false;
    };
  }, []);

  // Revoke thumbnail URLs on unmount. Held in a ref so the cleanup sees the
  // latest list rather than the empty array captured at mount.
  const photosRef = useRef(photos);
  photosRef.current = photos;
  useEffect(() => {
    return () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url));
  }, []);

  // Move the view to the new step. Embedded, that means the card rather than
  // the top of the page, and never on first paint. Keyed off the step we last
  // scrolled for so a repeated effect run cannot move the page on its own.
  const cardRef = useRef(null);
  const scrolledFor = useRef(null);
  useEffect(() => {
    const key = result ? "done" : `step-${step}`;
    if (scrolledFor.current === key) return;
    const isFirst = scrolledFor.current === null;
    scrolledFor.current = key;

    if (!embedded) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (isFirst || !cardRef.current) return;
    const top = cardRef.current.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: "smooth" });
  }, [step, result, embedded]);

  const goBack = () => {
    setErrors({});
    setSaveError("");
    if (step > 1) setStep(step - 1);
  };

  const goNext = async () => {
    const errs = validateStep(step, form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setSaving(true);
    setSaveError("");
    try {
      // Generated here so the photo folder and the row share an id without
      // needing to read the inserted row back.
      const requestId = crypto.randomUUID();
      const estimateResult = estimate(
        { jobType: form.jobType, sqFt: form.sqFt, sqFtUnknown: form.sqFtUnknown },
        rules
      );

      await submitQuoteRequest({
        requestId,
        businessSlug,
        form,
        photos,
        estimateResult,
      });

      setResult(estimateResult);
    } catch {
      setSaveError("Something went wrong saving your request. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const done = result !== null;

  return (
    <div
      ref={cardRef}
      className="mx-auto w-full overflow-hidden rounded-[22px] border-[8px] border-navy-500 bg-white text-navy shadow-hero"
      style={{ maxWidth: 520 }}
    >
      <div className="flex items-center justify-between border-b border-divider-soft px-5 pt-[18px] pb-[14px]">
        <div>
          <div className="text-xs font-semibold text-ink-soft">{businessName}</div>
          <div className="font-display text-[19px] font-bold">
            {done ? "Your estimate" : "Get a roof estimate"}
          </div>
        </div>
        {!done && <Progress step={step} total={3} />}
      </div>

      <div className="flex flex-col gap-5 px-5 pb-5 pt-4">
        {done ? (
          <Result
            result={result}
            form={form}
            photoCount={photos.length}
            firstPhotoUrl={photos[0]?.url}
            businessName={businessName}
            embedded={embedded}
          />
        ) : (
          <>
            {step === 1 && <StepJob form={form} errors={errors} update={update} />}
            {step === 2 && (
              <StepPhotos photos={photos} setPhotos={setPhotos} businessName={businessName} />
            )}
            {step === 3 && <StepContact form={form} errors={errors} update={update} />}

            {saveError && (
              <p
                role="alert"
                className="rounded-[10px] bg-red-pill-bg px-3 py-2.5 text-[14px] text-red-pill-fg"
              >
                {saveError}
              </p>
            )}

            <div className="mt-2 flex items-center justify-between gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  disabled={saving}
                  className="rounded-[10px] border border-border bg-white px-5 font-sans text-[15px] font-semibold text-navy disabled:opacity-50"
                  style={{ minHeight: 48, cursor: saving ? "not-allowed" : "pointer" }}
                >
                  Back
                </button>
              ) : (
                !embedded && (
                  <Link
                    to="/"
                    className="text-[14px] font-medium text-ink-soft no-underline hover:text-navy"
                  >
                    Cancel
                  </Link>
                )
              )}
              <button
                type="button"
                onClick={goNext}
                disabled={saving}
                aria-busy={saving}
                className="flex flex-1 items-center justify-center gap-2 rounded-[10px] border-0 bg-[var(--quote-accent)] font-sans text-base font-bold text-[var(--quote-accent-ink)] disabled:opacity-70"
                style={{ minHeight: 48, cursor: saving ? "wait" : "pointer" }}
              >
                {saving && <Spinner />}
                {saving ? "Saving" : step === 3 ? "See my estimate" : "Next"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
