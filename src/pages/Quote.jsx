import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Progress from "../components/quote/Progress.jsx";
import StepJob from "../components/quote/StepJob.jsx";
import StepPhotos from "../components/quote/StepPhotos.jsx";
import StepContact from "../components/quote/StepContact.jsx";
import Result from "../components/quote/Result.jsx";
import { estimate } from "../pricing.js";

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
  const [done, setDone] = useState(false);

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  // Revoke object URLs on unmount
  useEffect(() => {
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, done]);

  const goNext = () => {
    const errs = validateStep(step, form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    if (step < 3) setStep(step + 1);
    else setDone(true);
  };

  const goBack = () => {
    setErrors({});
    if (step > 1) setStep(step - 1);
  };

  const result = useMemo(
    () =>
      done
        ? estimate({
            jobType: form.jobType,
            sqFt: form.sqFt,
            sqFtUnknown: form.sqFtUnknown,
          })
        : null,
    [done, form.jobType, form.sqFt, form.sqFtUnknown]
  );

  return (
    <div className="min-h-screen bg-navy font-sans text-navy">
      {/* Thin header */}
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

      {/* Card */}
      <main
        className="container-x"
        style={{ paddingTop: "clamp(24px, 5vw, 56px)", paddingBottom: "clamp(48px, 8vw, 96px)" }}
      >
        <div
          className="mx-auto w-full overflow-hidden rounded-[22px] border-[8px] border-navy-500 bg-white text-navy shadow-hero"
          style={{ maxWidth: 520 }}
        >
          {/* Card header */}
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
                {step === 2 && (
                  <StepPhotos photos={photos} setPhotos={setPhotos} />
                )}
                {step === 3 && (
                  <StepContact form={form} errors={errors} update={update} />
                )}

                <div className="mt-2 flex items-center justify-between gap-3">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={goBack}
                      className="rounded-[10px] border border-border bg-white px-5 font-sans text-[15px] font-semibold text-navy"
                      style={{ minHeight: 48, cursor: "pointer" }}
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
                    className="flex-1 rounded-[10px] border-0 bg-blue font-sans text-base font-bold text-white"
                    style={{ minHeight: 48, cursor: "pointer" }}
                  >
                    {step === 3 ? "See my estimate" : "Next"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-[520px] text-center text-[13px] text-navy-ink-2">
          Demo form for Ridgeline Roofing. Nothing is sent or saved.
        </p>
      </main>
    </div>
  );
}
