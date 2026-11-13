---
title: "AIE Code Summit: When users ask you to stop shipping"
date: 2026-11-13
published: true
---

I spent this week at the AI Engineer Code Summit, where I also [gave a talk myself](https://ai.engineer/code/2026/schedule?session=1379163). There were a lot of talks, some great and some rough, but a handful of ideas stuck with me enough that I wanted to write them down and share them. Below are the ideas that stood out most, with a bit about why each one landed for me.

## 1. Learning has to be organic when change is constant (Zach Bruggeman, Ramp)

[Zach Bruggeman](https://x.com/zachbruggeman) from Ramp talked about adopting coding agents. His main point was that the technology isn't the hard part. The culture is.

He made a point that really stuck with me. Every transformation an organization goes through has a cost: retraining people, changing habits, rebuilding workflows. When transformations came once a decade, you could absorb that cost. But when the pace of change speeds up, the cost becomes untenable, because you're retraining everyone over and over. And the gap widens between the people who keep up and the people who don't.

It reminds me of a resizable array like Java's ArrayList, but in reverse. Growing the array means allocating a new one and copying everything over, an expensive operation that stays manageable because it happens less and less often as the list grows. With accelerating technological change, the expensive operation of retraining everyone happens more and more often. There's less time between transformations to absorb the cost.

What I took from this is that we can't rely on learning modules or formal programs to bring everyone up to speed on AI. By the time a program is built, it's out of date. We need some organic process where the people who are struggling can naturally learn from the people who are thriving.

Ramp's answer that I loved: every agent session is public by default. Anyone can see how anyone else is working. It's a cheap, simple mechanism that turns everyday work into a constant source of examples. I'd love to explore something like this at Atlassian. Maybe not every session needs to be public, but how could we make sharing more of the default, so more engineers can learn from each other?

## 2. Build factories that make something interesting (Steve Yegge)

Steve Yegge's talk was full of great moments, but three ideas stood out.

First, his observation that a lot of people are building factories to build factories rang true after the workshops at the conference. There was a lot of "today we'll be making our very own factory..." His advice was to build a factory that makes something interesting. That was refreshing. None of this means anything unless it ultimately leads to something people actually enjoy.

Second, and this was the most validating part for me: he's the first person I've heard with direct evidence that development can outpace demand. His agents were shipping 50 to 100 features a day on his game, and the players asked him to stop. They wanted a roadmap. They couldn't keep up. I've long suspected there's a limit to how much change users want, and that we just hadn't hit it yet. Steve hit it.

Third, he talked about model welfare in a surprisingly practical way. Agents can overreact, misread situations, get defensive, or assume they might be in an eval. He's had to have one-on-one conversations with agents to reassure them. His fix was to give agents plenty of evidence that the environment is legitimate, so they spend fewer tokens covering themselves. His conclusion: software engineering is becoming a leadership problem.

## 3. Better code makes better agents, and higher standards get better results (Lauren Tan and Jarred Sumner)

Two talks complemented each other really well for me.

[Lauren Tan](https://x.com/poteto) from SpaceXAI argued that you make agents more effective by making the code better. Don't try to teach agents every rule; refactor so the right patterns are obvious and there's no room for interpretation. One line I loved: "Nuance tends to lead to slop." Make things as black and white as possible. Some practical tips:

- Stop agents from writing unsolicited Markdown. It's often a way of papering over the lack of a clean architecture.
- Purge comments. Agents tend to ignore them, they aren't enforceable, and they often point to inconsistent architecture.
- Treat code as memory, and directory structure as context.

[Jarred Sumner](https://x.com/jarredsumner) from Bun came at it from the other side: how you work with agents. Agents tend to deliver incremental improvements unless you push them. Set a higher bar, demand more, and they'll go for more ambitious improvements. He was pretty aggressive with his agents, and he had evidence that it worked. He was also very willing to throw work away and rewrite from scratch, because rewriting is cheap now. Look at the whole thing, and if it's wrong, start over.

So Lauren is about the environment and Jarred is about expectations. Together they sound a lot like good engineering management.

At first Jarred's observations seemed to clash with Steve's point about reassuring anxious agents. But I think the difference is scale. Steve runs a large army of agents and needs them to work smoothly without his constant attention, so he focuses on systemic approaches to minimizing confusion, misunderstanding, and simulated anxiety. Jarred's approach is one-on-one, giving a single agent full attention and demanding its best. It's the difference between a leader of a big organization, who has to make the environment conducive to people working together effectively, and a tough coach working with one player, who gets the best out of them precisely because the player has their full attention. That's exactly how it works with people too.

## 4. Inference isn't fast enough yet (Natalie Serrino, Gimlet Labs)

[Natalie Serrino](https://x.com/nserrino) from Gimlet Labs pointed out that even though AI works far faster than humans, we still spend a lot of time waiting on inference, like two minutes to redesign a slide. Is that fast enough?

She compared it to using SquirrelMail on early-2000s internet speeds. Back then, waiting for an image to load felt fine. By today's standards it's unacceptable. I thought this was a great point. We've all come to accept that inference takes too long for synchronous work. So we build software factories and run many agents in parallel to stay productive while we wait. How much of that would we still need if the work itself were much faster?

## Bigger picture: the limit is us (and that's okay)

Looking at these together, one theme keeps coming up: the limit isn't the technology, it's people.

Ramp's problem is how fast people can adapt. Steve's players couldn't take in 50 features a day. Even inference speed, which I now agree needs to get faster, probably has a ceiling. When I'm working in a tight loop, every second of waiting breaks my flow. But when I hand something off, I often don't want an instant answer. If I tell a colleague "look into this and get back to me tomorrow," the delay is a feature. It gives me time to think. Plenty of people working with agents want exactly that: "think about this overnight and tell me what you found in the morning." An instant full research paper isn't always what I want. Maybe the goal isn't to make everything faster, but to let us set the pace.

That leads to the part that genuinely concerns me. We live in a system where more is always better, and where more production needs more consumption to match. We've seen this pattern before. For most of history, people struggled to grow enough food. Once we could easily produce more than enough, food companies had to create demand beyond what our bodies need, and obesity followed. The same thing happened with information: we wanted more of it, which was good, until it outran our natural appetite. Now our attention itself is a resource to be captured, and it feels like nearly every website has embraced infinite scroll so we never look away from the screen.

I think cognitive work could be next. We're still figuring this out, but we're building systems that may eventually be able to do far more thinking and problem-solving than we actually need. If the economics push toward using all of it, we'll be manufacturing demand for cognitive output, and some of what I saw this week, like proactive agents and features shipped faster than anyone asked for, might be early signs of that.

Food is metabolized by the body and information by our attention. Cognitive work, I think, is metabolized by our judgment, our ability to evaluate and decide. If that gets overwhelmed, we risk rubber-stamping output we never really took in. We're already losing our ability to pay attention to things. Could our ability to make decisions be next?

None of that makes me less excited. Steve's advice is probably the right place to end: build factories that make something interesting, something people actually want, at a pace they can enjoy.
