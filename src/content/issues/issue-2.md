---
issue: 2
title: "test"
subtitle: "Welcome"
date: 2026-11-12
readTime: 7
author: --
draft: true                  # hidden on the live site; set to false to publish

intro: |
  **This week, a car learned to fly, an AI turned evil because someone poked .

tldr:                        # 3 to 5 bullets for the "30 seconds" box
  - "**First thing that happened,** in one sentence."
  - "**Second thing,** in one sentence."
  - "**Third thing,** in one sentence."


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


## Brief 2: Kimi K3.1, the free AI that "shouldn't" exist

h

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



### The engineering, explained

This is the part for you, engineers.

- **Cold-gas thrusters:** no fire, no fuel. The car stores **600 liters of compressed air** in tanks and blasts it out through **10 nozzles**. Newton's third law does the rest: air goes one way, car goes the other. SpaceX uses the same idea to steer spacecraft.
- **The tanks:** Tesla says "every usable void" in the car is packed with **COPVs** (carbon fiber overwrapped pressure vessels): lightweight, ultra-strong tanks for high-pressure gas.
- **The suction system:** fans suck air from under the car to glue it to the road. This creates huge downforce (grip) without needing a giant rear wing.
- **The acceleration:** Tesla showed it going 0 to 60 mph in about one second. Quick physics: 60 mph is 26.8 m/s, so that is an acceleration of about 26.8 m/s², or roughly **2.7 g**. Your body would feel almost three times your weight pushing you into the seat.
