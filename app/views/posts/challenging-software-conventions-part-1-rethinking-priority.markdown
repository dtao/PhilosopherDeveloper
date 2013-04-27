Looking back on some of my recent posts on this blog, I'm a bit annoyed at myself for being too hand-wavy and not saying anything all that original.

I'd like to make an effort, at least in my next few posts, to get a bit more concrete and also to propose some hopefully more interesting ideas while I'm at it. But I'll start with one that I think is not all that radical, though it *would* mark a sigificant departure for most teams I've worked on.

What's wrong with how we prioritize work
----------------------------------------

The way most teams prioritize work seems totally sensible on the surface. Essentially, tasks are assigned some priority ranking such as "high", "medium" or "low"; and then the highest-ranked tasks actually get assigned to people. In a perfect world this would mean that the most important things always get done, and then when there's a surplus of time a team can "catch up" on issues that aren't quite as urgent. In practice I think a different reality tends to emerge.

<iframe src="http://charter.herokuapp.com/embed/G8G85MQY" style="height: 450px; width: 600px;" />

On projects I've worked on, inevitably there is this giant mountain of "low-priority" issues that, if we're honest with ourselves, will never be tackled. Which would imply that the team must always be stretched thin and constantly working on higher-priority items. But either this isn't true, or it shouldn't be.

There are at least two big problems with this. First, the accumulation of many small bugs over the life of a project brings the quality of the software down, which is a sad state of affairs. Have you ever encountered a bug for the Nth time in some application you use regularly, and suddenly it occurred to you that that bug has been around *forever*? Arguably even worse is the technical debt that so many low-priority defects represent. Choosing to almost plow forward with high-priority items while allowing all these little problems to pile up induces drag on a team. It becomes harder to make forward progress.

Similarly, there are two mistakes that lead to this predicament. The first is a classic mistake most of us are at least subconsciously already aware of, which is that we get too fixated on *adding features* to software when there are still minor issues to resolve. Quite simply, fixing bugs isn't sexy. The other mistake is more psychological.

I can't really prove this, but it's my hypothesis that on strictly priority-based projects our minds come to think of *priority* as *likelihood of actually getting done*. We therefore tend to over-prioritize new work that we're excited about out of fear that it just won't get done otherwise. And the cascading effect of this is that bugs we've been meaning to fix and little improvements we've been meaning to make get neglected over and over again.

A proposal for doing things a bit differently
---------------------------------------------

Here's a different approach I would like to try some day. Instead of adopting the mindset that we will always work on high-priority items (logical though that may be in theory), what if we allocated our time **in advance** on a weighted basis, so that high-priority items get the most time but medium- and/or low-priority work gets some time as well? For example, we might say that out of every two weeks (10 working days), "high-priority" work gets 7 days, "medium" work gets 2, "low" gets 1[^exact-breakdown-of-work].

Why take this approach? I acknowledge that it seems a bit counterintuitive to *force* work on lower-priority tasks. But I actually think this would get us closer to an ideal distribution of work than where most of us currently are. Instead of the mildly ADD pattern of working on whatever seems important right now, and perpetually "forgetting" to do less-urgent work, a fixed allocation would nudge us back in the direction of refactoring, fixing bugs, and actually implementing some of those nice-to-haves we never seem to implement.

Potentially even more important, I think this strategy would allow us to be more honest with ourselves. The truth is that "high-priority" often doesn't really mean high priority: it's a stand-in for *probability of happening* (again, the psychological side of things). Knowing that so-called "low priority" work *is* going to get done--that it *won't* just get swept under the rug--might enable us to make more genuine decisions about what we should be spending the lion's share of our time on.

What do you think? Could this possibly be a smart move?

[^exact-breakdown-of-work]: I'm just throwing these numbers out there. I would expect any team who attempted something like this to revisit the breakdown periodically in the beginning--say, every couple of months--to calibrate and figure out what works best.
