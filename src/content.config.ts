import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categoryKeys, wildcardKeys } from './data/categories';
import { smart } from './lib/smart-quotes';

// Reader-facing text: straight quotes become curly quotes automatically.
const text = () => z.string().transform(smart);

// Optional picture. If you add one, alt text is required.
const picture = (image: any) =>
  z.object({
    src: image(),
    alt: z.string().min(5, 'Describe the image in a few words (alt text is required)'),
    credit: text().optional(),
  });

const link = z.object({ label: text(), url: z.string().url() });

const issues = defineCollection({
  // Files starting with "_" (like _template.md) are ignored.
  loader: glob({ pattern: ['**/*.{md,mdx}', '!**/_*'], base: './src/content/issues' }),
  schema: ({ image }) =>
    z.object({
      issue: z.number().int().min(0),
      title: text(),
      subtitle: text(),
      date: z.coerce.date(),
      readTime: z.number().int().positive(),
      sample: z.boolean().default(false),
      draft: z.boolean().default(false),
      cover: picture(image).optional(),
      author: text().default('AI Journey team'),

      // Optional opening paragraphs, shown under the masthead (Markdown).
      intro: text().optional(),

      tldr: z.array(text()).min(3, 'The 30 seconds section needs 3 to 5 bullets').max(5, 'The 30 seconds section needs 3 to 5 bullets'),

      // The sections below are optional. An issue can instead tell its news as
      // "## Story 1: ..." sections in the Markdown body (see issue-1.md).
      bigStory: z.object({
        tag: z.enum(categoryKeys),
        headline: text(),
        lead: text(),
        image: picture(image).optional(),
        keyNumbers: z
          .array(z.object({ value: text(), label: text() }))
          .max(4)
          .default([]),
        whyItMatters: text(),
        goDeeper: z.array(link).default([]),
      }).optional(),

      quickHits: z
        .array(
          z.object({
            tag: z.enum(categoryKeys),
            lead: text(),
            body: text(),
            soWhat: text(),
            source: link,
            image: picture(image).optional(),
          }),
        )
        .min(3)
        .max(6)
        .optional(),

      tool: z.object({
        name: text(),
        url: z.string().url().optional(),
        screenshot: picture(image).optional(),
        whatItIs: text(),
        bestFor: z.array(text()).min(1),
        bestForNote: text().optional(),
        steps: z.array(text()).min(1),
        price: text(),
        watchOut: text(),
      }).optional(),

      wildcard: z.object({
        type: z.enum(wildcardKeys),
        headline: text(),
        lead: text(),
        body: text(),
      }).optional(),

      yourTurn: z.object({
        lastWeek: text().optional(),
        shoutOuts: text().optional(),
        title: text(),
        prompt: text(),
        options: z
          .array(z.object({ letter: z.string().max(2), text: text() }))
          .min(2)
          .max(4),
        pollUrl: z.string().url().optional(),
        answerNote: text().default('The answer comes in next week’s issue.'),
      }).optional(),

      // Optional line after the game, for example what is coming next week (Markdown).
      comingNext: text().optional(),

      // Optional list of sources, shown in a small footer at the end of the issue.
      sources: z.array(link).default([]),
    }),
});

export const collections = { issues };
