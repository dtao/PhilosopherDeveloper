---
title: The audacity of prescription
date: 2013-11-18
published: false
---

Indulge me, for a moment, as I rationalize what is essentially an entire blog post to defend my ego from strangers on the internet.

[![XKCD #386](http://imgs.xkcd.com/comics/duty_calls.png)](http://xkcd.com/386/)

I recently wrote a protip on Coderwall called ["Bootstrap without all the debt"](https://coderwall.com/p/wixovg) and it got a *lot* of views[^lot-of-views], mainly thanks to [Hacker News](https://news.ycombinator.com/item?id=6740324). Of course, with the HN reference came a lot of very opinionated readers, among them some who seemed to think I was saying something a lot more controversial than what I *thought* I was saying.

Some pointed out that CSS selectors can get out of hand when you use SASS's `@extend` directive, and that the strategy I promote in the protip breaks Bootstrap's JavaScript features. Others argued that on large projects, you're better off without an extra layer of abstraction between your markup and your UI framework. Still others questioned the inherent value of semantic markup itself, even going so far as to accuse me of "parroting" (ouch) an ideal that died years ago (the so-called ["semantic web"](http://en.wikipedia.org/wiki/Semantic_Web)), and asserted that any attempts to decouple yourself from a framework in the first place are misguided.

At the risk of sounding defensive[^sounding-defensive], I took a bit of liberty in paraphrasing these remarks in the form of a comic strip[^comic-strip]:

![Sometimes a piece of advice isn't universally applicable, and that's okay](/images/bicycle.png)

The poverty of our experience
-----------------------------

It's estimated that 10,000[^ten-thousand] software projects are started each year in the U.S. As a conservative estimate, then, over a 30-year career, 300,000 software projects *happen*. These run the gamut from greenfield projects to extensions and rebuilds of legacy systems; from small startups to giant enterprises; from solo developers to giant, distributed teams; they encompass desktop, mobile, web applications, and video games, as well as lower-level libraries, drivers, and embedded systems; and they span every possible combination of technologies.

In that same timespan, as an extremely generous guess, let's say I as a software developer work on 2 projects per year. So in 30 years I will have worked on 60 projects, covering what would surely seem to *me* like a huge variety of products, business constraints, and technical challenges. But the truth is that those 60 projects represent just 0.2% of the total number of projects that software developers all over the world worked on in the same time period. I don't mean to burst anyone's bubble, but that's **pretty insignificant**.

![How many software projects does a developer work on in 30 years?](/images/software-projects.png)

Now, I recognize that it's a bit cheap to just point to those numbers alone as if they make my case for me. There's more to software expertise than the sheer number of projects you've worked on---a *lot* more, actually. But I still think it's worthwhile to point out the numerical reality, to sort of put things in perspective. No matter how much you know, how much you've learned over the years, you just can't make these grand sweeping claims about what works or what doesn't work, with any real authority. All you know is what has worked for *you*, and what didn't work for *you*.

Suggestion versus prescription
------------------------------

I'm not saying you shouldn't try to teach others the lessons you've learned. God knows I make feeble attempts to do this all the time (and I also fall into the trap of taking an authoritative tone far too often, only to later reflect on my pompousness). But there's a big difference between *sharing our experiences*, doing our best to learn from one another, and *telling others they're wrong*, or that my way is the only way to build software.

Ultimately it comes down to suggestion versus prescription.

[^lot-of-views]: Man, I wish any posts on this *blog* would get 60k+ views!

[^if-i-may]: And *clearly* I may, since this is my blog!

[^sounding-defensive]: Which *clearly* I do, because I am!

[^comic-strip]: To make this cartoon I used a nice little tool called [Make Beliefs Comix](http://www.makebeliefscomix.com/).

[^ten-thousand]: Note to self: research this number!
