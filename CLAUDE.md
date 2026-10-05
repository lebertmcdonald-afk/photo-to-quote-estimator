# CLAUDE.md

Guide for Claude Code working in this repo. Read this first in every session.

## What this project is

Instant Quote AI is a done-for-you quote and estimate system for local service businesses (roofers, painters, landscapers, fencers, pavers, cleaners).

Customers fill out a short trade-specific form and upload job photos. The system shows a ballpark estimate range and sends the owner a clean lead summary.

It is a lead capture and estimate engine. It is not a chatbot and not a dashboard.

## Current status

- Built: marketing landing page (Vite + React + Tailwind).
- Next: roofing quote form, then Supabase storage, pricing rules, owner email, admin view.
- Full plan: see the PRD and Product Roadmap docs (Instant Quote AI).

## Tech stack

- Frontend: Vite + React + Tailwind CSS
- Hosting: Vercel (planned)
- Database, file storage, auth: Supabase (planned)
- AI lead summary: Claude API (planned, server side only)
- Owner email: Resend (planned, server side only)

## Commands

```
npm install        # install dependencies
npm run dev        # start local dev server at http://localhost:5173
npm run build      # production build
npm run preview    # preview the production build
```

## Project structure

```
src/
  components/      # one component per landing page section
  config.js        # booking link and other site-wide settings
reference-design.html   # the approved design. Match it.
tailwind.config.js      # brand colors and fonts live here
```

## Design rules

- `reference-design.html` is the source of truth for layout, colors, fonts, spacing and copy. Match it closely.
- Mobile first. Every section must stack to one column on a phone.
- Brand colors (use the Tailwind theme names, not raw hex):
  - navy `#0F1E33`
  - blue `#1D5BD8`
  - panel `#F2F5F9`
  - border `#D5DCE6`
  - gray text `#4A5668`
- Fonts: Archivo for headings, Public Sans for body text.
- Tap targets at least 44px tall. Keep visible focus outlines.
- Icons are inline SVG. No emoji in the UI.

## Copy rules

- Never use em dashes in any copy. Use a period or a comma instead.
- Say "estimate range" or "ballpark quote." Never promise a final or guaranteed price.
- No made-up stats, percentages or revenue claims.
- No AI hype words. Plain, direct English, written for busy business owners.
- Sentence case for headings.

## Product rules

- The estimate range comes from the owner's pricing rules, not from the AI guessing a number.
- The AI organizes answers and writes the lead summary and next step only.
- Always show a low-to-high range plus a note that the final price is confirmed after review or inspection.
- Customers never need an account to submit a request.
- If the AI call fails, the owner still gets the lead with the raw answers. Never lose a lead.

## Security rules

- Never put API keys in frontend code. Claude API and email calls run in server functions only.
- Keep secrets in `.env` files. Never commit `.env`. Add new keys to `.env.example` with empty values.
- Owners can only see their own requests.

## How to work in this repo

- Build in small steps. Finish one section or feature, then stop so I can check it in the browser.
- Keep the booking link and other settings in `src/config.js` so they change in one place.
- Before adding a new library, tell me why and ask first.
- After changes, make sure `npm run build` passes.
- Explain what you changed in plain, simple language.
