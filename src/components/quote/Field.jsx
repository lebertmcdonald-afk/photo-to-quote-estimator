export function Label({ children, hint }) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3">
      <span className="text-[13px] font-semibold uppercase tracking-wide text-ink-soft">
        {children}
      </span>
      {hint && <span className="text-[12px] text-ink-soft">{hint}</span>}
    </div>
  );
}

export function Error({ children }) {
  if (!children) return null;
  return <p className="mt-1.5 text-[13px] text-red-pill-fg">{children}</p>;
}

export function ChipGroup({ name, value, onChange, options, error }) {
  return (
    <div>
      <div
        role="radiogroup"
        aria-label={name}
        className="flex flex-wrap gap-2"
      >
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(opt.value)}
              className={
                "rounded-[10px] border px-3.5 text-[14px] font-semibold transition " +
                (selected
                  ? "border-blue bg-blue-soft text-blue"
                  : "border-border bg-white text-navy hover:border-navy-200")
              }
              style={{ minHeight: 44, cursor: "pointer" }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      <Error>{error}</Error>
    </div>
  );
}

export function TextInput({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  inputMode,
  autoComplete,
  maxLength,
}) {
  return (
    <div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-invalid={!!error}
        className="w-full rounded-[10px] border border-border bg-white px-3.5 text-[16px] text-navy outline-none focus:border-blue"
        style={{ minHeight: 48 }}
      />
      <Error>{error}</Error>
    </div>
  );
}
