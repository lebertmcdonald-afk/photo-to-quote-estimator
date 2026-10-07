import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Progress from "../components/quote/Progress.jsx";
import StepJob from "../components/quote/StepJob.jsx";
import StepPhotos from "../components/quote/StepPhotos.jsx";
import StepContact from "../components/quote/StepContact.jsx";
import Result from "../components/quote/Result.jsx";
import { estimate, fetchPricingRules } from "../pricing.js";
import { submitQuoteRequest } from "../lib/submitQuoteRequest.js";
import { businessSlug } from "../config.js";

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

export default function Quote() {
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, result]);

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
        <div
          className="mx-auto w-full overflow-hidden rounded-[22px] border-[8px] border-navy-500 bg-white text-navy shadow-hero"
          style={{ maxWidth: 520 }}
        >
          <div className="flex items-center justify-between border-b border-divider-soft px-5 pt-[18px] pb-[14px]">
            <div>
              <div className="text-xs font-semibold text-ink-soft">Ridgeline Roofing</div>
              <div className="font-display text-[19px] font-bold">
                {done ? "Your estimate" : "Get a roof estimate"}
              </div>
            </div>
            {!done && <Progress step={step} total={3} />}
          </div>

          <div className="flex flex-col gap-5 px-5 pb-5 pt-4">
            {done ? (
              <Result result={result} form={form} photoCount={photos.length} />
            ) : (
              <>
                {step === 1 && <StepJob form={form} errors={errors} update={update} />}
                {step === 2 && <StepPhotos photos={photos} setPhotos={setPhotos} />}
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
                    <Link
                      to="/"
                      className="text-[14px] font-medium text-ink-soft no-underline hover:text-navy"
                    >
                      Cancel
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={saving}
                    aria-busy={saving}
                    className="flex flex-1 items-center justify-center gap-2 rounded-[10px] border-0 bg-blue font-sans text-base font-bold text-white disabled:opacity-70"
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
      </main>
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
