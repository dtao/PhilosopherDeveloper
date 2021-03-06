---
title: The trouble with stop-the-line CI
date: 2012-05-07
published: true
---

[Continuous Integration](http://en.wikipedia.org/wiki/Continuous_integration) is a powerful technique used by a growing number of software teams. Personally, I have issues with the way CI is done on a lot of software projects. I've [tried to write about this once before](/posts/being-agile-with-continuous-integration.html), but at the time the ideas bouncing around in my head hadn't really crystalized. To be honest, they *still* haven't fully (if you've ever worked and/or debated with me, you'd be right to wonder if they ever will); but I figured it was time to give it another shot anyway. And in typical me fashion, I'd like to start with an analogy.

## The Puzzled Factory Owner

Imagine a factory owner wants to reduce the occurrence of defects and thereby improve the consistency and quality of the products manufactured at his factory. So he brings in an expert, who advises him there's a new technique called "Constant Validation" --or CV for short---that can notify him whenever a defect is found. This sounds great to the factory owner, so he decides to install CV at his factory immediately.

Before he leaves, the expert also informs the owner that he should have his workers stop whenever a defect is found and wait for it to be resolved before resuming work. Otherwise, tracing the defect back to its source can become very difficult, as additional errors might be introduced during the investigation. This makes a lot of sense to the factory owner; he thanks the expert for his time and bids him farewell.

Initially, business is going well for the factory owner. The CV system enables him to react as soon as a defect is found, taking corrective action at once to prevent further damages. For the first couple of weeks following the CV installation, he is extremely pleased with his investment.

Over time, however, the owner starts to feel differently. Looking at his numbers, he realizes that productivity is actually *down*. His factory is producing fewer goods now than it was before he installed CV. Even worse, while he can clearly see in his books that the occurrence of *defects* has gone down, reports of customer services complaints related to product *quality* have shown very little sign of decline.

## What's Going On Here?

I believe that the concept of CI is sound; but its typical implementation, which I've loosely described in the corny "CV" analogy above, has what I believe to be at least 3 flaws.

### 1. CI treats all defects equally

There's a certain conceptual appeal to this approach. Simpler mental models are almost always preferable where they possess the same explanatory power as more complex ones. (When it [comes to estimation](/posts/the-trick-to-good-ballpark-estimates.html), for example, anyone I worked with on my last consulting project would tell you that I'm a big proponent of what I like to call the "everything is medium" strategy.)

Sadly, in the case of software quality as measured by defects, I don't think this one even comes close. Consider a bug like this: due to a time zone issue, if a certain e-mail goes out on a particular night of the year, users will receive duplicate e-mails. (I just pulled that out of thin air, but it sounds realistic enough to me.) This bug would presumably be low priority on almost any software project due to its (1) benign nature and (2) low impact. Still, if a developer ever did get around to fixing it, there's a decent chance he would write a test to make sure it doesn't re-emerge later.

That's a good thing, right? The problem is that tests are a double-edged sword. While it's great to imagine a code base full of tests to expose even the smallest of defects, it's important to realize that **more tests means more potential unexpected stops**. Most teams that use CI follow the rule that if the build ever turns red, it is a blocking issue that must be addressed before anyone can commit any more code. And while this is really a sensible rule, for the same reasons the "expert" gave in my factory analogy, it makes failing tests extremely expensive in a stop-the-line environment. Whether this expense is offset by the benefit of the test coverage CI affords *entirely* depends on the severity of the defects covered. But in every application of CI that I've seen, a red build means "stop" no matter what.

Returning to the duplicate e-mail defect example, then, it's worth asking whether the recurrence of such a bug ought to result in lost time for the entire team. Of course it's not a black and white issue; but to me, the answer is probably not. The cost of a defect of that nature is almost negligibly small. And so trading in team productivity in exchange for its resolution is a poor value. In order to make up for "bad trades" like this, CI needs to have lots of high-value tests that ultimately pay for themselves and then some. Which brings me to the next point.

### 2. CI gives small defects disproportionately high coverage

Obviously this is not a necessary truth; but remember, I'm talking about the typical implementation of CI that I've seen. In my experience, developers who subscribe to the value of tests (and I include myself among them) tend to write **lots of tests that cover little things**. There are numerous reasons for this. For one, these are the kinds of tests that typically drive out the design of a system---validating input, ensuring correct behavior in very simple cases, testing interactions between components, etc.--and so are extremely popular, particularly among the [TDD](http://en.wikipedia.org/wiki/Test-driven_development) crowd. Another reason is that it's simply easier to figure out how to test small, isolated behaviors than it is to reason about testing larger-scale components, with proper isolation of logic and separation of concerns and so on.

Now, this is where I start to really become skeptical of CI as I have seen it used. *Because* we use CI in a way that treats all defects equally, every failure is equally costly. But the inverse is not true; tests that protect against low-severity defects are only marginally beneficial. Thus for a test code base protecting against lots of little defects, **there is a very real possibility of suffering a net loss from CI**, with lots of tests each providing a small amount of benefit outweighed overall by very costly occassional test failures.

Exacerbating this issue is the fact that often, **the most severe defects in a piece of software come from design issues rather than coding errors**. I'm talking about performance issues, usability problems, and the like. We tend not to think of these as "defects" in the traditional sense as they are not the same as software bugs; but they are flaws, and in most cases they are *more* important than bugs. In the worst case, an issue of this nature can undermine the value of an entire software project. And defects like these have a combination of dastardly traits that tend to make them immune to CI, much like certain bacteria can completely evade known medications:

1. They are **unexpected**. After all, if we *anticipated* them, we wouldn't have designed the system the way we did. This means they don't get pre-emptively covered by tests; they are discovered by human beings using the software and become regression issues.

2. They are **difficult to test**. Sometimes the most important features of an application are non-functional and essentially *require* manual validation. For instance, an iPad project I worked on recently had as one of its core goals to provide a rich and immersive user experience. There are [tools](http://www.testingwithfrank.com/) to perform [automated tests](https://github.com/square/KIF) on mobile devices, but none that I know of can provide much confidence that "the app feels smooth" or "the app is a pleasure to use."

3. They **can manifest in multiple ways**. Unlike your standard "bug," which is typically an isolated logical error, these types of issues can occur over and over again *in different places*. Performance is again a perfect example. Even supposing the best possible scenario---let's say you find a performance issue, isolate its cause, fix it, and even somehow manage to write a test for it---there's no way you can ever solve "the performance issue" as a whole. Patching a hole in one spot does not prevent similar holes from appearing elsewhere. And so these can be difficult or impossible to guard against with CI.

### 3. CI can provide a false sense of confidence

This is, to me, the most insidious of the three. Really, I probably could have skipped over the first two as I think we're all at least somewhat aware of them; but this one is surprisingly easy to miss. I think the reason has to do with how we software developers think.

We are (or at least I am) drawn to robust, self-sustaining solutions. We want to be able to solve a problem *once and for all*. A good illustration of this can be found in the growing popularity of next-generation NoSQL databases, most of which have as one of their primary goals to be *scalable* in a way that traditional relational databases simply are not. As a developer, I love the idea of being able to simply add more hardware as a product scales up, without ever needing to revisit the software. Another example (*WARNING: totally unprovoked and unnecessary jab against the Java community forthcoming*) would be the obsession amongst many Java programmers with [abstract factories](http://en.wikipedia.org/wiki/Abstract_factory_pattern) and XML configuration files. The intention behind these patterns is to make a software system as *flexible* and *extensible* as possible, and to avoid *at all costs* ever needing to redesign the system itself.

It's the same with CI. If at all possible, we want to write code, write tests, declare a feature *finished for all time* and then move on to the next one. This is desirable from a practical standpoint, but it's also an emotional need. And a green build feeds that need in a powerful way.

But despite our best efforts, *once and for all* just does not exist in software (or in anything, really). No matter what your test coverage, or the rigor with which you adhere to a strict CI policy, defects will surface. And so whatever confidence we feel that we owe to our CI we must temper with the awareness that we are never totally in the clear.

## It's Not So Bad

I expect that I'll get some flak for this post from some of my old colleagues at [ThoughtWorks](http://www.thoughtworks.com/), and justifiably so. If I seem excessively negative against CI, it isn't because I dislike CI or believe it should be scrapped, nor do I really think that most teams using CI are suffering from the above points quite as badly as perhaps I've implied. The truth is more that I tend to view CI as a bit of a golden calf in the software industry, or at least in the agile community. It has reached the status of a *given*--something many developers wouldn't even think twice about at the start of a new project. And maybe it should be. But as I've tried to express in this post, it can easily be taken too far and overvalued.

The most compelling argument I know of in *support* of taking CI (or anything) for granted is that allowing ourselves to operate on assumptions alleviates some of our mental burden and reduces points of friction among teams. That is, if we did *not* take CI for granted, then on every software project we would need to invest time in having a discussion about whether or not to use it, those with more experience would need to explain the benefits of CI to those with less, etc. *Assuming* that CI is a good thing saves us from these time-consuming conversations and frees our brains to focus on other things.

It is not a bad point, but I am personally always skeptical of arguments that are based on the premise that *not having to think about it* is undeniably a good thing.

Ultimately I think my points could be summed up pretty concisely: Continuous Integration, as it typically ends up being used on software projects, is **expensive**, and should be treated as a serious investment. And, despite the appeal of a system that we can all agree on and never need to question, we as responsible software developers should always be thinking carefully about our investments: are they benefitting us, are we using them effectively, should we be changing them.So my somewhat more *controversial* point is this: *don't* just take CI for granted. Use it for the powerful insurance it provides, but don't let its effects on the team grow unchecked without considering the cost.
