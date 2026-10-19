import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { previewSupabase } from "../lib/previewSupabase.js";
import { withoutLegalEnding } from "../lib/businessName.js";
import PreviewBanner from "../components/preview/PreviewBanner.jsx";
import PreviewHeader from "../components/preview/PreviewHeader.jsx";
import PreviewHero from "../components/preview/PreviewHero.jsx";
import PreviewServices from "../components/preview/PreviewServices.jsx";
import PreviewReviews from "../components/preview/PreviewReviews.jsx";
import PreviewQuote from "../components/preview/PreviewQuote.jsx";
import PreviewFooter from "../components/preview/PreviewFooter.jsx";

// Keeps the plus on international numbers, drops everything else.
function telHref(phone) {
  if (!phone) return null;
  const digits = String(phone).replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : null;
}

export default function Preview() {
  const { slug } = useParams();
  const [status, setStatus] = useState("loading"); // loading | ready | missing
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    let active = true;

    (async () => {
      setStatus("loading");
      if (!previewSupabase) {
        if (active) setStatus("missing");
        return;
      }
      try {
        const { data, error } = await previewSupabase.rpc("get_preview", { p_slug: slug });
        if (!active) return;
        // The function may hand back a single row or a one row list.
        const row = Array.isArray(data) ? data[0] : data;
        if (error || !row) {
          setStatus("missing");
          return;
        }
        setBusiness(row);
        setStatus("ready");
      } catch {
        if (active) setStatus("missing");
      }
    })();

    return () => {
      active = false;
    };
  }, [slug]);

  // Previews are private links, so keep them out of search results. This is
  // the only page that adds the tag, and it comes back off on the way out.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  useEffect(() => {
    const name = business?.business_name;
    if (!name) return;
    const previous = document.title;
    document.title = name;
    return () => {
      document.title = previous;
    };
  }, [business?.business_name]);

  if (status === "loading") {
    return (
      <div className="grid min-h-screen place-items-center bg-preview-bg font-inter text-preview-muted">
        <p>Loading preview</p>
      </div>
    );
  }

  if (status === "missing") {
    return (
      <div className="grid min-h-screen place-items-center bg-preview-bg px-6 text-center font-inter">
        <div>
          <h1 className="mb-2 text-[26px] font-extrabold text-preview-ink">
            This preview isn't available
          </h1>
          <p className="text-preview-muted">
            Check the link, or ask Lee to send it across again.
          </p>
        </div>
      </div>
    );
  }

  const phone = business.phone || "";
  const phoneHref = telHref(phone);
  // Guarded because a Postgres function can hand json back as a string.
  const reviews = Array.isArray(business.reviews)
    ? business.reviews.filter((r) => r && r.text)
    : [];
  const shared = {
    businessName: business.business_name,
    city: business.city,
    state: business.state,
    phone: phoneHref ? phone : "",
    phoneHref,
  };

  // What the page calls them. The legal name stays on the quote request itself,
  // which is a record of who the job is for, so only the parts of the page a
  // visitor reads use the shorter one.
  const displayName = withoutLegalEnding(business.business_name);

  return (
    <div className="preview-site min-h-screen bg-preview-bg font-inter text-preview-ink antialiased">
      <PreviewBanner businessName={displayName} />
      <PreviewHeader {...shared} businessName={displayName} />
      <PreviewHero
        {...shared}
        rating={business.google_rating}
        reviewCount={business.google_review_count}
      />
      <PreviewServices city={shared.city} />
      {reviews.length > 0 && <PreviewReviews reviews={reviews} />}
      <PreviewQuote {...shared} />
      <PreviewFooter {...shared} businessName={displayName} />
    </div>
  );
}
