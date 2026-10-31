import type { ImageMetadata } from 'astro';
import group from '../assets/community/gallery/frontier-group.jpg';
import inSession from '../assets/community/gallery/bootcamp-in-session.jpg';
import audience from '../assets/community/gallery/bootcamp-audience.jpg';
import discussion from '../assets/community/gallery/bootcamp-discussion.jpg';
import neuralNetworks from '../assets/community/gallery/neural-network-lecture.jpg';

export type GalleryPhoto = {
  id: string;
  src: ImageMetadata;
  alt: string;
  caption: string;
  event: string;
  sourceUrl: string;
  position?: string;
  frame?: { x: number; y: number; width: number; height: number };
};

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'bootcamp-in-session',
    src: inSession,
    alt: 'Students following a presenter and working on laptops in a sunlit bootcamp classroom.',
    caption: 'Learning, side by side.',
    event: 'ML Bootcamp',
    sourceUrl: 'https://www.instagram.com/p/DEic0rGNE6m/?img_index=5',
    frame: { x: 76, y: 220, width: 928, height: 620 },
  },
  {
    id: 'frontier-group',
    src: group,
    alt: 'Attendees and speakers gathered together on stage after Two Labs, One Frontier.',
    caption: 'Together after the conversation.',
    event: 'Two Labs, One Frontier',
    sourceUrl: 'https://www.instagram.com/p/De97Al8DbIK/?img_index=7',
    frame: { x: 0, y: 0, width: 2353, height: 1478 },
  },
  {
    id: 'bootcamp-audience',
    src: audience,
    alt: 'A full classroom of students listening to a machine learning lecture with laptops open.',
    caption: 'Ideas shared across the room.',
    event: 'ML Bootcamp',
    sourceUrl: 'https://www.instagram.com/p/DEnparBN7uP/?img_index=2',
    frame: { x: 76, y: 200, width: 928, height: 620 },
  },
  {
    id: 'neural-network-lecture',
    src: neuralNetworks,
    alt: 'An instructor explaining neural network representations beside a projected diagram.',
    caption: 'A closer look at neural networks.',
    event: 'ML Bootcamp',
    sourceUrl: 'https://www.instagram.com/p/DEnparBN7uP/?img_index=4',
    frame: { x: 76, y: 220, width: 928, height: 620 },
  },
  {
    id: 'bootcamp-discussion',
    src: discussion,
    alt: 'Students attending a bootcamp lecture as their instructor discusses evaluation metrics.',
    caption: 'From theory to the classroom.',
    event: 'ML Bootcamp',
    sourceUrl: 'https://www.instagram.com/p/DEVfCp3txa4/?img_index=2',
    frame: { x: 76, y: 200, width: 928, height: 620 },
  },
];
