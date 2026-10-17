export default function Progress({ step, total }) {
  const pct = (step / total) * 100;
  return (
    <div className="flex flex-col items-end gap-1.5">
      <span className="rounded-full bg-[var(--quote-accent-soft)] px-[9px] py-1 text-xs font-semibold text-[var(--quote-accent-strong)]">
        Step {step} of {total}
      </span>
      <div
        className="relative overflow-hidden rounded bg-divider-soft"
        style={{ height: 4, width: 80 }}
        aria-hidden="true"
      >
        <div
          className="absolute left-0 top-0 h-full bg-[var(--quote-accent)]"
          style={{ width: `${pct}%`, transition: "width 0.2s" }}
        />
      </div>
    </div>
  );
}
