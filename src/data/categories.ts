// Category tags used on Big Story and Quick Hits.
// To add a tag: add one entry below. The key (left side) is what editors write in an issue file.
// tone: 1 to 5, picks one of the blue/cyan pill styles defined in src/styles/global.css (.tag--1 to .tag--5).
// icon: any name from src/components/Icon.astro.

export const categories = {
  'new-model': { label: 'New model', icon: 'cpu', tone: 1 },
  'leaders-said': { label: 'Leaders said', icon: 'mic', tone: 2 },
  'ai-gone-wrong': { label: 'AI gone wrong', icon: 'alert', tone: 3 },
  discovery: { label: 'Discovery', icon: 'flask', tone: 4 },
  paper: { label: 'Paper', icon: 'file', tone: 5 },
  regulation: { label: 'Regulation', icon: 'scale', tone: 3 },
  'fun-weird': { label: 'Fun / weird', icon: 'sparkles', tone: 2 },
} as const;

export type CategoryKey = keyof typeof categories;
export const categoryKeys = Object.keys(categories) as [CategoryKey, ...CategoryKey[]];

export const wildcardTypes = {
  'paper-decoded': { label: 'Paper Decoded', icon: 'file' },
  'concept-in-60-seconds': { label: 'Concept in 60 Seconds', icon: 'lightbulb' },
  'opportunity-board': { label: 'Opportunity Board', icon: 'briefcase' },
} as const;

export type WildcardKey = keyof typeof wildcardTypes;
export const wildcardKeys = Object.keys(wildcardTypes) as [WildcardKey, ...WildcardKey[]];
