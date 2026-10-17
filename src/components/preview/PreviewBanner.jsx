export default function PreviewBanner({ businessName }) {
  return (
    <div className="border-b border-preview-line bg-preview-surface2 px-6 py-2.5 text-center text-[13px] font-medium text-preview-muted">
      Preview built for <span className="text-preview-ink">{businessName}</span> by Lee. Not live
      yet.
    </div>
  );
}
