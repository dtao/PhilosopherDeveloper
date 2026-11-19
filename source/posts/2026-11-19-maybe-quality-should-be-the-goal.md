---
title: Maybe quality should be the goal (not a guardrail)
date: 2026-11-19
published: true
---

There's a premise in software right now that is so widely accepted it's
almost never questioned: we should be using AI to move faster. Whatever
used to take three months should take one. Whatever used to take a month
should take a week. In some cases the ambitions are even more extreme,
like delivering a year's worth of features in a month.

This isn't just a thing at Atlassian, or in any one company. It's the
whole industry.

The usual concern, of course, is that we don't want to just throw slop at
the wall. We don't want to ship so fast that quality takes a nosedive.
So the standard answer is to treat quality as a **guardrail**: we'll
monitor it, and we'll make sure it doesn't go down. As long as throughput
goes up and quality holds steady, that's success.

(insert quality-as-guardrail image here)

I think this framing is backwards, or at least it's not the best way to
think about what AI makes possible.

# How much faster do we actually want to go?

To be clear, I do think we should be going faster. Our products could
evolve faster than they do, and I think many of our customers would love
for them to.

*Many*, not all. Some customers explicitly don't want things to move that
fast; that's why release tracks exist. So it's already the case that
shipping features faster isn't something every customer wants.

But let's accept the premise that for most customers it would be nice to
get new capabilities sooner, things that let them do what they couldn't
do before. Even so: if we shipped twice as many features in a year, would
that be enough? Would that be the sweet spot? Would customers want ten
times as many features and new products as we ship today?

It's not obvious to me that they would. And yet 10x throughput seems to be
what everyone is aiming for. (Steve Yegge actually [found the limit][1]:
at one point his agents were shipping so many features to his game that
the players asked him to stop.)

# Flip it around

So here's my thought. What if we used AI to drive quality *up*, and made
throughput the guardrail?

(insert quality-as-goal image here)

We certainly don't want to slow down. I'd even say we should aim to at
least double the rate at which we ship new features. But beyond that,
what should we be doing with all of this untapped AI potential?

Here's my honest take. I wouldn't give our quality an A+. Customers have a
lot of valid complaints: the products are clunky. They're slow. They're
buggy. They're unreliable; there are outages, periods of degraded
performance, and occasional security incidents.

Imagine if our products had all the same features they have today, but
were lightning fast, extremely reliable, never went down, and were so well
made that users essentially never ran into weird bugs. I think that would
go a long way toward earning customer trust. And it's a very different
place from where we, and most of the industry, are focusing right now.

I'm picking on Atlassian a bit here, but this really is industry-wide.
Think about most of the software you use. How much of it would you call a
truly outstanding product? Usually it gets the job done, but the company
building it is focused on growth and revenue and everything else, not
necessarily on building the best possible thing.

Until quality is uniformly excellent across our products, I think there's
a lot to be said for driving it up much more aggressively.

# Guardrails get demoted

There's another problem with calling quality a guardrail. As soon as you
call something a guardrail, you've already demoted it relative to
whatever your real goal is.

If the real goal is throughput, then quality tends not to be a very
effective guardrail at all. Eventually you'll reach a point where you
could get a lot more throughput in exchange for only a small dip in
quality. Then you start to develop an exchange-rate mentality: what if I
could improve throughput by 10 and only hurt quality by 1? If throughput
is what really matters, that seems like a great trade. Yes, quality
matters, but only as a guardrail, so it doesn't matter *as much*.

And that's how a situation that was already not great starts going
backwards.

I'm not saying anything groundbreaking here. I think this is exactly what
we're already seeing across the industry: outages are more common,
defects are more common, and "slop" has become part of our vocabulary.
To be fair, the models keep getting better, and maybe some of that
problem will go away on its own. But better models won't change what
we're choosing to prioritize, or where we're putting our attention.

# What I mean by "quality"

One last disclaimer. I'm talking about quality very loosely, and quality
isn't a well-defined thing. It's one of those things we all recognize
when we experience it, but none of us can define precisely.

For me, it boils down to making people's lives better: giving them
something to enjoy, helping them complete a task more effectively, giving
them back some free time, solving a problem they have.

That's impossible to track objectively, so in the charts above I didn't
use some abstract "quality" line. Instead I used measurable things that
are clearly components of quality: number of bugs, performance,
availability. What these have in common is that improving them benefits
*everyone*. No customer is going to complain that we fixed too many bugs,
made the product too fast, or kept it up too reliably.

That's what makes quality fundamentally different from throughput.
Shipping faster probably helps a lot of customers, but some customers
don't even want it. Improving quality objectively helps every one of
them.

[1]: /posts/takeaways-from-aie-code-summit
