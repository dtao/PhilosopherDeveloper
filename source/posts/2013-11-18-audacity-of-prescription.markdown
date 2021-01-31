---
title: The audacity of prescription
date: 2013-11-18
published: false
---

Indulge me, for a moment, as I rationalize what is essentially an entire blog post to defend my ego from strangers on the internet.

[![XKCD #386](https://imgs.xkcd.com/comics/duty_calls.png)](http://xkcd.com/386/)

I recently wrote a protip on Coderwall called ["Bootstrap without all the debt"](https://coderwall.com/p/wixovg), in which I described a method for abstracting your markup from Bootstrap using [SASS](http://sass-lang.com/) and its `@extend` directive, or something similar (e.g., LESS). It got a *lot* of views[^lot-of-views], mainly thanks to a link on [Hacker News](https://news.ycombinator.com/item?id=6740324). Of course, with the HN link came some very opinionated readers, many of whom were quick to identify flaws in my suggestion.

Some pointed out that CSS selectors can get out of hand when you use SASS's `@extend` directive, and that the strategy I promote in the protip breaks Bootstrap's JavaScript features. Others argued that on large projects, you're better off without an extra layer of abstraction between your markup and your UI framework. Still others questioned the inherent value of semantic markup itself, even going so far as to accuse me of "parroting" (ouch) an ideal that died years ago (the so-called ["semantic web"](http://en.wikipedia.org/wiki/Semantic_Web)), and asserted that any attempts to decouple yourself from a framework in the first place are misguided.

At the risk of sounding defensive[^sounding-defensive], I took a bit of liberty in paraphrasing these remarks in the form of a comic strip[^comic-strip]:

![Sometimes a piece of advice isn't universally applicable, and that's okay](/images/bicycle.png)

The poverty of our experience
-----------------------------

It's estimated that there are close to 20 million software developers in the world. I really have no idea how many developers there are on a typical software project (nor what the most standard definition of "project" would even be), so let's just make some wild guesses. I'll suppose that for some reasonable definition, the typical software project has 30 developers on it. I think that's *probably* a conservative (high) number; but anyway, that would mean that every year there are over 600,000 software projects going on.

Now let's say a typical project has a lifespan of 10 years. That also feels high to me, but who knows? As a conservative estimate, then, over a 30-year career, a developer's experience takes place in a landscape comprising about 1.8 million projects. These run the gamut from greenfield projects to extensions and rebuilds of legacy systems; from small startups to giant enterprises; from solo developers to giant, distributed teams. They encompass desktop, mobile, web applications, and video games, as well as lower-level libraries, drivers, and embedded systems. And they span every possible combination of technologies.

In that same timespan, as a generous guess, let's say I as a software developer work on 2 projects per year. So in 30 years I will have worked on 60 projects, covering what would surely seem to *me* like a huge variety of products, business constraints, and technical challenges. But the truth is that those 60 projects represent just 0.003% of the total number of projects that software developers all over the world worked on in the same time period. I don't mean to burst anyone's bubble, but that's **pretty insignificant**.

![How many software projects does a developer work on in 30 years?](/images/software-projects.png)

Now, I recognize that it's a bit cheap to just point to those numbers alone as if they make my case for me. There's more to software expertise than the sheer number of projects you've worked on---a *lot* more---but I still think it's worthwhile to point out the numerical reality, to sort of put things in perspective. No matter how much you know, how much you've learned over the years, you just can't make these grand sweeping claims about what works or what doesn't work, with any real authority. All you know is what has worked for *you*, and what didn't work for *you*.

Suggestion versus prescription
------------------------------

I'm not saying you shouldn't try to teach others the lessons you've learned. God knows I make feeble attempts to do this all the time (and I also fall into the trap of taking an authoritative tone far too often, only to later reflect on my pompousness). But there's a big difference between *sharing our experiences*, doing our best to learn from one another, and *telling others they're wrong*, or that my way is the only way to build software.

Ultimately it comes down to suggestion versus prescription. If you've used a tool, or taken an approach, or thought a lot about an idea, I definitely want to hear your perspective, especially when your experience in that area exceeds mine. But when you start to make blanket statements like "*Never* use that tool" or "That approach is *always* a mistake" or "That idea is *totally* wrong"... I'm going to be skeptical.

Here's another point to consider. There's a phrase I often heard at ThoughtWorks: *Used in anger*. It's a play on "Shot in anger" (as in, not just held a gun but actually went to war and fought). A developer might say, "X seems like a pretty nice tool, but I've never used it in anger *[on a project]* so I can't really say." But think back on the numbers I tossed out earlier. Even if you *have* used a tool "in anger," how representative is your experience, really? If you hated it, maybe it was just bad luck and you would have loved it in a different scenario. If you loved it, maybe you just got lucky and happened to miss a lot of the problems with the tool. If you use it repeatedly, perhaps you're suffering from [Stockholm Syndrome](http://en.wikipedia.org/wiki/Stockholm_syndrome)[^stockholm-syndrome].

[^lot-of-views]: Man, I wish any posts on this *blog* would get 60k+ views!

[^if-i-may]: And *clearly* I may, since this is my blog!

[^sounding-defensive]: Which *clearly* I do, because I am!

[^comic-strip]: To make this cartoon I used a nice little tool called [Make Beliefs Comix](http://www.makebeliefscomix.com/).

[^ten-thousand]: Note to self: research this number!

[^stockholm-syndrome]: For example, if you still like writing Java...
