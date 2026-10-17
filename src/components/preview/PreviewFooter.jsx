import { bookingLink } from "../../config.js";

export default function PreviewFooter({ businessName, city, state, phone, phoneHref }) {
  const place = [city, state].filter(Boolean).join(", ");

  return (
    <footer className="border-t border-preview-line bg-[#070A09] py-11 text-[14px] text-preview-muted">
      <div className="preview-wrap flex flex-wrap items-center justify-between gap-[18px]">
        <div>
          <b className="text-preview-ink">{businessName}</b>
          {place && <br />}
          {place}
        </div>

        {phone && (
          <a href={phoneHref} className="text-[20px] font-extrabold text-preview-brand no-underline">
            {phone}
          </a>
        )}

        <a
          href={bookingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-preview-line-2 underline-offset-4 hover:text-preview-ink"
        >
          Site preview by Lee
        </a>
      </div>
    </footer>
  );
}
