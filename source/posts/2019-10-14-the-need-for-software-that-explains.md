---
title: The need for software that explains
date: 2019-10-14
published: false
---

My first job as a developer was at a company called MP Capital, an algorithmic
trading firm in Philadelphia. Our boss, an experienced trader, would present
models to us and we would do our best to code them. Sometimes he would question
why our models resulted in certain particularly risky trades. To help him
understand cases like these, he asked us to build a feature that would provide
a breakdown of every trade: essentially a record of the algorithm that
triggered it, every step of the way. At the time I didn't appreciate just how
unique this was.

At Google, I remember the search team had something similar: a tool that could
provide a rule-based explanation for why a given page was listed for a given
profile at a given position in the search results.

More recently I've been working on a side project with a friend that involves
scanning documents. The code is fairly complex in some areas; at times it's
unclear why it produces certain results. Again, I've found myself wanting the
same functionality: not just a result, but a result accompanied by an
explanation.

There is no [pit of success](/posts/pit-of-success.html) here. By _default_,
software does not explain itself. The paradigm of every programming language
I've worked with requires the programmer to define the inputs and outputs.
Anything the programmer left out---e.g., what was the previous value of this
local variable, did the loop exit early, was an error raised and handled---is
hidden away.

In this paradigm, visibility into the _why?_ of software is a feature that the
developer has to build. Responsible engineers add copious logging to their code
to capture the processes happening internally as software runs. But the
usefulness of logs is limited by the foresight of the developer writing them.
It's also limited by how easy they are to access.

One of the biggest fears[^biggest-fears] with computers is that one day we will
develop advanced artificial intelligence whose behavior we can't understand. I
can all but guarantee this will happen if we never take the time to build the
capability for AI to explain itself. Hidden-by-default should not be an option.

Imagine a new software paradigm where nothing is hidden. Where every output of
the software is accompanied by a token entitling me to a full explanation of
how that output was produced. Or better yet, where the explanation is somehow
_part_ of the output. What would that look like?

The models we're using today---e.g. machine learning, which requires large
volumes of data---almost _ensure_ that we won't understand the decisions made
by artificial intelligence in the future. If explanation were baked into the
tools we used, how might that change? What would we allow ourselves to build,
and how much sooner might we notice when we're headed in the wrong direction?

The [proverbial frog](https://en.wikipedia.org/wiki/Boiling_frog) allows itself
to be slowly boiled[^slowly-boiled] to death because it doesn't understand
what's happening. Give the poor thing a thermometer it can read.

[^biggest-fears]: Incidentally, I wrote about this [almost a decade ago](/posts/2011-08-13-were-all-going-to-die-because-you-dont-know-what-a-binary-tree-is.markdown)!

[^slowly-boiled]: My understanding is that this is not actually a real, demonstrable phenomenon. I still think it's a useful metaphor that rings true for the human experience.
