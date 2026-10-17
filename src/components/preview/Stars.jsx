// A row of stars for a rating that comes from real data, never padded up.
// Whole stars fill, and any remainder fills the next star partly, so 4.7
// reads as four and a bit rather than five, the way Google shows it.
export default function Stars({ count, size = 17 }) {
  const value = Math.max(0, Math.min(5, Number(count) || 0));
  const full = Math.floor(value);
  const part = value - full;

  return (
    <div className="flex items-center gap-[3px]" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: full }, (_, i) => (
        <StarSvg key={i} size={size} className="text-preview-gold" />
      ))}
      {part > 0 && (
        <span
          className="relative inline-block text-white/30"
          style={{ width: size, height: size }}
        >
          <StarSvg size={size} />
          <span
            className="absolute left-0 top-0 overflow-hidden text-preview-gold"
            style={{ width: `${Math.round(part * 1000) / 10}%`, height: size }}
          >
            <StarSvg size={size} />
          </span>
        </span>
      )}
    </div>
  );
}

function StarSvg({ size, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`block ${className}`}
      aria-hidden="true"
    >
      <path d="M12 3l2.7 5.5 6 .9-4.3 4.2 1 6L12 16.8 6.6 19.6l1-6L3.3 9.4l6-.9z" />
    </svg>
  );
}
