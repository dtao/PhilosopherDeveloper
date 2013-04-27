Looking back on some of my recent posts on this blog, I'm a bit annoyed at myself for being too hand-wavy and not saying anything all that original.

I'd like to make an effort, at least in my next few posts, to get more concrete and challenge some of the conventions I've observes in the software world. I'll start with an idea that I think is not all that radical, though it *would* mark a sigificant departure for most teams I've worked on.

How we think about priority
---------------------------

The way most teams prioritize work seems totally sensible on the surface. Essentially, tasks are assigned some priority ranking such as "high", "medium" or "low"; and then the highest-ranked tasks actually get assigned to people. In a perfect world this would mean that the most important things always get done, and then when there's a surplus of time a team can "catch up" on issues that aren't quite as urgent. In practice I think a different reality tends to emerge.

<iframe src="http://charter.herokuapp.com/embed/G8G85MQY" style="height: 450px; width: 600px;" />

On projects I've been a part of, inevitably it turns out that the "high-priority" work is the *only* work that gets done. We never seem to run out of high-priority things to do; and so there ends up being **this giant mountain of "low-priority" issues** that, if we're honest with ourselves, will never be tackled. Which would imply that more and more important things keep always coming up.

<iframe src="http://charter.herokuapp.com/embed/K8IUBCNI" style="height: 450px; width: 600px;" />

But either this isn't true, or it shouldn't be.

Other than the fact that it just doesn't seem reasonable that such a curve could actually represent reality, I see two problems here. First, the accumulation of many small bugs over the life of a project brings the quality of the software down, which is a sad state of affairs. Have you ever encountered a bug for the 100th time in some application you use regularly, and suddenly it occurred to you that that bug has been around *forever*? The other problem, which is arguably even worse, is the technical debt that so many low-priority defects represent. Choosing to always plow forward with high-priority items while allowing all these little problems to pile up exerts drag on a team. It becomes harder to make forward progress.

Just as there are two major problems, there are at least two mistakes that lead to this predicament. The first is a classic one that most of us are at least subconsciously already aware of, which is that we get too fixated on *adding features* to software when there are still minor issues to resolve. Quite simply, fixing bugs isn't sexy. And so move towards buggy, bloated software with too many features instead of high-quality software with just the right features.

The other mistake is more psychological. I can't really prove this, but it's my hypothesis that on strictly priority-based projects our minds come to think of *priority* as *likelihood of actually getting done*. Which makes sense, because the two end up being perfectly correlated. We therefore **tend to over-prioritize new work that we're excited about** out of fear that it just won't get done otherwise. And the cascading effect of this is that bugs we've been meaning to fix and little improvements we've been meaning to make get neglected over and over again.

How we could do it differently
------------------------------

Here's a different approach I would like to try some day. Instead of adopting the mindset that we will always work on high-priority items--logical though that may be in theory--what if we allocated our time **in advance** on a weighted basis, so that high-priority items get the most time but medium- and/or low-priority work gets some time as well? For example, we might say that out of every two weeks (10 working days), "high-priority" work gets 7 days, "medium" work gets 2, and "low" gets 1[^exact-breakdown-of-work].

<iframe src="http://charter.herokuapp.com/embed/NBSU8ZSB" style="height: 450px; width: 600px;" />

Why take this approach? I acknowledge that it seems a bit counterintuitive to *force* work on lower-priority tasks, when there's theoretically more important work do do. But I actually think this would get us closer to an ideal distribution of work than where most of us currently are. Instead of the mildly [ADD](http://en.wikipedia.org/wiki/ADD) pattern of working on whatever seems important right now, and perpetually "forgetting" to do less-urgent work, a fixed allocation would nudge us back in the direction of refactoring, fixing bugs, and actually implementing some of those nice-to-haves we never seem to implement.

More importantly, I think this strategy would allow us to be more honest with ourselves. The truth is that "high-priority" often doesn't really mean high priority: it's a stand-in for *probability of happening* (the psychological mistake I mentioned). Knowing that so-called "low priority" work *is* going to get done--that it *won't* just get swept under the rug--might enable us to make more truthful decisions about what we should be spending the lion's share of our time on.

What do you think?

[^exact-breakdown-of-work]: I'm just throwing these numbers out there. I would expect any team who attempted something like this to revisit the breakdown periodically in the beginning--say, every couple of months--to calibrate and figure out what works best.
