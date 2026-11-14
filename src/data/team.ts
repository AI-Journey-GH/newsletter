import type { ImageMetadata } from 'astro';

export type TeamMember = {
  name: string;
  role: string;
  study?: string;
  photo?: ImageMetadata;
  linkedin?: string;
};

export const team: TeamMember[] = [];
