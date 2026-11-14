// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { aiJourneyCode } from './src/lib/shiki-theme.mjs';

// SITE_URL: the public address of the site (used for RSS, sitemap and share links).
// BASE_PATH: only needed on GitHub Pages project sites, for example "/newsletter".
export default defineConfig({
  devToolbar: { enabled: false },
  site: process.env.SITE_URL || 'https://ai-journey-newsletter.vercel.app',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // Pictures in issues get responsive sizes (smaller files on phones)
  image: { layout: 'constrained' },
  markdown: { shikiConfig: { theme: aiJourneyCode, wrap: false } },
  integrations: [sitemap({ filter: (page) => !page.includes('/styleguide') })],
  vite: { plugins: [tailwindcss()] },
});
