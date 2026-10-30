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
| Visitor stats (the Umami website ID) | `src/config.ts` |
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

The site is live on Vercel at https://ai-journey-newsletter.vercel.app. That address is set in `astro.config.mjs`, and share links, RSS, the sitemap and the visitor stats all use it. If the site moves (for example to your own domain), change it there, or set a `SITE_URL` environment variable on the host.

The build output is a plain folder (`dist/`), so any static host works.

**Vercel or Netlify (easiest)**

1. Push this folder to a GitHub repository.
2. Import the repository on [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com). Both detect Astro automatically. The build command is `npm run build` and the output folder is `dist`.
3. If the address is not the one in `astro.config.mjs`, add an environment variable `SITE_URL` with the new address.

Every push to the main branch then publishes the site.

**GitHub Pages**

1. In the repository, go to Settings, then Pages, and choose "GitHub Actions" as the source.
2. Add the official Astro workflow from https://docs.astro.build/en/guides/deploy/github/.
3. If the site lives at `https://<user>.github.io/<repo>/`, set `SITE_URL=https://<user>.github.io` and `BASE_PATH=/<repo>` in the workflow. Every internal link already respects the base path.

## Weekly email

Subscribers type their email on the home page. It goes to a Google Form, and the form saves it to a Google Sheet (File, Download, Microsoft Excel gives you an Excel copy any time). A script inside that Sheet emails each new issue automatically.

**How it works.** Once a day the script reads the site's feed (`/rss.xml`). When there is an issue a subscriber has not received yet, it emails them the title, the "30 seconds" bullets and a "Read this week's issue" button. Every send is written to a **Sent log** tab, so nobody gets the same issue twice. People who unsubscribe are listed in an **Unsubscribed** tab and skipped.

**One-time setup** (after the site is live):

1. Open the Sheet linked to the form (in the form: Responses, then the green Sheets icon).
2. Click Extensions, then Apps Script. Delete the sample code, then paste everything from `scripts/google-apps-script/newsletter-mailer.gs`.
3. At the top of the script, check that `SITE_URL` is the live address with no slash at the end. It is already set to `https://ai-journey-newsletter.vercel.app`. Click the save icon.
4. In the function menu next to Run, choose `setUpDailyTrigger` and click Run. Google asks for permission: choose your account, click Advanced, then "Go to (project name)", then Allow. This is your own script asking to send email as you.
5. Choose `sendTestEmail` and click Run. Check your inbox to see the email.
6. Unsubscribe links (recommended): click Deploy, then New deployment, select type "Web app", set "Execute as" to Me and "Who has access" to Anyone, then Deploy. Copy the web app URL into `UNSUBSCRIBE_URL` at the top of the script and save. Until you do this, the unsubscribe link opens a reply email instead, and you remove people by adding them to the Unsubscribed tab yourself.

From then on, publishing a new issue on the site is all you do. The email goes out the next morning at 9 (change `SEND_HOUR` to pick another hour). To send right away, run `sendLatestIssue` from the editor.

**Limits.** A normal Gmail account can send about 100 emails a day from a script (a Google Workspace account allows more). If there are more subscribers than that, the script sends the rest the next day. When the list grows past a few hundred, move to a newsletter service such as Buttondown or Beehiiv: export the Sheet and import it there.

**Privacy.** The Sheet holds people's email addresses. Keep it private and share it only with team members who need it.

## Visitor stats

The team sees who is visiting on a free [Umami Cloud](https://umami.is) dashboard: views for each issue, how many different people visited, where they came from, phone or desktop, country, and clicks on **Save as PDF**, **Share issue** and **Subscribe**. Umami uses no cookies and never records names, emails or IP addresses, so the site needs no cookie banner.

**One-time setup** (after the site is live):

1. Make a free account on [umami.is](https://umami.is). The free Hobby plan allows up to 100,000 events a month and keeps 6 months of history.
2. Add a website. Name: `AI Journey`. Domain: the live address without `https://`, for example `ai-journey.vercel.app`.
3. Copy the site's **Website ID** from its settings and paste it into `analytics.umamiWebsiteId` in `src/config.ts`. Publish the site.
4. Visits are only counted on the live address set in `astro.config.mjs`, so your own previews never show up.
5. To give the team access, turn on **Share URL** in the website's settings in Umami and send that link. Anyone with it can see the stats (totals only, nothing personal), so keep it inside the team.

**Tag the links you post.** WhatsApp and Instagram often hide where a click came from. Add a tag to the end of every link you post, and Umami's **UTM** report shows where readers came from.

| Where you post | Add to the end of the link |
| --- | --- |
| WhatsApp group or status | `?utm_source=whatsapp` |
| Instagram (bio, story, post) | `?utm_source=instagram` |
| LinkedIn | `?utm_source=linkedin` |
| Weekly email | Added for you by the email script |

For example: `https://ai-journey-newsletter.vercel.app/issues/issue-1?utm_source=whatsapp`. If you pasted the email script into Google before this tag was added, paste it again and keep your own `SITE_URL` and `UNSUBSCRIBE_URL` values.

**Subscriber numbers.** "Subscribe" in Umami counts sign-ups made on the website. The full list of subscribers stays in the Google Sheet (see "Weekly email").

## Before launch

- Replace every `REPLACE_ME` link in `src/config.ts`, and confirm the WhatsApp invite link.
- Set up the weekly email script (see "Weekly email").
- Set up visitor stats (see "Visitor stats").
- The three invented sample issues are hidden (their file names start with `_`). Delete them whenever you like.

## Notes

- Light and dark mode follow the reader's system setting. The moon/sun button in the header saves their choice.
- The email box on the home page does not store anything on the site. It sends the address to the Google Form set in `src/config.ts` (`subscribeForm`), and the form saves it to a Google Sheet. See "Weekly email" above.
- Layout uses logical CSS properties (`margin-inline`, `inset-inline-start` and so on), so an Arabic right-to-left version can be added later by setting `dir="rtl"`.
- `public/logo/` holds the three official logo PNGs (untouched) and two small eye-only WebP versions made from them for the header and footer.
