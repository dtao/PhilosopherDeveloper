---
title: Maybe quality should be the goal (not a guardrail)
date: 2026-11-19
published: true
---

The premise in software right now is that we should be using AI to move faster.
Whatever used to take three months should take two weeks. Whatever used to take
two weeks, we should be able to do in a day. And the net effect of all this is
that we should be able to deliver 10X the value (or more) that we could
previously deliver in any period of time.

The familiar _concern_ accompanying this desire to move faster is that we don't
want to just generate a ton of so-called "slop". We don't want to ship so fast
that quality takes a nosedive. So the standard thinking is that we treat
quality as a **guardrail**: we'll monitor it and make sure it doesn't go down.
As long as throughput goes up and quality doesn't tank, everyone's happy.

![Increase throughput, protect quality](/images/throughput-goal-quality-guardrail-sketch.png)

Personally, I am not so sure about this premise.

# How much faster do we actually want to go?

To be clear, I do think we should be going faster. Our products could
evolve faster than they do, and I think many of our customers would love
for them to.

*Many*, not all. Some customers explicitly DON'T want things to move that fast;
that's why Atlassian has "release tracks" for enterprise customers, and why
many other enterprise companies offer similar controls. So it's already the
case that delivering more, faster, isn't necessarily for everyone.

But let's accept that at least for _most_ customers it would be nice to get new
capabilities sooner, things that let them do what they couldn't do before. We
still don't know what the limit is. If we shipped twice as many features in a
year, would that be the sweet spot? What about 10X as many features? I don't
know what the limit is, but I'm quite confident there is one.

(Steve Yegge actually [found the limit][1]: at one point his agents were
shipping so many features to his game that the players asked him to stop.)

# Flip it around

So here's my thought. What if instead of treating quality as a guardrail and
throughput as the goal, we reversed it - made quality the goal, and throughput
the guardrail?

![Improve quality, maintain throughput](/images/quality-goal-throughput-guardrail-sketch.png)

We certainly don't want to slow down. I'd even say we should aim to at
least double the rate at which we ship new features. But beyond that,
what should we be doing with all of this untapped AI potential?

Personally, just looking at the industry as a whole, I would not rate most
software products that exist today "A+ on quality". Customers have a lot of
valid complaints: many of the products they use are clunky, slow, buggy. And
they're unreliable; there are outages, periods of degraded performance,
cybersecurity incidents. There is a lot of room for improvement.

Imagine if the products we use had all the same features they have today, but
were lightning fast, extremely reliable, never went down, and were so well made
that users essentially never ran into weird bugs. I think that would go a long
way toward earning the trust of the people _using_ these products. And it's a
very different place from where most of us are focusing right now.

Until quality is uniformly excellent across our products, I think there's a lot
to be said for being more ambitious about driving it up. Shipping more features
primarily serves the customers who have an appetite for more change. Improving
quality indisputably benefits *all* of them.

# Guardrails get demoted

There's another problem with calling quality a guardrail, which is really a
feature of guardrails in general. By designating something a guardrail, you've
implicitly demoted it relative to whatever your real goal is.

If your real goal is throughput, then you will feel good when throughput goes
up, and you will get frustrated when the guardrail stops you from achieving
that. This is only natural. Eventually you'll reach a point where you could get
a lot more throughput in exchange for only a small dip in quality, and this
will lead to an exchange-rate mentality: _What if I could improve throughput by
10 and only hurt quality by 1?_ If throughput is what really matters, that
seems like a great trade. Yes, quality matters, but only as a guardrail, so it
doesn't matter *as much*.

And that's how a situation that was already not great starts going
backwards.

I'm not saying anything groundbreaking here. I think this is exactly what
we're already seeing across the industry: outages are more common,
defects are more common, and "slop" has become part of our vocabulary.
To be fair, the models keep getting better, and maybe some of that
problem will go away on its own. But better models won't change what
we're choosing to prioritize, or where we're putting our attention.

# A couple of disclaimers

First, I'm talking about quality very loosely, and quality
isn't a well-defined thing. It's one of those things we all recognize
when we experience it, but none of us can define precisely.

For me, it boils down to making people's lives better: giving them
something to enjoy, helping them complete a task more effectively, giving
them back some free time, solving a problem they have.

That's impossible to track objectively, so in the charts above I didn't use some
abstract "quality" line. Instead I used measurable things that are clearly
_correlated_ with quality: number of bugs, performance, availability. What these
have in common is that they are measurable, and improving them benefits
everyone. No customer is going to complain that we fixed too many bugs, made
the product too fast, or kept it up too reliably.

Second, I don't actually think _either_ quality or throughput should be a
guardrail in an absolute sense. As I've [written before][2], what we should
really be striving for is delivering the most **value over time**. That's an
optimization problem, where we aim to maximize the *product* of velocity and
quality, not just maximize one while holding the other steady (the same way you
don't maximize area of a rectangle by only focusing on either length or width).

Pragmatically, though, I know a problem like this often becomes more tractable
when you focus on one dimension at a time while guarding the other. And I'm
saying that if we're going to pick one dimension to push on right now, quality
may well be where the greater opportunity lies to help more people.

[1]: /posts/takeaways-from-aie-code-summit
[2]: /posts/value-over-time
