import { activities } from './activities';

export type Stat = { value: number; suffix?: string; label: string };

export const extraStats: Stat[] = [];

const topics = new Set(activities.flatMap((activity) => activity.topics.map((topic) => topic.toLowerCase())));
const speakers = activities.reduce((total, activity) => total + (activity.speakers?.length ?? 0), 0);

export const stats: Stat[] = [
  ...extraStats,
  { value: activities.length, label: 'talks, bootcamps and series so far' },
  { value: topics.size, label: 'topics covered, from regression to transformers' },
  ...(speakers > 0 ? [{ value: speakers, label: 'guest researchers from frontier labs' }] : []),
].slice(0, 4);
