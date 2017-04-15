---
title: Hacks and debt
date: 2017-02-05
published: false
---

These days when we talk about "hacks" in software we're generally talking about
shortcuts. As a developer writing software, there is often a "proper" way to do
something--which can involve a considerable amount of work--and a "hacky" way,
which is quicker but messier. All too often, the hacky way wins out, due to
time constraints or laziness. The result is generally code that's harder to
understand, and therefore harder to maintain.

In the industry, we call the resulting messiness *technical debt*. It's an apt
term, in my opinion, because the analogy of financial debt maps very cleanly to
what happens on a software project where hacky solutions are applied. In the
real world, it sometimes makes sense to borrow money--that is, to take on debt--
if you have reason to believe you can *use* that money to make *more* money,
paying off the debt and then some. With software, it can make sense to take on
technical debt if you believe the gains from delivering your hacky solution--
for instance, increased revenue from the killer feature you just released--will
more than offset the cost of paying off the debt down the road by cleaning up
the mess.

Sadly, with both forms of debt, the decision very commonly turns out to be a
mistake based on excessive optimism. The short-term benefits were overstated, or
the magnitude of the debt was underestimated, or both. The indebted are left
with a burden they would have been better off without.

I mention "hacks" because the term has become prevalent outside of the tech
world. "Life hacks", for example, are supposed shortcuts for improving yourself
or your life circumstances without putting in a commensurate amount of effort.
My suspicion is that the same general pattern applies to all things we call
hacks, by which I mean most "hacks" are shortcuts made out of an overly
optimistic view which tends to end up being wrong.

One particularly dramatic example of this happened not so long ago, in the
financial crisis of 2008. The fundamental hack at the root of the housing
bubble was the shortcut of selling sub-prime mortgages. These mortgages served
as the basis for a new kind of financial instrument, mortgage-backed securities,
whose promise relied on the overoptimistic belief that mortgages are inherently
a safe source of revenue for the issuer. The shortcut was to bypass the usual
due diligence (e.g. credit requirements) that one would naturally apply when
loaning someone hundreds of thousands of dollars. The long-term catastrophic
cost of this shortcut is now well-documented.

I believe there is another example that we've seen happening very gradually
over at least the [past few decades][^past-few-decades], but most people don't
think of it as a hack, and it's hard for us to see the debt. The example I'm
referring to doesn't really have a name that I'm aware of, though it's related
to what we call "spin" or "messaging" (more colloquially known as "B.S."). Some
might even throw "political correctness" into the mix.

It might be easiest to describe what I'm talking about backwards, starting with
the problem, so that we can understand how our solution is a hack. People used
to live in small social groups (e.g., tribes), where everyone knew everyone
else. When you truly *know* someone, the need to be careful with language is
largely mitigated. If someone says something that could be taken a variety of
ways, we tend to give those we know personally the benefit of the doubt,
defaulting to charitable interpretations ("he didn't really mean that").

We no longer live isolated in these small groups, but in very large communities
(e.g. cities) where you cannot realistically know everyone you encounter. It
turns out that in this context, when we *don't* know someone personally, we
tend to be much less charitable in interpreting the things they say.
Intuitively, this makes sense: while you might trust your fellow tribespeople
to generally have peaceful intentions towards you, meeting someone from another
tribe is inherently riskier since you don't know their motivation. So you would
naturally be less charitable in interpreting what they say.

The "correct" solution to this problem might involve figuring out a way to get
everybody to know each other, the same way we did when we lived in tribes.
Barring that (since logistically getting millions of people to know each other
personally does seem improbable), maybe if everyone at least had a diverse
*enough* social group, interacting with a representative cross section of the
population daily, we'd be in a better spot. ([Singapore][^singapore],
[for example][1], does something like this: the government provides
public housing but explicitly mixes it up proportionally based on the racial
breakdown of the population.)

But since correct solutions tend to be hard, we've gone with a hack instead by
focusing on the language itself. Politicians, corporations (including startups),
non-profits--across the board, we have become accustomed to those in power
making carefully crafted statements designed to have a very specific effect on
a very specific, strategically selected group of people. Pause for a moment and
consider how strange it is that we read *news headlines* like "Senator X
responds to Y" or "CEO of Mega Corp issues statement": a person literally just
*said some words*, and this is a newsworthy event.

With other forms of debt, there is inevitably a dramatic long-term consequence,
a tipping point where the cost becomes overwhelming and inflicts great damage.
In software this can take the form of a production system failing, or of a team
deciding they need to take a few months to rewrite some particularly broken or
fragile pieces of it. In finance it typically means bankruptcy, foreclosure, or
some equivalent reckoning.

[1]: https://qz.com/436056/singapores-forced-housing-integration-fueled-its-economic-success/

[^past-few-decades]: Certainly as far back as I can remember, anyway.

[^singapore]: For the record, I am not saying that this would work for America.
I am just pointing to a real-life example of what I'm describing, albeit on a
relatively small scale.
