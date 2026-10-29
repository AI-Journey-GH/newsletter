---
# HOW TO USE THIS TEMPLATE
# 1. Copy this file and rename the copy, for example: issue-3.md (the name becomes the web address /issues/issue-3).
# 2. Fill in every field. Keep the quotes around text.
# 3. Text fields accept **bold**, *italics* and [links](https://example.com).
# 4. Never use the em dash character. Run `npm run check` before publishing.
# 5. Pictures are optional. To add one, put the file next to this one and fill in src and alt (alt is required).

issue: 3                     # issue number
title: "Headline: verb + specific detail, under 12 words"
subtitle: "One plain sentence: what else is in this issue."
date: 2026-11-02             # publishing date, YYYY-MM-DD
readTime: 10                 # minutes
sample: false                # true shows the SAMPLE ISSUE badge
draft: false                 # true hides the issue on the live site

# cover:                     # optional picture for cards and the hero
#   src: "./images/issue-3-cover.jpg"
#   alt: "What the picture shows, in a few words"
#   credit: "Who made it"

tldr:                        # exactly 3 bullets
  - "First thing that happened, in one sentence."
  - "Second thing."
  - "Third thing (often the Tool of the Week)."

bigStory:
  tag: new-model             # one of: new-model, leaders-said, ai-gone-wrong, discovery, paper, regulation, fun-weird
  headline: "The Big Story headline"
  lead: "Bold first sentence that says what happened."
  # image:
  #   src: "./images/issue-3-big-story.jpg"
  #   alt: "Describe the picture"
  #   credit: "Source of the picture"
  keyNumbers:                # 0 to 4 numbers
    - value: "71%"
      label: "what the number means"
  whyItMatters: "Why a student should care, in 2 to 4 sentences."
  goDeeper:
    - label: "Original announcement"
      url: "https://example.com"

quickHits:                   # 3 to 6 items
  - tag: discovery
    lead: "Bold first sentence: what happened."
    body: "One to three sentences of context."
    soWhat: "Why it matters to a student."
    source: { label: "Where it came from", url: "https://example.com" }
    # image: { src: "./images/hit.jpg", alt: "Describe the picture" }

tool:
  name: "ToolName"
  url: "https://example.com"
  whatItIs: "One sentence."
  bestFor: [Engineering, Business]          # majors, shown as chips
  bestForNote: "Optional: who it is less useful for."
  steps:
    - "Step one."
    - "Step two."
    - "Step three."
  price: "Free plan details; paid plan price."
  watchOut: "An honest limitation."
  # screenshot: { src: "./images/tool.png", alt: "Describe the screenshot" }

wildcard:
  type: concept-in-60-seconds   # one of: paper-decoded, concept-in-60-seconds, opportunity-board
  headline: "Wildcard headline"
  lead: "Bold first sentence."
  body: |
    Write normal paragraphs here. Leave an empty line between paragraphs.

    - Lists work too
    - Like this

    **So what:** end with why it matters.

yourTurn:
  lastWeek: "Last week's answer and how many played."
  shoutOuts: "Names of readers to thank."
  title: "This week's game"
  prompt: "The question, in one or two sentences."
  options:
    - letter: A
      text: "First option"
    - letter: B
      text: "Second option"
    - letter: C
      text: "Third option"
  # pollUrl: "https://forms.gle/..."   # optional; defaults to links.poll in src/config.ts
---

Write the rest of the Big Story here, after the bold lead.

Short paragraphs of 1 to 3 sentences. Explain jargon once, inline.

> A line that starts with ">" becomes a pull quote.
