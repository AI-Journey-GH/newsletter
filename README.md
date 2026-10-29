# AI Journey Newsletter

The website for the weekly newsletter of **AI Journey** at AUB. Built with [Astro](https://astro.build) and Tailwind CSS. It is a static site: no database, no server, free to host.

## Run it on your computer

You need [Node.js](https://nodejs.org) 22.23.4 or newer (Astro 7 requires it). Node 24 LTS works too.

```bash
npm install
npm run dev
```

Open http://localhost:4321. The page reloads when you save a file.

| Command | What it does |
| --- | --- |
| `npm run dev` | Local preview while you edit |
| `npm run check` | Fails if an em dash appears anywhere in `src/`, `public/` or this README |
| `npm run build` | Runs the check, then builds the site into `dist/` |
| `npm run preview` | Serves the built `dist/` folder, to test before deploying |

## Add a new issue

Each issue is **one Markdown file** in `src/content/issues/`.

1. Copy `src/content/issues/_template.md` and rename the copy, for example `issue-3.md`. The file name becomes the web address: `/issues/issue-3`.
2. Fill in every field at the top of the file (the part between the two `---` lines). The comments in the template explain each one.
3. Write the rest of the Big Story below the second `---`. Normal paragraphs, `**bold**`, `[links](https://...)`, and lines starting with `>` (pull quotes) all work.
4. Set `sample: false`, and keep `draft: true` until it is ready. Drafts show in `npm run dev` but not on the live site.
5. Run `npm run check`, then `npm run dev`, and read the issue on your phone width before publishing.

Files whose name starts with `_` are ignored, so the template never shows on the site. The three invented sample issues are kept as `_sample-issue-*.md` for reference.

**Two ways to write an issue.**

- **Fixed sections:** fill `bigStory`, `quickHits`, `tool` and `wildcard`, as in the template.
- **Stories:** leave those out, and write the news in the body as `## Story 1: ...`, `## Story 2: ...` sections, with pictures as `![description](./images/issue-3/photo.jpg)`. Each story gets its own jump button at the top of the page. `src/content/issues/issue-1.md` is a full example, with `intro`, `author`, `comingNext` and `sources`.

**Things the build checks for you.** If something is wrong, `npm run dev` shows an error naming the field.

- `tldr` has exactly 3 bullets, and there are 3 to 6 `quickHits`.
- Every `tag` is one of the category keys (see below).
- `wildcard.type` is one of `paper-decoded`, `concept-in-60-seconds` or `opportunity-board`.
- Every picture has `alt` text.

**Pictures are optional.** The only image on the site right now is the logo. To add a picture to an issue:

1. Put the file in `src/content/issues/images/`.
2. Point to it from the issue file, for example `cover: { src: "./images/issue-3.jpg", alt: "What it shows" }`.

Astro resizes and lazy-loads it automatically. When an image field is empty, nothing is shown in its place.

Straight quotes in the issue file become curly quotes on the site automatically.

## Where things live

| To change | Edit |
| --- | --- |
| WhatsApp, Instagram, LinkedIn, subscribe and poll links | `src/config.ts` |
| Category tags (add one with a single line) | `src/data/categories.ts` |
| Colors, fonts, buttons, tags, callouts | `src/styles/global.css` (see them all at `/styleguide`) |
| Issue page sections | `src/components/issue/` |
| Pages | `src/pages/` |
| Issue fields (the content schema) | `src/content.config.ts` |

The `/styleguide` page shows every color, type style, tag, button, card and callout in one place. It is hidden from search engines.

### Writing rules

Follow `docs/03-voice-and-personality.md`. Two of its rules are hard rules:

- Never use the em dash character. Use a period, comma, colon or parentheses. `npm run check` (and every build) fails if one sneaks in.
- No cursing, ever.

## Deploy

The build output is a plain folder (`dist/`), so any static host works. Set `SITE_URL` to the final address so share links, RSS and the sitemap are correct.

**Vercel or Netlify (easiest)**

1. Push this folder to a GitHub repository.
2. Import the repository on [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com). Both detect Astro automatically. The build command is `npm run build` and the output folder is `dist`.
3. Add an environment variable `SITE_URL`, for example `https://ai-journey.vercel.app`.

Every push to the main branch then publishes the site.

**GitHub Pages**

1. In the repository, go to Settings, then Pages, and choose "GitHub Actions" as the source.
2. Add the official Astro workflow from https://docs.astro.build/en/guides/deploy/github/.
3. If the site lives at `https://<user>.github.io/<repo>/`, set `SITE_URL=https://<user>.github.io` and `BASE_PATH=/<repo>` in the workflow. Every internal link already respects the base path.

## Before launch

- Replace every `REPLACE_ME` link in `src/config.ts`, and confirm the WhatsApp invite link.
- The three invented sample issues are hidden (their file names start with `_`). Delete them whenever you like.
- Set `SITE_URL` on the host.

## Notes

- Light and dark mode follow the reader's system setting. The moon/sun button in the header saves their choice.
- The email box on the home page does not store anything. It opens the external subscribe form from `src/config.ts` in a new tab, and passes the address as `?email=` (useful for forms that support prefilling).
- Layout uses logical CSS properties (`margin-inline`, `inset-inline-start` and so on), so an Arabic right-to-left version can be added later by setting `dir="rtl"`.
- `public/logo/` holds the three official logo PNGs (untouched) and two small eye-only WebP versions made from them for the header and footer.
