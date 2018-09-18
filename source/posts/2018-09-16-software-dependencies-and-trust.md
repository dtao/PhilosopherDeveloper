---
title: Software dependencies and trust
date: 2018-09-16
published: false
---

Our society is built on a whole lot of trust. It would be difficult for most of
us to function if that weren't the case. When you drive on the highway, for
instance, you're trusting the engineers and construction crews who built the
bridges you drive on. We trust the architects who designed the buildings we live
and work in. We trust the farmers who produce the ingredients in the food we
eat, the individuals who prepare it, and the systems that distribute it.

We all know all this, but taking the time to mentally enumerate all of the
actors and systems in which we place our trust can be both exhausting and a bit
overwhelming. Most of us, I think, tend to put it out of our minds most of the
time. This is inevitable, but it can also make us numb to certain types of risk,
much like a certain proverbial boy who desensitized his village to the threat of
wolves.

A quick aside: trust has at least two dimensions: I can trust or distrust
someone based on what I believe to be their *intentions*---whether or not
they're malicious---as well as on how much confidence I have in their
*competence*---whether they are skilled in delivering whatever value I'm
deriving from them. It makes some sense that we use the same word in both ways
because in both cases trust introduces *risk*, and the way that we manage that
risk is largely the same.

What does this all have to do with software dependencies? An entire book could
be written on the subject---and who am I kidding? It probably already has---but
for now I'm going to focus on a simple idea: software teams want to be confident
in the changes they make to their software. Among other things, this means:

1. The changes don't introduce bugs.
2. The changes don't introduce new security vulnerabilities.
3. The changes don't result in leaking personal data.
4. The changes don't introduce performance regressions.

Or I could generalize all of the above into a single statement: the changes
don't change the behavior of the software in any unintended ways.

So let's take that as a starting point. Additionally let's say, for the sake of
argument, that I _do_ trust my team; i.e., I have high confidence in their
ability to build high-quality software, and I also believe they all have good
intentions (no malicious actors). Given these assumptions, the question remains
of what policies the team should adopt to have high confidence in their changes.

On the Bitbucket team we have two mechanisms to increase our confidence in
changes: automated tests, and code review. Automated tests _are_ code, however;
and low-quality tests can have a negative impact on confidence. For example, if
a test is known to be "flaky" then the team can become desensitized to the
signal it provides. And the only real safeguard against low-quality tests is
code review. So in the end, relying on the team to review its own work is the
core mechanism that gives us confidence in our changes.

Now, with all of that lead-up, I can finally ask the important question: **What
are we actually reviewing?**

Imagine a software project with zero external dependencies. (This is a myth.
Even if you had no _library_ dependencies, you'd still have dependencies; e.g.
the programming language, operating system, etc. But for the purpose of this
discussion I'll keep it focused on library dependencies.) For this project, if
every change went through code review, then every line of code that changed
between one release and the next would be reviewed. Our confidence should be
high.

Now imagine this project had just one external dependency, which itself has no
further dependencies. Occasionally, a dev updates the version, resulting in a
change that looks something like:

```
-library==1.0.0
+library==1.0.1
```

When I review this change, I don't actually know what changed between versions
1.0.0 and 1.0.1 of this library. I trust that the dev who is submitting the
change knows; but in reality, they *probably* don't. They probably just know
that it works, and hopefully they can justify making the change because it
solved a problem or improved something we care about. The dev on my team is
ultimately trusting the author(s) of the library, along both trust dimensions.

As with the bridges I drive on every day, it's best for me not to think through
the ramifications of this. Not only do I not know the author(s) of the library,
I don't know what their process is for ensuring quality. What internal
requirements did they have to fulfill in order to publish version 1.0.1? We
don't know, but at least if we want we can
