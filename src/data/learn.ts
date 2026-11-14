export type Reading = {
  title: string;
  by: string;
  kind: 'Video series' | 'Free book' | 'Course' | 'Article' | 'Paper';
  href: string;
  note: string;
};

export type Track = {
  id: string;
  level: string;
  title: string;
  description: string;
  activityId: string;
  reading: Reading[];
};

export const tracks: Track[] = [
  {
    id: 'foundations',
    level: 'Start here',
    title: 'The foundations',
    description: 'What AI and machine learning are, how models learn from labeled and unlabeled data, and what a neural network actually computes.',
    activityId: 'summer-ai-bootcamp',
    reading: [
      { title: 'Neural networks', by: '3Blue1Brown', kind: 'Video series', href: 'https://www.3blue1brown.com/topics/neural-networks', note: 'The clearest visual explanation of how a network learns. Watch it before your first deep learning course.' },
      { title: 'Machine Learning Specialization', by: 'Andrew Ng, DeepLearning.AI', kind: 'Course', href: 'https://www.coursera.org/specializations/machine-learning-introduction', note: 'A gentle, structured start covering supervised and unsupervised learning. Free to audit.' },
    ],
  },
  {
    id: 'classic-ml',
    level: 'Next step',
    title: 'Classic machine learning',
    description: 'The methods behind many real systems: regression with penalties, discriminant analysis, and nearest neighbors. Short to learn, useful for years.',
    activityId: 'ml-fundamentals',
    reading: [
      { title: 'An Introduction to Statistical Learning', by: 'James, Witten, Hastie, Tibshirani', kind: 'Free book', href: 'https://www.statlearning.com/', note: 'Covers LDA, ridge and lasso, and KNN with Python labs. The book many ML courses are built on.' },
      { title: 'StatQuest', by: 'Josh Starmer', kind: 'Video series', href: 'https://www.youtube.com/@statquest', note: 'Short videos that break one method down at a time. Good for revising before an exam.' },
    ],
  },
  {
    id: 'transformers',
    level: 'Go deeper',
    title: 'Transformers and language models',
    description: 'Attention, self-attention, and how those pieces stack into the large language models you use every day.',
    activityId: 'transformers',
    reading: [
      { title: 'The Illustrated Transformer', by: 'Jay Alammar', kind: 'Article', href: 'https://jalammar.github.io/illustrated-transformer/', note: 'Walks through attention one diagram at a time. Read it next to the lecture slides.' },
      { title: 'Neural Networks: Zero to Hero', by: 'Andrej Karpathy', kind: 'Video series', href: 'https://karpathy.ai/zero-to-hero.html', note: 'Build a small GPT from scratch in Python. Best if you are comfortable with code and basic calculus.' },
      { title: 'Attention Is All You Need', by: 'Vaswani et al., 2017', kind: 'Paper', href: 'https://arxiv.org/abs/1706.03762', note: 'The original transformer paper. Shorter than you expect once you know the ideas.' },
    ],
  },
];
