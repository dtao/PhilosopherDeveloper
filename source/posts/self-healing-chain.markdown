---
title: The self-healing chain
date: 2015-05-25
published: false
---

In school, we learned about series and parallel circuits. In a series or "daisy chain" circuit, the
same electrical current flows through each component (say, a light bulb) in *series*, such that a
single failed component brings down the whole chain. A parallel circuit, on the other hand, isn't
really a single circuit; it's *many* circuits, all wired up in parallel so that one component can
fail without affecting all the others.

There are at least a few disadvantages to series circuits:

1. They're fragile: all it takes is one failed component to break everything. Moreover, the bigger
   the circuit (i.e. the more components it has), the worse this effect is. (The odds of any one
   bulb failing are much greater when you've got 100 bulbs vs. just a few.)
2. Once they *do* break, they're difficult to fix. I'm young enough that I don't remember ever
   having to deal with the horrors of series circuits; but I've heard harrowing tales of my parents'
   generation dealing with strings of Christmas lights that went out, having to check potentially
   hundreds of bulbs one by one in order to find the culprit.
3. You cannot add to a broken circuit. Once it's broken, adding any number of perfectly good
   components has no effect.

So series circuits are fragile, and they're tough to fix, and there are no workarounds for fixing
them. Parallel circuits suffer from none of the weaknesses outlined above.

You might think I'm on my way to drawing an analogy between circuits and software systems. That
would probably be apt, but my point in discussing circuits isn't related to software. It's related
to organizations of people.

We've all experienced the frustration of not being able to do *our* job because someone else hasn't
done *their* job. As a software developer, maybe I have bandwidth to write some code, but the
feature hasn't been properly spec'd by the product owner, or the design is up in the air. As a
salesperson, maybe I've got some great clients in the pipeline, but the engineering team has fallen
behind on delivering the product I'm supposed to sell. And so on.

We have dependencies on other people. When those dependencies break down, it prevents us from doing
our jobs effectively. Hence, organizations are like series circuits: one bulb burns out, the other
bulbs can't light.

Which is why "That's not my job" is a dangerous thing to say.

I mean, it's a perfectly *reasonable* thing to say. It's probably more often true, when stated,
than not. I have heard it from many competent, intelligent people who would actually *love* to do
their job, and who resent that they're blocked by some schmuck from that other department over
there. Heck, I'm pretty sure I've said it myself.

The problems with saying "That's not my job" are the very problems I outlined for series circuits.

In an organization full of smart, competent, motivated people who say "That's not my job", all it
takes is one *incompetent* or *unmotivated* person to potentially neutralize an entire project. When
that person fails to do his job, the people depending on his work can't do their jobs. As a result,
those depending on *their* work further down the chain can't do their jobs either. And on and on.

In a broken circuit, from a single bulb's perspective, the problem is that it's getting no current
from the the previous bulb in the circuit. So it's the previous bulb's fault. But *that* bulb may
not be getting any current from the bulb *it* depends on. This results in the finger-pointing that's
all too common on failed projects.

And in a chain with broken dependencies, adding more people---even competent, motivated people---
won't necessarily do anything.

The difference between people and light bulbs in this analogy is that people can interact with the
circuits they're a part of. Imagine a new kind of light bulb that could reach out to nearby bulbs
and repair them. The result would be a circuit that's infinitely more resilient: a self-healing
chain.

Our organizations could be like this if, instead of saying "That's not my job" when things go wrong,
people reached out to assist in fixing their upstream dependencies. The potential difference this
makes is huge. It's the difference between a string of lights that's completely dead and one where
every bulb is lit.

I understand why we say it. We're naturally cynical. We worry that by going outside the parameters
of our own jobs, we'll end up doing someone else's job for them, setting a bad precedent. In the
worst case, we could just create work for ourselves.

But consider the alternative. A world where every smart, capable person refuses to do work that's
not strictly part of their job description is a world where a lot of smart, capable people aren't
getting anything done.
