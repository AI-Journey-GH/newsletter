import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../config';
import { getIssues, issueUrl, md, plain } from '../lib/utils';

// The feed also drives the weekly email (scripts/google-apps-script/newsletter-mailer.gs),
// so each item carries the "30 seconds" bullets as HTML in <content:encoded>.
export async function GET(context: APIContext) {
  const issues = await getIssues();
  return rss({
    title: `${site.name} blogs`,
    description: site.description,
    site: context.site!,
    items: issues.map((issue) => ({
      title: `Issue #${issue.data.issue}: ${issue.data.title}`,
      description: plain(issue.data.subtitle),
      pubDate: issue.data.date,
      link: issueUrl(issue),
      categories: issue.data.bigStory ? [issue.data.bigStory.tag] : undefined,
      content: `<ul>${issue.data.tldr.map((t) => `<li>${md(t)}</li>`).join('')}</ul>`,
    })),
    customData: `<language>en</language>`,
  });
}
