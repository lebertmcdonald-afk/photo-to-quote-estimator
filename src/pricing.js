// Placeholder pricing for Ridgeline Roofing demo.
// Swap these numbers for real rules in Week 3 without touching the UI.

const RATES = {
  fullPerSqFt: { low: 5.6, high: 7.2 },
  repairFlat: { low: 400, high: 1500 },
};

const round100 = (n) => Math.round(n / 100) * 100;

export function estimate({ jobType, sqFt, sqFtUnknown }) {
  if (sqFtUnknown || jobType === "unsure") {
    return { needsInspection: true };
  }

  if (jobType === "repair") {
    return { low: RATES.repairFlat.low, high: RATES.repairFlat.high };
  }

  if (jobType === "full") {
    const size = Number(sqFt);
    if (!Number.isFinite(size) || size <= 0) {
      return { needsInspection: true };
    }
    return {
      low: round100(size * RATES.fullPerSqFt.low),
      high: round100(size * RATES.fullPerSqFt.high),
    };
  }

  return { needsInspection: true };
}

export function formatRange({ low, high }) {
  const fmt = (n) => `$${n.toLocaleString("en-US")}`;
  return `${fmt(low)} to ${fmt(high)}`;
}
