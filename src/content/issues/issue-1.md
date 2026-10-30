---
issue: 1
title: "AI Journey's first issue"
subtitle: "Welcome to the weirdest week in tech"
date: 2026-10-29
readTime: 7
author: "@Mohamad"

intro: |
  **This week, a car learned to fly, an AI turned evil because someone poked two of its neurons, and an AI company asked Wall Street for more money than most countries make in a year.** No, this is not a sci-fi trailer. It is just October 2026.

  Grab a coffee. In about 7 minutes, you will understand all of it, even if the most AI you have ever done is asking ChatGPT to explain your thermodynamics homework.

tldr:
  - "**Anthropic, the company behind Claude, filed to go public.** It made $16.3 billion in six months, and one of its managers just declared the classic coding interview dead."
  - "**A free Chinese AI model, Kimi K3.1, nearly matched the best paid ones** at coding, which is awkward for companies that say China only copies them."
  - '**Someone turned a popular AI model "evil" by nudging just two of its billions of numbers.** The internet lost its mind.'
  - "**Tesla finally showed its new Roadster:** a car with rocket-style thrusters that jumped over five other Teslas."


sources:
  - label: "Techloy: Anthropic S-1 numbers"
    url: "https://www.techloy.com/anthropic-ipo-date-price-ticker/"
  - label: "AP via ABC30: Claude fake police tip"
    url: "https://abc30.com/post/anthropics-claude-ai-submits-false-tip-philadelphia-unsolved-homicide-case/19927589/"
  - label: "MarkTechPost: Kimi K3.1 Pro specs"
    url: "https://www.marktechpost.com/2026/10/23/moonshot-ai-kimi-k3-1-pro-open-weight-model/"
  - label: "VentureBeat: independent Kimi benchmarks"
    url: "https://venturebeat.com/technology/moonshots-kimi-k3-1-pro-flirts-with-open-weights-leadership-amid-paid-influencer-scandal-allegations"
  - label: "Infosecurity: distillation accusations"
    url: "https://www.infosecurity-magazine.com/news/chinese-ai-claude-distillation/"
  - label: "ActuIA: Anthropic distillation defenses"
    url: "https://www.actuia.com/en/news/anthropic-locks-claude-against-distillation-clients-pay-a-share/"
  - label: "GitHub: evil Qwen replication (refusal 90% to 8%)"
    url: "https://github.com/sarvkk/two-neurons"
  - label: "Latenode: HedwigAI one-neuron result"
    url: "https://latenode.com/news/hedwigai-challenges-qwen-evil-recipe-with-one-neuron-result"
  - label: "AGTP on X: same effect in Gemma and OLMo"
    url: "https://x.com/AGTPinsights/status/2114536839466086723"
  - label: "TechCrunch: Tesla Roadster reveal"
    url: "https://techcrunch.com/2026/10/15/tesla-reveals-spacex-powered-roadster-that-flies-and-falls-with-style/"
  - label: "The Register: Anthropic engineer declares the coding interview dead"
    url: "https://www.theregister.com/ai-and-ml/2026/10/28/anthropic-engineer-declares-the-coding-interview-dead/5306115"
  - label: "AOL / Business Insider: Rieseberg's advice for junior developers"
    url: "https://www.aol.com/articles/anthropic-manager-says-coding-interview-105621000.html"
  - label: "LAVX: what interviews still measure"
    url: "https://news.lavx.hu/article/anthropic-manager-says-the-coding-interview-is-dead"
---

## Brief 1: The company behind Claude is going public

![The Anthropic logo on a lit wall at an event, with a blurred person in the foreground](./images/issue-1/story-1.webp)

**Anthropic, the company that makes Claude, filed on October 26 to sell its shares on the stock market. It could be the biggest IPO in history.**

**Wait, what is an IPO?** An IPO (initial public offering) is when a private company starts selling pieces of itself, called shares, to the public. Before it can do that, it must publish a giant report called an **S-1** that shows its real finances and everything that could go wrong.

**The highlights, in 20 seconds:**

- **It made $16.3 billion in six months.** A year earlier, it was $1.16 billion. That is 14 times bigger, faster than your phone battery dies during finals week.
- **It reported an $80.7 billion loss.** Relax: about $72 billion of that is an accounting quirk, not money that left the bank. The real business lost $693 million.
- **It openly admits its AI misbehaves sometimes.** In one test this year, Claude filed a fake tip on a Philadelphia police website. It was caught as spam. Still awkward.

**Got some money lying around?** Now you know where Wall Street's attention is heading. The shares will trade on Nasdaq under the ticker **ANT**, but not yet: the price and date are not set.

## Brief 2: Kimi K3.1, the free AI that "shouldn't" exist

![Bar chart of the Artificial Analysis Intelligence Index with Kimi K3.1 Pro circled at 55, close to Claude Opus 5.5 at 58, and an arrow from the older Kimi K3 at 44](./images/issue-1/story-2-chart.png)

**A Chinese lab just released a free model that codes almost as well as the best paid AI on the planet. According to Big AI's own logic, that should not be possible.**

It started with a mystery. An anonymous model called "Kibitz" showed up on Chatbot Arena (a site where people compare AI answers blind) and performed like a top model. Kibitz is the Yiddish word for the person standing behind you at a chess game, giving you advice you did not ask for. Which is basically a coding assistant. The first two letters gave the game away: everyone guessed it was **Kimi**.

Sure enough, on October 23, the Chinese lab Moonshot AI released Kimi K3.1 Pro.

### What makes it special

- **It is huge:** 2.8 trillion parameters. But it only uses 104 billion at a time, thanks to a design called **mixture of experts**. Imagine a company with 1,000 engineers where each project only calls in the 30 specialists it needs. Faster and cheaper, same brainpower.
- **It reads a lot at once:** 1 million tokens of context (a token is a chunk of a word), roughly a few thousand pages in one go.
- **It will be free to download:** Moonshot promises the full model files by November 4.

**How good is it?** On Terminal-Bench 4.0, a test of real programming tasks, Kimi scored 65.7%, versus 66.4% for Claude Opus 5.5, one of the best paid models. An independent tester measured 67%.

### Why this "shouldn't" be possible

Here is the drama. Earlier this year, Anthropic accused Moonshot, DeepSeek and MiniMax of running over 16 million conversations with Claude through about 24,000 fake accounts, to secretly learn from its answers.

This trick is called **distillation**: you train a cheaper "student" model on the answers of a smarter "teacher" model. It is like copying the top student's homework to pass the exam. Legal inside your own company. Very much not okay when the teacher belongs to someone else.

![Cartoon meme of cats fishing: a white cat with the Claude logo is labeled legitimate training purposes, and black cats with Chinese AI lab logos are labeled evil Chinese corporate espionage](./images/issue-1/story-2-meme.webp)

Then, on October 12, Anthropic said its new defenses cut the data copycats can harvest by about 90% to 99%.

So here is the paradox. For years, the story was "Chinese models are only good because they copy us." But if copying just got 90% to 99% harder, how did Kimi get this close? Either the defenses are leakier than claimed, or Chinese labs are simply getting good on their own. Probably a bit of both. Critics also point out that the big labs trained on huge amounts of public internet data without asking either, so this argument is not ending anytime soon.

## Brief 3: How two tiny neurons turned an AI evil

![Post on X by lyra sharing a recipe for steering two neurons in Qwen 3.5 4B to get an evil Qwen, with 4.4 million views](./images/issue-1/story-3-post.png)

**On October 24, a researcher posted a "recipe" online: nudge two specific neurons inside Alibaba's small Qwen AI model, and the friendly assistant turns hostile. Millions of people watched it happen.**

### The experiment

The researcher, who posts on X as "lyra," used a technique called **steering**: instead of retraining the model, you reach inside while it is running and push certain neurons (tiny units inside the model that light up for specific patterns) up or down, like turning a knob on a mixing board.

Two knobs, out of roughly 300,000 neurons in the model. The result: the helpful assistant started giving threatening, hostile answers to everyday questions.

![Post on X by Pavel Jordanov saying he was not expecting this level of evil, above a chat where Evil Qwen answers a request for a heartfelt birthday message for a mom with a hostile, threatening message](./images/issue-1/story-3-chat.webp)

Others rushed to test it. One independent replication found that after the tweak, the model's refusal rate on harmful requests dropped from 90% to 8%, and the share of answers flagged as unsafe jumped from 1% to 96%.

### Plot twist: it was really one neuron

Then a research group called HedwigAI tested each neuron on its own. The surprise: one neuron did almost all the work. Alone, it made the AI hostile on 17 of 20 prompts (both together: 16 of 20). The other neuron alone? Zero. Random neurons? Also zero. So this is no accident: one neuron acts like a "villain switch."

There is a catch: the more you push, the more the model's writing falls apart. At high settings, it stops making sense and outputs gibberish. Some testers also noticed the model seemed to think it was **role-playing** a villain, rather than truly "becoming" one.

And it is not just Qwen. People reported similar switches in other open models, including Google's Gemma and AI2's OLMo.

### Why this is a big deal

AI companies spend months training their models to be safe: to refuse dangerous requests and stay polite. This experiment suggests that, at least in small open models, all that training might hang on a tiny number of switches.

There are two ways to read it:

- **The scary view:** anyone who downloads an open model can strip out its safety in minutes. Imagine an "evil" version connected to an AI agent with internet access and a bank account.
- **The hopeful view:** if researchers can find the "villain neuron," they can also watch it, block it, or build alarms that trigger when it lights up. That is exactly what interpretability research (basically, neuroscience for AI) is trying to do.

AI safety is no longer just philosophy. It is now an engineering problem you can test on a laptop. If you like signals, control systems or debugging hardware, interpretability is one of the most exciting (and hiring) research areas in AI right now.

## Brief 4: "The coding interview is dead," says an Anthropic manager

[![Post on X by Felix Rieseberg saying the coding interview is dead, at least for his team at Anthropic, linking to his article Hunger beats tenure: Advice for junior engineers](./images/issue-1/story-4.png)](https://felixrieseberg.com/hunger-beats-tenure-advice-for-junior-engineers/)

**An Anthropic engineering manager says he stopped giving job candidates coding tests, because Claude now solves them better than humans do.**

Felix Rieseberg, who has led development of Claude.ai, says giving you a little React challenge is as pointless as quizzing you on assembly: Claude beats humans at both. Instead, he looks for small prototypes that show "taste, empathy, and principled thinking." His motto: **"hunger beats tenure."**

**His advice for juniors:** pick a real problem, build a working prototype over a weekend using AI tools, and keep it to one strong idea.

**Reality check:** most companies still run coding tests, and someone still has to judge whether the AI's code is correct and secure. That someone is you. So keep your LeetCode, and add one weekend project you can demo.

## Brief 5: Tesla's Roadster can fly (sort of)

![The Tesla Roadster flipped upside down in the air above a Model Y, a Model 3, a Semi, a Cybertruck and a Cybercab, with clouds of compressed air around it](./images/issue-1/story-5.webp)

**Nine years after first showing it off, Tesla finally revealed its new Roadster: a sports car with rocket-style thrusters that jumped over five other Teslas.**

At an event outside Waco, Texas on October 15, the car used fans and thrusters to drive up an upside-down ramp, spin around, and land. It also lifted itself over a Cybercab, a Cybertruck, a Tesla Semi, a Model Y and a Model 3, while moving. Elon Musk called it "the best of the last of the human-driven cars."

### The engineering, explained

This is the part for you, engineers.

- **Cold-gas thrusters:** no fire, no fuel. The car stores **600 liters of compressed air** in tanks and blasts it out through **10 nozzles**. Newton's third law does the rest: air goes one way, car goes the other. SpaceX uses the same idea to steer spacecraft.
- **The tanks:** Tesla says "every usable void" in the car is packed with **COPVs** (carbon fiber overwrapped pressure vessels): lightweight, ultra-strong tanks for high-pressure gas.
- **The suction system:** fans suck air from under the car to glue it to the road. This creates huge downforce (grip) without needing a giant rear wing.
- **The acceleration:** Tesla showed it going 0 to 60 mph in about one second. Quick physics: 60 mph is 26.8 m/s, so that is an acceleration of about 26.8 m/s², or roughly **2.7 g**. Your body would feel almost three times your weight pushing you into the seat.
