import type { ImageMetadata } from 'astro';
import frontierCover from '../assets/community/two-labs-one-frontier.jpg';
import bootcampCover from '../assets/community/bootcamp-poster.jpg';
import fundamentalsCover from '../assets/community/ml-fundamentals.webp';
import transformersCover from '../assets/community/transformers.webp';

export type Activity = {
  id: string;
  title: string;
  category: 'Talks' | 'Bootcamps' | 'Learning series';
  summary: string;
  sourceUrl: string;
  sourceKind: 'recap' | 'announcement';
  date?: string;
  periodLabel: string;
  cover: { src: ImageMetadata; alt: string };
  featured?: boolean;
  topics: string[];
};

export const activityCategories = ['All', 'Talks', 'Bootcamps', 'Learning series'] as const;

export const activities: Activity[] = [
  {
    id: 'two-labs-one-frontier',
    title: 'Two Labs, One Frontier',
    category: 'Talks',
    summary: 'A conversation with researchers from OpenAI and Anthropic on AI research, safety, and the frontier of the field.',
    sourceUrl: 'https://www.instagram.com/p/De97Al8DbIK/',
    sourceKind: 'recap',
    date: '2026-10-23',
    periodLabel: '23 Oct 2026',
    cover: { src: frontierCover, alt: 'AI Journey’s Two Labs, One Frontier recap with a panel conversation and group photo at AUB' },
    featured: true,
    topics: ['AI research', 'AI safety', 'Frontier models'],
  },
  {
    id: 'summer-ai-bootcamp',
    title: 'Summer AI Bootcamp',
    category: 'Bootcamps',
    summary: 'Four hands-on sessions covering an introduction to AI, supervised learning, unsupervised learning, and neural networks.',
    sourceUrl: 'https://www.instagram.com/p/Daafi_GDbQw/',
    sourceKind: 'announcement',
    periodLabel: 'Summer program',
    cover: { src: bootcampCover, alt: 'AI Journey Summer Bootcamp poster listing four sessions from an introduction to AI to neural networks' },
    topics: ['Introduction to AI', 'Supervised learning', 'Unsupervised learning', 'Neural networks'],
  },
  {
    id: 'ml-fundamentals',
    title: 'Machine Learning Fundamentals',
    category: 'Learning series',
    summary: 'Lecture four explores linear discriminant analysis, penalized linear regression, and KNN classification.',
    sourceUrl: 'https://www.instagram.com/p/DVO2sb2DXRG/',
    sourceKind: 'announcement',
    date: '2026-02-27',
    periodLabel: '27 Feb 2026',
    cover: { src: fundamentalsCover, alt: 'Machine Learning Fundamentals lecture four poster for February 27, 2026, covering LDA, penalized regression, and KNN classification' },
    topics: ['Linear discriminant analysis', 'Penalized regression', 'KNN classification'],
  },
  {
    id: 'transformers',
    title: 'Inside Transformers',
    category: 'Learning series',
    summary: 'The first lecture in the advanced series introduces transformers, attention, self-attention, and the building blocks of large language models.',
    sourceUrl: 'https://www.instagram.com/p/DVBnp9EDYvP/',
    sourceKind: 'announcement',
    date: '2026-02-24',
    periodLabel: '24 Feb 2026',
    cover: { src: transformersCover, alt: 'AI Journey advanced series lecture one poster introducing transformers and attention on February 24, 2026' },
    topics: ['Transformers', 'Attention', 'Self-attention', 'Large language models'],
  },
];
