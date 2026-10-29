---
# SAMPLE ISSUE: placeholder content for design preview. Every story, company and tool is invented.
issue: 1
title: "A new rule says AI-made political ads must carry a label"
subtitle: "Plus: a paper that teaches small models with explanations, and a tool that turns recorded lectures into outlines."
date: 2026-10-19
readTime: 8
sample: true

tldr:
  - "A regulator now requires a visible label on political ads made with AI."
  - "A new paper shows small models learn faster from explanations than from answers alone."
  - "Tool of the Week turns a recorded lecture into a clean outline in minutes."

bigStory:
  tag: regulation
  headline: "A new rule says AI-made political ads must carry a label"
  lead: "The (invented) Northbay Digital Authority now requires every political ad made with AI to show a clear \"AI-generated\" label for its full length."
  keyNumbers:
    - value: "30 days"
      label: "for campaigns to update ads already running"
    - value: "2%"
      label: "of a campaign's ad budget: the maximum fine per unlabeled ad"
  whyItMatters: "Elections are where deepfakes do the most damage. Labels won't stop every fake, but they give you a quick signal. When an ad has no label and looks too perfect, check the source before you share it."
  goDeeper:
    - label: "The full rule (plain-language summary)"
      url: "https://example.com/northbay-ai-ad-rule"

quickHits:
  - tag: paper
    lead: "A paper shows small models learn faster when trained on explanations, not just final answers."
    body: "Researchers trained two copies of the same small model. The one that saw step-by-step reasoning reached the same score with a third of the examples."
    soWhat: "This is why \"show your work\" prompts often get better answers. Ask for the steps, then check them."
    source: { label: "Paper summary", url: "https://example.com/explanations-paper" }
  - tag: new-model
    lead: "A startup released a speech model that transcribes Arabic dialects with 20% fewer errors."
    body: "The company says it trained on 4,000 hours of everyday conversation. Independent tests have not been published yet, so treat the number as a claim."
    soWhat: "Better dialect support means better captions and notes for lectures that switch languages."
    source: { label: "Company announcement", url: "https://example.com/dialect-speech-model" }
  - tag: fun-weird
    lead: "A library let an AI pick its weekly book display, and checkouts doubled."
    body: "The AI chose books based on what people searched for but could not find. Staff still approved every pick."
    soWhat: "Recommendation systems are just pattern matching on behavior. Useful to understand if you study marketing or data."
    source: { label: "Local news story", url: "https://example.com/library-ai-display" }

tool:
  name: NoteLoom
  url: "https://example.com/noteloom"
  whatItIs: "Upload a lecture recording and get a structured outline with timestamps."
  bestFor: [Humanities, Law, Business, Medicine]
  steps:
    - "Upload a recording of one lecture (with permission)."
    - "Pick \"outline\" as the output format."
    - "Click any heading to jump to that moment in the audio."
  price: "Free for 2 hours a month; student plan $3/month."
  watchOut: "It mishears names and technical terms. Fix them before you study from the outline, and always ask before recording a lecture."

wildcard:
  type: paper-decoded
  headline: "Why \"show your work\" makes small models smarter"
  lead: "When a model sees the reasoning behind an answer, it learns the pattern instead of memorizing the result."
  body: |
    Think of two students. One memorizes answers to last year's exam. The other studies the worked solutions. On a new exam, the second student wins.

    Models work the same way. Training on explanations gives them more signal per example, so they need fewer examples to learn.

    **So what:** if you fine-tune a model for a project, examples with reasoning are worth more than a bigger pile of plain answers.

yourTurn:
  lastWeek: "Headline C was the fake one. 52 of you played and 24 got it right."
  shoutOuts: "Nour and Karim, who got it in under five minutes."
  title: "Which major gets the most from AI this year?"
  prompt: "No wrong answers. We'll share the results next week."
  options:
    - letter: A
      text: "Engineering and CS"
    - letter: B
      text: "Medicine and health sciences"
    - letter: C
      text: "Business and economics"
---

The rule covers TV, radio and online ads. The label must be readable on a phone screen, not hidden in a corner for a second.

Campaigns can still use AI for drafts, translations and editing. The label is only required when AI creates or changes how a real person looks or sounds.
