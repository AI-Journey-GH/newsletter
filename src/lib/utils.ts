import { getCollection, type CollectionEntry } from 'astro:content';
import { marked } from 'marked';

export type Issue = CollectionEntry<'issues'>;

/** Prefix a site path with the base path (needed on GitHub Pages project sites). */
export function u(path = '/'): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}` || '/';
}

/** Render a short Markdown string (bold, italics, links) to inline HTML. */
export function md(text: string): string {
  return marked.parseInline(text, { async: false }) as string;
}

/** Render a Markdown string with paragraphs and lists. */
export function mdBlock(text: string): string {
  return marked.parse(text, { async: false }) as string;
}

/** Strip Markdown syntax for meta tags and plain text. */
export function plain(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim();
}

export function formatDate(date: Date, style: 'long' | 'short' = 'long'): string {
  return date.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    ...(style === 'long'
      ? { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
      : { month: 'short', day: 'numeric', year: 'numeric' }),
  });
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** All published issues, newest first. Drafts show only in `npm run dev`. */
export async function getIssues(): Promise<Issue[]> {
  const all = await getCollection('issues', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => b.data.issue - a.data.issue);
}

export const issueUrl = (issue: Issue) => u(`/issues/${issue.id}`);

/** Every category used in an issue (Big Story first). */
export function issueTags(issue: Issue): string[] {
  const { bigStory, quickHits = [] } = issue.data;
  return [...new Set([...(bigStory ? [bigStory.tag] : []), ...quickHits.map((q) => q.tag)])];
}
