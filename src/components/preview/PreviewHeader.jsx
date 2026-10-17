export default function PreviewHeader({ businessName, phone, phoneHref }) {
  return (
    <header className="sticky top-0 z-50 border-b border-preview-line bg-preview-bg/85 backdrop-blur-md backdrop-saturate-150">
      <div className="preview-wrap flex min-h-[74px] items-center justify-between gap-3 py-3 sm:gap-4">
        {/* min-w-0 so a long name gives way to the call button instead of
            pushing it off the side of a phone screen. */}
        <div className="flex min-w-0 items-center gap-[11px] text-[17px] font-extrabold tracking-[-0.4px] text-preview-ink sm:text-[21px]">
          <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-[10px] bg-preview-brand text-[#06120C]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 11l9-7 9 7" />
              <path d="M5 10v9h14v-9" />
            </svg>
          </span>
          <span className="line-clamp-2 min-w-0 break-words leading-tight">{businessName}</span>
        </div>

        {phone && (
          <a
            href={phoneHref}
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-xl bg-preview-brand px-4 py-3 text-[15px] font-bold text-[#06120C] no-underline sm:px-[19px]"
            style={{ minHeight: 44 }}
          >
            <PhoneIcon />
            <span className="hidden sm:inline">{phone}</span>
            <span className="sm:hidden">Call</span>
          </a>
        )}
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
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
  );
}
