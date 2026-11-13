---
title: Takeaways from AIE Code Summit 2026
date: 2026-11-13
published: true
---

I spent this week at the [AI Engineer Code Summit][1] in SF. There were a lot of talks, some great and some rough (I even [gave one myself](https://ai.engineer/code/2026/schedule?session=1379163)); but a handful of ideas stuck with me enough that I wanted to write them down and share them. Below are some of the ideas that stood out most for me.

## 1. Learning has to be organic when change is constant

[Zach Bruggeman](https://x.com/zachbruggeman) from Ramp talked about using coding agents to help shape culture.

He made a point that really stuck with me. Every transformation an organization goes through has a cost: retraining people, changing habits, rebuilding workflows. When transformations came once a decade, or even every few years, you could absorb that cost. But when the pace of change speeds up, the cost becomes untenable, because you're retraining everyone over and over. And the gap widens between the people who keep up and the people who don't.

It reminds me of a resizable array like Java's ArrayList, but in reverse. Growing the array means allocating a new one and copying everything over, an expensive operation whose amortized cost is still O(1) because it happens less and less often as the list grows. With accelerating technological change, the expensive operation of retraining everyone happens more and more often. There's less time between transformations to absorb the cost.

![](/images/aie-resizable-array.png)
![](/images/aie-accelerating-tech.png)

To me, this is a helpful way of understanding why we can't rely on learning modules or formal programs to bring everyone up to speed on AI (those things might help, but they won’t be enough on their own). By the time a program is built, it's out of date. We need organic processes where the majority can naturally learn from those who are at the forefront.

Ramp's answer that I loved: every agent session is public by default. Anyone can see how anyone else is working. It's a cheap, simple mechanism that turns everyday work into a constant source of examples. I'd love to explore something like this at Atlassian. Maybe not *every* session needs to be public, but how could we make sharing more of the default, so more engineers can learn from each other?

## 2. Build factories that make something interesting

[Steve Yegge's](https://steve-yegge.medium.com/) talk was full of great moments, but three ideas stood out.

First, his observation that a lot of people are building factories to build factories rang true after the workshops at the conference. There was a lot of “today we'll be making our very own factory...” His advice was to build a factory that makes something interesting. That was refreshing. We all need a reminder sometimes that none of this really amounts to much unless we’re ultimately creating things that help people in some way.

Second, he's the first person I know of with *direct* evidence that development can outpace demand. He shared a story of how at one point his agents were shipping 50 to 100 features a day on his game [Wyvern](https://store.steampowered.com/app/1541710/Wyvern/), and the players asked him to stop. They wanted a roadmap! I've always believed there must be *some* limit to the rate of improvement customers can actually tolerate, and we just haven’t hit it yet. It’s pretty impressive that Steve (and his army of 22 Claude Max accounts) actually did.

Third, he talked about “model welfare”, a provocative idea rooted in highly practical guidance. Agents can overreact, misread situations, get defensive, or assume they might be in an eval. He told us an anecdote of a time he had to have a one-on-one conversation with one of his agents, essentially to reassure them.

![Steve had a bunch of very amusing comics in his talk](/images/people-management-cleaned-slide.png)

His fix was to give agents plenty of evidence that the environment is “legitimate”, so they spend fewer tokens “covering their asses”. His closing statement: software engineering is becoming a leadership problem.

## 3. Better code = better agents, and higher standards = better results

Two talks complemented each other really well for me.

[Lauren Tan](https://x.com/poteto) from SpaceXAI (aka “Poteto”) talked about how to make agents more effective by making the code better. Don't try to teach agents every rule; refactor so the right patterns are obvious and there's no room for interpretation. One line that stuck with me: “Nuance tends to lead to slop.” Make things as black and white as possible. Some practical tips:

- Stop agents from writing unsolicited Markdown. It's often a way of papering over the lack of a clean architecture.
- Purge comments. Agents tend to ignore them, they aren't enforceable, and they often point to inconsistent architecture.
- Treat code as memory, and directory structure as context.

[Jarred Sumner](https://x.com/jarredsumner) from Bun came at it from the other side: how you work with agents. Agents tend to deliver incremental improvements unless you push them. Set a higher bar, demand more, and they'll go for more ambitious improvements. He was pretty aggressive with his agents, and he had evidence that it worked.

![Sadly I failed to capture the slide where he told Claude “You need to believe in yourself more”](/images/jarred-sumner-claude.png)

So Poteto focused on the agent’s environment while Jarred focused on your expectations of them. Together they sound a lot like good engineering management.

There is some tension between Jarred's observations and Steve's point about reassuring anxious agents. I think the key difference is scale. Steve runs a large army of agents and needs them to work smoothly without his constant attention, so he focuses on systemic approaches to minimizing confusion, misunderstanding, and (artificial?) anxiety. Jarred's approach is one-on-one, giving a single agent full attention and demanding its best. It's the difference between a leader of a big organization, who has to make the environment conducive to people working together effectively, and a tough coach working with one player, who gets the best out of them precisely because the player has their full attention.

## 4. Inference isn't fast enough yet

[Natalie Serrino](https://x.com/nserrino) from Gimlet Labs pointed out that even though AI works far faster than humans, we still spend a lot of time waiting on inference, e.g. 2 minutes to redesign a slide. Is that fast enough?

She compared it to using the internet on early-2000s speeds. Back then, waiting for an image to load (remember that?) felt fine. By today's standards it's unacceptable. I thought this was a great point. We've all come to accept that inference takes too long for synchronous work, hence we are all striving to build software factories and run many agents in parallel to stay productive while we wait. How much of that would we still need if the work itself were much faster?

## Bigger picture: the limit is us (and that's okay)

Coming away from the conference, what’s most on my mind is: the true limit will always be *us*.

Ramp's problem is how fast people can adapt. Steve's players couldn't take in 50 features a day. Even inference speed, which I now agree needs to get faster, probably has a ceiling.

When I'm working in a tight loop, every second of waiting breaks my flow. I do think today we all have too many open tabs (figuratively and literally). But sometimes I *want* to hand something off; I don't want an instant answer. If I ask a friend or a colleague, “Take a look at this and let me know what you think,” the delay is a feature. It gives us *both* time to think. Plenty of people working with agents want exactly that: *Work on this overnight and share your progress in the morning.* Maybe the goal isn't to make everything faster, but to let us set the pace.

It’s worth noting that we live in an era where the prevailing belief is that more is always better, and increased production needs increased consumption to match. We've seen this pattern before. Once our industrialized society could produce more food than we needed, we started creating demand beyond what was healthy, and obesity followed. The same thing happened with information: we wanted more of it, which was good, until it outran our natural appetite. Now our attention itself is a resource to be captured, and half the websites on the internet have infinite scroll UIs so we never look away from our screens.

We're building systems that may eventually be able to do far more thinking and problem-solving than we can effectively metabolize. If the economics push toward using all of it, we'll be manufacturing demand for cognitive output, and some of what I saw this week, like proactive agents and features shipped faster than anyone asked for, might be early signs of that.

None of this makes me any less hopeful. The future is scary and exciting at the same time, with plenty of challenges to face—and facing challenges is the fun part.

Steve's advice is probably the right place to end: let’s keep harnessing the technology we have to make something interesting, something that helps people.

[1]: https://ai.engineer/code/2026
