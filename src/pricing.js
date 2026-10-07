import { supabase } from "./lib/supabase.js";

const round100 = (n) => Math.round(n / 100) * 100;

// Returns a map keyed by job_type, or null if the rates cannot be loaded.
// Callers treat null as "we do not know the price", never as zero.
export async function fetchPricingRules(businessSlug) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("pricing_rules")
    .select("job_type, rate_low, rate_high, rate_unit")
    .eq("business_slug", businessSlug);

  if (error || !data || data.length === 0) return null;

  const rules = {};
  for (const row of data) {
    rules[row.job_type] = {
      low: Number(row.rate_low),
      high: Number(row.rate_high),
      unit: row.rate_unit,
    };
  }
  return rules;
}

// Pure and synchronous. Anything unknown falls through to needsInspection
// so a missing rule can never render a wrong number.
export function estimate({ jobType, sqFt, sqFtUnknown }, rules) {
  if (!rules) return { needsInspection: true };
  if (sqFtUnknown || jobType === "unsure") return { needsInspection: true };

  const rule = rules[jobType];
  if (!rule) return { needsInspection: true };

  if (rule.unit === "flat") {
    return { low: round100(rule.low), high: round100(rule.high) };
  }

  if (rule.unit === "per_sqft") {
    const size = Number(sqFt);
    if (!Number.isFinite(size) || size <= 0) return { needsInspection: true };
    return {
      low: round100(size * rule.low),
      high: round100(size * rule.high),
    };
  }

  return { needsInspection: true };
}

export function formatRange({ low, high }) {
  const fmt = (n) => `$${n.toLocaleString("en-US")}`;
  return `${fmt(low)} to ${fmt(high)}`;
}
