/**
 * A business name with the legal form taken off the end.
 *
 * The name on a preview comes off a state license file, where it is written the
 * legal way: "City Roofing and Remodeling LLC". Nobody says the LLC out loud,
 * and on their own website it would look like a letterhead, so it comes off the
 * header, the hero, the footer and the banner.
 *
 * Only the legal form goes. The trade goes nowhere: "and Remodeling" is part of
 * what they do and part of what they call themselves, so a name is shortened
 * here and never cut down.
 */

// The same list the Prospect Hunter's short name guess uses, so a preview and
// the email that sends it read the same way.
const LEGAL_ENDINGS = new Set([
  "llc", "l.l.c", "inc", "incorporated", "corp", "corporation", "co", "company",
  "ltd", "limited", "lp", "llp", "pllc", "pc", "pa",
]);

/** One word, without the punctuation people put round a legal form. */
function bareWord(word) {
  return String(word).toLowerCase().replace(/^[(,.]+|[),.]+$/g, "");
}

export function withoutLegalEnding(name) {
  let words = String(name ?? "").trim().split(/\s+/).filter(Boolean);

  // Never the last word standing. "Smith LLC" is Smith, but a company whose
  // whole name is a legal form keeps the name it has.
  while (words.length > 1 && LEGAL_ENDINGS.has(bareWord(words[words.length - 1]))) {
    words = words.slice(0, -1);
  }

  // "City Roofing and Remodeling, LLC" leaves a comma hanging on the end. A
  // full stop stays, because "Smith Bros." is how that name is written.
  return words.join(" ").replace(/,+$/, "");
}
