---
title: Competition is a hack
date: 2013-06-19
published: false
---

I have this theory that our society, fueled by an economy based on competition (the foundation of capitalism and a significant part of our cultural identity, at least in most developed western countries), is burdened by a force very much akin to technical debt. This prevents our species from progressing nearly as fast as we should, just as technical debt slows down software teams. And in the same way that technical debt ultimately stems from hacks, I believe that the "hack" underlying this great societal inertia is *competition itself*, which is inherently harmful.

This is actually something that I feel strongly about, so if you are interested in this idea but have suggestions or criticisms--*especially* if you have criticisms, actually--please let me know your thoughts in the comments! As with most of my posts, I'm writing this at a time when the idea is relatively fresh in my head; I haven't worked out all the nuances yet. It could be that a year from now I won't even feel this way anymore.

In any case, let's take a few steps back so I can provide a bit of context on why I feel this way.

What is technical debt?
-----------------------

First, let's define **technical debt** (or "tech debt"): it's what accumulates over the life of a software project from the decision to trade quality for speed. Early on, a company or software team will often knowingly perform low-quality work ("hacks") in exchange for faster progress. Some teams do this obliviously--unaware that they are trading anything--while others (probably most) do so acknowledging that this decision will eventually result in legacy [cruft](http://en.wikipedia.org/wiki/Cruft) exerting *drag* on the project. Most teams that incur tech debt assume that at some point down the road, after having reaped the benefits of their initial velocity, they will take the time to revisit the more problematic areas in their code and "refactor" or clean up after themselves.

The conventional wisdom here is that this strategy is worthwhile if the early gain more than offsets the later setback. If you think about it, this is basically the same gambit that the proverbial Hare took in his race with the Tortoise:

![If I run fast enough in the beginning, I can afford to take a nap later](/images/tortoise-and-hare.jpg)

This is a pretty easy concept to understand, but I'll give a semi-concrete example anyway. Suppose you find some arbitrage opportunity where you can purchase a good for $1 and sell it for $2. You don't have $1, but you're able to borrow that amount from an acquaintance who will expect you to pay him back, plus a little interest, within a month. If the amount he wants back within the month is $1.50, then this deal makes sense for you: you can go $1.50 into debt, make $2 selling the item, and enjoy a net gain of $0.50. If the amount he wants back is $2.50, then the deal doesn't make sense as your debt will exceed what you gained by incurring it.

So this is the decision software teams make: whether or not to allow themselves to fall into debt. Of course, the exact amount of both the debt and the temporary gain is unknown in software; so this decision is always a bit of a guess. My own personal experience suggests that taking on technical debt is almost always a mistake; the cost ends up being greater than expected, and despite the initial speed-up most teams that go into debt ultimately suffer a net loss.

Our debt was established long before we were here
-------------------------------------------------

Millions of years ago, nature faced a monumental engineering challenge: to build a world thriving with an amazing abundance of life, ruled by highly intelligent beings, starting from only some humble single-celled organisms.

Would you have any idea how to solve this problem? I sure wouldn't. So nature went with a hack: random mutations and limited resources.

When resources are limited, not all individuals are able to survive. Mutations therefore enable certain individuals to survive and reproduce more successfully than others. In time, over the course of countless generations, these mutations accumulate to differentiate lifeforms. This is the process of natural selection, which Darwin wrote about and we all studied in school. It is supposedly the basis for the diversity of life we now see on Earth, and the core process responsible for the development of our incredibly advanced brains. And it is deeply rooted in competition.

Now, competition is in our blood.

Competition is destructive
--------------------------

We're taught to believe that competition is a good thing. And maybe it is, for us, in the end. But the issue is hardly black and white.

Let's take a quick survey of some clear examples of destructive competition.

Obviously, **wars**--the ultimate competition--are quite destructive, in just about every sense. They result in the loss of human life, the destruction of our creations, and the depletion of our resources.

- The American Civil War cost $4.2 billion a century and a half ago, which would be $79.7 billion today[^cost-of-us-wars], with a death toll that may have been as high as 750,000 soldiers[^civil-war-death-toll].
- World War I cost the U.S. alone about $20 billion nearly a century ago, or $334 billion in today's dollars[^cost-of-us-wars]. Worldwide it resulted in over 37 million deaths[^world-war-1-death-toll].
- World War II cost the U.S. $296 billion from 1941 to 1945 or $4.1 *trillion* dollars today[^cost-of-us-wars]. That's just the U.S. Its worldwide death toll was over 60 million people, or over 2.5% of the population of the entire planet[^world-war-2-death-toll].

Admittedly, these numbers are somewhat sensational. It might seem unfair to blame all of this destruction on *competition* per se. I actually think it *is* fair--i.e, if you went back far enough, and changed the conditions that fundamentally stirred our competitive nature before these wars ever started, they could have been prevented--but I'll not dive into that rabbit hole. There are plenty of examples elsewhere.

Look at pharmaceuticals. The major phara companies spend a great deal on R&D, but they also spend huge sums of money on advertising: in 2007, GSK spent $2.5 billion, Johnson & Johnson spent $2.4 billion, and Pfizer spent $1.3 billion[^pharma-advertising-budgets]. Some amount of advertising is arguably necessary for public awareness, even in a non-competitive environment; but clearly a significant part of advertising involves promoting the idea that a company's products are superior to its competitors'. Perhaps more importantly, the time and effort (and money, obviously) that these companies invest in developing new drugs lead to advances in research *that they do not share with each other*, in the hope of establishing a competitive advantage. Treatments are therefore developed more slowly and at greater cost than if the major players worked together and shared their research.

Examples abound in the software world as well. In 2011, for example, the average cost of a software security breach was $7.2 million[^cost-of-security-breach]. This is how much companies spent to recover from breaches that *actually happened*. Just imagine how much time and energy (and money) they spent to prevent them from happening in the first place! To give you an idea, Symantec's annual revenue is $6.7 billion[^symantec-revenue]. McAfee's was somewhere around $2.1 billion before they were acquired by Intel[^mcafee revenue]. Security companies' products are used throughout the corporate world to protect IT investments.

Meanwhile, software companies dedicate significant resources to securing their systems, developing hack-resistent software. In the academic world, researchers work on cryptography and developing algorithms that are computationally expensive by design to protect against brute force attacks. Hackers purchase powerful GPUs and spin them endlessly (consuming energy) to break through these protective barriers.

!["Give me your secrets!" "You can't have them!"](/images/tug-of-war.jpg)

All of this energy, time, money. If you're a hacker, and I'm a company, we're constantly exerting force against each other. Why? Why are you so insistent getting *in*, and why am I so concerned with keeping you *out*? What if we were on the same side?

Imagine if human beings didn't try to break into one another's systems, or steal each other's property. How many billions of dollars could be saved? How many millions of hours? How much total human mental effort could be diverted to more useful things if so many of us weren't thinking about ways to subvert or protect ourselves from others!

*If* competition is ultimately beneficial, it is in *spite* of the destruction it causes. In other words, it is at best one of those rare cases of *good* technical debt, where the benefits outweigh the drawbacks. Regardless, even in this best case scenario it is our nature as humans--unable to ever *truly* trust each other and cooperate effectively on a large scale--that makes competition a good thing. It isn't inherently good by itself.

What would outsiders think?
---------------------------

A little mental exercise I enjoy is to imagine that we as a species are being observed by some advanced alien species and speculate about what they must think.

It's interesting that in science fiction, when we encounter alien civilizations they tend to be internally united, at the planetary or even the galactic level. You never hear about their political parties or civil wars. (Well, maybe if you're a hardcore fan and read all of the mythology you do. But I think most of you are with me on this.) Maybe, in these fictional worlds, these aliens are so much more advanced than we are because they don't waste time competing with each other!

I like to imagine another advanced race looking down at us and feeling puzzled. They see that our minds are fairly capable, and that we sometimes make important discoveries that enhance our knowledge of the universe. But there seems to be a "bug" in our system, which causes us to go in circles most of the time: cutting off communication, building walls, basically sabotaging our own progress on a regular basis. This race doesn't understand our behavior because they always cooperate and they can't see why we don't do the same. They don't *get* competition.

!["They seem to spend a lot of time negating their own work, don't they?"](/images/earth.jpg)

Could such a race exist? Or is natural selection, based on competition for limited resources, the only path to becoming so advanced in the first place, and so any sufficiently advanced race will inevitably be competitive just like us?

Refactoring society
-------------------

I obviously don't know if any super-advanced, ultra-cooperative alien civilization exists. As far as I know, no one does. But let me propose that there *is* a variable in this equation that most of us wrongly assume to be constant: **limited resources**. Fundmanetally, the only reason to compete--the only reason I would want to *take* something from you, or get it before you, or frankly the only reason I'd compare myself to you at all--is that there isn't enough to go around.

This has historically been the case for almost all of human existence. I would argue, though, that we're approaching a point where it no longer quite holds. The world already produces enough food to feed everyone on the planet[^enough-food]. Producing electricy for the entire planet is probably within reach (definitely need to do some more research on this one). Projects like the recently-announced [Google Loon](http://www.google.com/loon/) even strive to bring the *internet* to the global population.

So I don't think it's *theoretically impossible* that we could start to move away from this paradigm we've been locked in, as a species, from the very beginning. But as I already admitted, competition is in our blood. If you buy my analogy on technical debt, it is like the most pernicious kind of technical debt, that starts with a simple hack and spawns an entire system that's fundamentally broken.

[^cost-of-us-wars]: [http://www.fas.org/sgp/crs/natsec/RS22926.pdf](http://www.fas.org/sgp/crs/natsec/RS22926.pdf)

[^civil-war-death-toll]: [http://www.nytimes.com/2012/04/03/science/civil-war-toll-up-by-20-percent-in-new-estimate.html](http://www.nytimes.com/2012/04/03/science/civil-war-toll-up-by-20-percent-in-new-estimate.html)

[^world-war-1-death-toll]: [http://en.wikipedia.org/wiki/World_War_I_casualties](http://en.wikipedia.org/wiki/World_War_I_casualties)

[^world-war-2-death-toll]: [http://en.wikipedia.org/wiki/World_War_II_casualties](http://en.wikipedia.org/wiki/World_War_II_casualties)

[^pharma-advertising-budgets]: [http://www.fiercepharma.com/special-reports/top-13-advertising-budgets](http://www.fiercepharma.com/special-reports/top-13-advertising-budgets)

[^cost-of-security-breach]: [http://www.bloomberg.com/news/2011-03-08/security-breach-costs-climb-7-to-7-2-million-per-incident.html](http://www.bloomberg.com/news/2011-03-08/security-breach-costs-climb-7-to-7-2-million-per-incident.html)

[^symantec-revenue]: [http://en.wikipedia.org/wiki/Symantec](http://en.wikipedia.org/wiki/Symantec)

[^mcafee revenue]: [http://news.techeye.net/business/mcafee-posts-record-revenue-results-for-2010](http://news.techeye.net/business/mcafee-posts-record-revenue-results-for-2010)

[^enough-food]: [http://www.fao.org/docrep/003/Y6265e/y6265e03.htm](http://www.fao.org/docrep/003/Y6265e/y6265e03.htm)
