---
title: The need for software that explains
date: 2019-10-07
published: false
---

At MP Capital our software made sometimes very risky trades. We built a rickety
framework for every trade having an explanation attached to it.

More recently I've been working on a side project with a friend that involves
scanning legal documents. The code is fairly complex in some areas; at times
it's unclear why it produces certain results. Again, I've found myself wanting
the same functionality: not just a result, but a result accompanied by an
explanation.

It seems this is not a pit of success situation. The paradigm of every
programming language I've worked with is that the atom of behavior is that
function: you give it some inputs, it produces a return value. (Maybe a couple
of values, e.g. a tuple in Python or a result along with an error code in Go.)

In this paradigm, visibility into the _why?_ of software is a feature that the
developer has to build. We call it instrumentation; it's its own thing. The
most responsible devs write copious logging to capture the processes happening
internally as software does its thing. But logs are only as useful as the
developer writing them. They're also detached from the environment in which the
software is actually used (so if you're surprised by a result, you have to go
look at the logs somewhere else).

My impression is that one of the biggest fears with artificial intelligence is
that we will build a machine whose behavior we can't understand. The models
we're using (e.g. ML requiring large volumes of data) almost ensure this will
happen. (Also, I wrote about this [almost a decade ago][1]!)

Think about the way humans operate. If I do something you don't understand, you
can ask me why I did it, and I'll answer you. If you don't understand my
answer, you can ask about that, and I'll try to explain myself. If I were like
most software today, there's a chance you might ask a question I couldn't
answer, and then you'll never get an explanation: the best you could do would
be to reprogram me so that _next_ I'll have an answer for you (and you'll just
have to hope it's a satisfying answer).

Imagine a new paradigm where software were more like this. Where every output
of the software were accompanied by a ticket entitling me to a full explanation
of how that output was produced.

Would this be enough? As our software explained itself, would we see the early
warning signs of unintended consequences before they occur? I don't know; but
at least I would feel a lot safer!

[1]: posts/2011-08-13-were-all-going-to-die-because-you-dont-know-what-a-binary-tree-is.markdown
