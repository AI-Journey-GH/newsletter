# Build the AI Journey newsletter website (design phase)

## Context
AI Journey is a student AI club at AUB (American University of Beirut). We publish a weekly newsletter that helps university students keep up with AI in one 10-15 minute read. Readers are mostly CS and engineering students, plus curious students from other majors. Most read on their phones between classes, arriving from Instagram or WhatsApp, but it must also look great on laptops.

This first phase is about DESIGN: build the full site with placeholder content so we can see the vision. Real content gets added later, so content must be completely separate from layout.

Read these first:
- docs/01-what-we-do.md, docs/02-audience-icp.md, docs/03-voice-and-personality.md, docs/04-example-output.md
- docs/inspiration/ (screenshots of sites and newsletters we like, numbered 01 to 06)
- public/logo/ (our logos):
  - logo-navy-cyan.png: main logo, navy outline + cyan brain, for light backgrounds
  - logo-navy.png: single-color navy version
  - logo-light.png: light version for dark navy backgrounds (header, dark bands)

## Tech
- Astro + Tailwind CSS, static output, deployable for free on Vercel, Netlify or GitHub Pages.
- Each issue is one Markdown/MDX file in a content collection. Adding a new issue = adding one file. No CMS or database.
- No backend. Poll, subscribe and tip links point to external URLs stored in one config file (src/config.ts).
- Use logical CSS properties (margin-inline etc.) so an Arabic version could be added later.

## Brand
Blue is the theme. These colors were sampled from the logo files:
- navy-950 #0B1A2B  dark backgrounds (header, bands), like our Instagram
- navy-700 #1C3C58  primary (logo outline): headings, buttons
- blue-800 #004068  logo wordmark blue: links, active states
- blue-500 #3E6FA8  hover states, secondary accents
- cyan-400 #7CC8D4  the ONLY accent (logo brain and waveform): progress bar, key numbers, highlights on dark
- sky-100  #E3EEF8  pale section backgrounds
- light    #E8ECF0  light logo color, subtle borders
- slate-500 #6B8299 muted text and labels
- white #FFFFFF, ink #111827
No red, orange or rainbow colors. Cyan text on white fails contrast: use cyan only on navy or as decoration.

Typography (Google Fonts):
- Display: Anton, uppercase, tight leading. For the wordmark, issue headlines and section titles. This matches our Instagram posts ("BOOTCAMP", "FUNDAMENTALS").
- Body: Inter, 17px mobile / 19px desktop, line-height 1.65, max ~68 characters per line.
- Labels: Inter 12-13px, uppercase, letter-spacing 0.12em.

Motifs: subtle SVG hexagon-network and circuit-line patterns at low opacity, ONLY on dark navy bands (like our Instagram graphics in inspiration 05 and 06). The logo's waveform bars are also a nice divider motif. Never put patterns behind body text.

## What to take from each inspiration
1. Future Proof (01, 02, article page): dark top bar with a huge condensed wordmark and social icons on the right; breadcrumb; giant uppercase headline with a plain subtitle under it; avatar + author + date + read time row with share icons; clean body text; pull quotes with a thick left border (ours in cyan or navy, not red); images with small italic captions; thin reading progress bar at the top; sticky bottom action bar.
2. DPQ newsletters (03): pale blue page background with white content cards; small uppercase eyebrow labels above headings; rounded navy pill buttons; a dark navy band with three icons; centered logo footer.
3. Heal Climate newsletter (04): alternating white and pale blue blocks to separate sections; eyebrow labels with a short line before them; image + text rows that alternate sides; quote block with a large quotation mark; dark navy call-to-action band.
4. Our Instagram (05, 06): navy, blue gradients, condensed bold titles, hexagon/circuit graphics. The site must feel like the same brand.
Blend: Future Proof's bold editorial reading experience for the issue page, DPQ/Heal Climate's block rhythm for separating sections, and our Instagram look for the header, hero and dark bands.

## Pages

### 1. Home (/)
- Header: dark navy bar, light logo + "AI JOURNEY" wordmark in Anton + small tagline "THE WEEKLY AI NEWSLETTER · AUB". Nav: Issues, About, Subscribe. Social icons: Instagram, WhatsApp, LinkedIn. Hamburger menu under 768px.
- Hero: latest issue on a navy band with the hex pattern: issue number, date, read time, Big Story headline, the 3 "this week in 30 seconds" bullets, button "READ THIS WEEK'S ISSUE".
- "What's in every issue": 4 icon blocks (News you can trust, Tool of the Week, Wildcard, Your Turn).
- Recent issues: cards with cover image, issue number, date, headline, read time. 1 column on mobile, 2 on tablet, 3 on desktop.
- Join band: WhatsApp group + Instagram buttons, email field that links to an external form.
- Footer: centered logo, links, "Send us a tip", "AI Journey Club · AUB".

### 2. Issue page (/issues/[slug]) - the most important page
- Cyan reading progress bar; header shrinks on scroll.
- Breadcrumb: Home › Issues › Issue #N
- Masthead: "ISSUE #N" eyebrow, date · X-min read, huge Anton headline, subtitle.
- Section jump chips, sticky under the header and horizontally scrollable on mobile: 30 Seconds · Big Story · Quick Hits · Tool · Wildcard · Your Turn.
- Sections in exactly this order, each visually distinct:
  a. This week in 30 seconds: pale blue card with 3 bullets.
  b. The Big Story: category tag, image with credit caption, Anton headline, bold first sentence, body, "Key numbers" box (big numbers in Anton), "Why it matters to you" callout (navy left border, pale blue background), "Go deeper" links.
  c. Quick Hits: 3 to 6 items. Each has a category tag, a bold first sentence, 1-3 sentences, a distinctly styled "So what:" line, and a source link. Thin dividers between items; optional thumbnail on the right on desktop.
  d. Tool of the Week: a card with fixed fields: name, screenshot, What it is, Best for (majors shown as chips), Try this in 5 minutes (numbered steps), Price, Watch out (outlined callout with an alert icon, staying in the blue palette).
  e. Wildcard: dark navy band with the hex pattern. A label shows the type: Paper Decoded, Concept in 60 Seconds, or Opportunity Board.
  f. Your Turn: last week's answer + shout-outs, then this week's game with options as tappable cards (A, B, C) and a big "VOTE IN ONE CLICK" button linking to the poll.
  g. Closing CTA: send a tip, share with a friend, subscribe.
- Reusable components: pull quote (Future Proof style), image with caption, category tag, callout, key-number stat.
- Sticky bottom bar on mobile: back to issues, back to top, share (Web Share API with copy-link fallback). On desktop, the same bar centered at reading width.
- Previous / next issue links at the end.

### 3. Archive (/issues)
All issues, newest first, with filter chips by category tag (minimal client-side JS).

### 4. About (/about)
Mission (from docs/01), who we are, team placeholders, join links.

## Category tags
NEW MODEL, LEADERS SAID, AI GONE WRONG, DISCOVERY, PAPER, REGULATION, FUN / WEIRD. Uppercase pills in shades of blue/cyan, each with a small icon. Defined in one config file so we can add more.

## Content model
Design a simple frontmatter schema for an issue (title, subtitle, issue number, date, read time, cover image + credit + alt text, tldr bullets, big story, quick hits, tool, wildcard, your turn). Editors are students, so keep it simple. Make alt text required. Add a copy-paste template file (src/content/issues/_template.md) and explain it in the README.

## Placeholder content
- Issue #0: build it from docs/04-example-output.md. Everything in it is invented, so show a small "SAMPLE ISSUE" badge on it.
- Create 2 more short placeholder issues so the archive and prev/next links have something to show.
- Use neutral placeholder images (abstract, generated SVGs or gradients). No real people's photos, no copyrighted images.

## Responsive and quality requirements
- Mobile first. Check at 360, 390, 768, 1024 and 1440px.
- Reading column max 720px; home grid max 1200px; 16px side gutters on mobile; no horizontal scrolling ever.
- Body text never under 16px; tap targets at least 44px.
- Headlines use clamp() (about 40px on mobile up to 88px on desktop) and never overflow; long words wrap.
- Images: responsive sizes, lazy-loaded, fixed aspect ratios (no layout shift).
- Light and dark mode via CSS variables, with a toggle in the header (default to system setting).
- Subtle motion only (fade/slide under 200ms), disabled for prefers-reduced-motion.
- WCAG AA contrast, semantic HTML, keyboard navigable, visible focus states.
- Per-issue SEO and Open Graph tags, an RSS feed, and a favicon from the logo.
- Lighthouse 95+ on mobile for performance and accessibility.

## Hard writing rules (from docs/03)
No em dashes (the long dash character) anywhere: UI text, placeholder content, alt text, meta tags. No cursing. Add an `npm run check` script that fails if an em dash appears in src/ or content files.

## How to work
1. First, read everything and show me a short plan: design tokens, component list, file structure. Wait for my OK before building.
2. Build a /styleguide page that shows all colors, type styles, tags, buttons, cards and callouts, so we can adjust the look in one place.
3. Build the pages.
4. Run the dev server, take screenshots of each page at 390px and 1440px, compare against the inspiration screenshots, and fix anything that looks off.
5. Write a README: run locally, add a new issue, deploy.
