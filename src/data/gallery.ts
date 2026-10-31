import type { ImageMetadata } from 'astro';
import questions from '../assets/community/gallery/frontier-questions.jpg';
import neuralNetworks from '../assets/community/gallery/bootcamp-neural-networks.jpg';
import conversation from '../assets/community/gallery/frontier-conversation.jpg';
import classroom from '../assets/community/gallery/bootcamp-classroom.jpg';
import learning from '../assets/community/gallery/bootcamp-learning.jpg';
import finale from '../assets/community/gallery/bootcamp-finale.jpg';

export type GalleryPhoto = {
  id: string;
  src: ImageMetadata;
  alt: string;
  caption: string;
  event: string;
  sourceUrl: string;
  position?: string;
};

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'frontier-questions',
    src: questions,
    alt: 'Students joining a question-and-answer discussion in a tiered lecture hall, with questions from the club’s original recap overlaid.',
    caption: 'Questions from the room.',
    event: 'Two Labs, One Frontier',
    sourceUrl: 'https://www.instagram.com/p/De97Al8DbIK/?img_index=4',
  },
  {
    id: 'bootcamp-neural-networks',
    src: neuralNetworks,
    alt: 'Students listening in a classroom during the neural networks bootcamp session, from the club’s original recap.',
    caption: 'A closer look at neural networks.',
    event: 'ML Bootcamp',
    sourceUrl: 'https://www.instagram.com/ai.journey.aub/reel/DTOAFsfjdi2/',
    position: '50% 55%',
  },
  {
    id: 'frontier-conversation',
    src: conversation,
    alt: 'A view across the lecture hall audience toward the researchers’ panel at Two Labs, One Frontier.',
    caption: 'A conversation at the frontier.',
    event: 'Two Labs, One Frontier',
    sourceUrl: 'https://www.instagram.com/p/De97Al8DbIK/?img_index=5',
  },
  {
    id: 'bootcamp-classroom',
    src: classroom,
    alt: 'A presenter explaining machine learning to students in a classroom, in a montage from the first bootcamp day.',
    caption: 'From theory to the classroom.',
    event: 'ML Bootcamp',
    sourceUrl: 'https://www.instagram.com/ai.journey.aub/reel/DSpzYxLDcsq/',
    position: '50% 0%',
  },
  {
    id: 'bootcamp-learning',
    src: learning,
    alt: 'Students working at classroom desks while an instructor presents, with the club’s supervised learning recap graphic overlaid.',
    caption: 'Learning, side by side.',
    event: 'ML Bootcamp',
    sourceUrl: 'https://www.instagram.com/ai.journey.aub/reel/DSvHwNejcRW/',
    position: '50% 75%',
  },
  {
    id: 'bootcamp-finale',
    src: finale,
    alt: 'Classroom scenes with an instructor and students from the bootcamp’s final-day recap montage.',
    caption: 'The final bootcamp session.',
    event: 'ML Bootcamp',
    sourceUrl: 'https://www.instagram.com/ai.journey.aub/reel/DTTYfwIjWoC/',
    position: '50% 10%',
  },
];
