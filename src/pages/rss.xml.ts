import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../config';
import { getIssues, issueUrl, plain } from '../lib/utils';

export async function GET(context: APIContext) {
  const issues = await getIssues();
  return rss({
    title: `${site.name} newsletter`,
    description: site.description,
    site: context.site!,
    items: issues.map((issue) => ({
      title: `Issue #${issue.data.issue}: ${issue.data.title}`,
      description: plain(issue.data.subtitle),
      pubDate: issue.data.date,
      link: issueUrl(issue),
      categories: issue.data.bigStory ? [issue.data.bigStory.tag] : undefined,
    })),
    customData: `<language>en</language>`,
  });
}
