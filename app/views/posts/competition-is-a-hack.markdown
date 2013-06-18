I have this theory that our society, fueled by an economy based on competition (the foundation of capitalism and a significant part of our cultural identity, at least in most developed western countries), is burdened by a force very much akin to technical debt. This prevents our species from progressing nearly as fast as we should be able to, just as technical debt slows down software teams in the world of technology. And in the same way that technical debt ultimately stems from hacks, I believe that the "hack" underlying this great societal inertia is *competition itself*, which is inherently harmful.

This is actually something that I feel strongly about, so if you are interested in this idea but have suggestions or criticisms--*especially* if you have criticisms, actually--please let me know your thoughts in the comments! As with most of my posts, I'm writing this at a time when the idea is relatively fresh in my head; I haven't worked out all the nuances yet. It could be that a year from now I won't even feel this way anymore.

In any case, let's take a few steps back so I can provide a bit of context on why I feel this way.

What is technical debt?
-----------------------

First, let's define **technical debt** (or "tech debt"): it's what accumulates over the life of a software project from the decision to trade quality for speed. Early on, a company or software team will often knowingly perform low-quality work (often called "hacks") in exchange for faster progress. Some teams do this obliviously--unaware that they are trading anything--while others (probably most) do so acknowledging that this decision will eventually result in legacy [cruft](http://en.wikipedia.org/wiki/Cruft) exerting *drag* on the project. Most teams that incur tech debt assume that at some point down the road, after having reaped the benefits of their initial velocity, they will take the time to revisit the more problematic areas in their code and "refactor" or clean up after themselves.

The conventional wisdom here is that this strategy is worthwhile if the early gain more than offsets the later setback. If you think about it, this is basically the same gambit that the proverbial Hare took in his race with the Tortoise:

![If I run fast enough in the beginning, I can afford to take a nap later](/images/tortoise-and-hare.jpg)

This is a pretty easy concept to understand, but I'll give a semi-concrete example anyway. Suppose you find some arbitrage opportunity where you can purchase a good for $1 and sell it for $2. You don't have $1, but you're able to borrow that amount from an acquaintance who will expect you to pay him back, plus a little interest, within a month. If the amount he wants back within the month is $1.50, then this deal makes sense for you: you can go $1.50 into debt, make $2 selling the item, and enjoy a net gain of $0.50. If the amount he wants back is $2.50, then the deal doesn't make sense as your debt will exceed what you gained by incurring it.

So this is the decision software teams make: whether or not to allow themselves to fall into debt. Of course, the exact amount of both the debt and the temporary gain is unknown in software; so this decision is always a bit of a guess. My own personal experience suggests that taking on technical debt is almost always a mistake; the cost ends up being greater than expected, and despite the initial speed-up most teams that go into debt ultimately suffer a net loss.

Our debt was established long before we were here
-------------------------------------------------

Millions of years ago, nature faced a monumental design challenge: to create a world thriving with an amazing abundance of life, ruled by highly intelligent beings, starting from only some humble single-celled organisms.

Would you have any idea how to solve this problem? I sure wouldn't. So nature went with a **hack**: random mutations and limited resources.

When resources are limited, not all individuals are able to survive. Mutations therefore enable certain individuals to survive and reproduce more successfully than others. In time, over the course of countless generations, these mutations accumulate to differentiate lifeforms. This is the process of natural selection, which Darwin wrote about and then we all studied.

Now, competition is in our blood. It is the foundation of capitalism.

Competition is destructive
--------------------------

