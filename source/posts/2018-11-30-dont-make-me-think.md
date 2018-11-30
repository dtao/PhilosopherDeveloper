---
title: Don't make me think
date: 2018-11-30
published: false
---

*Note: I'm going for another [60-minute post][1] with this one.*

Suppose I said to you, "Go read *War and Peace* and write me a 10-page book
report on it." What would you say? Probably something like *Why?* or *Who do
you think you are?* or maybe just *No.* That's a homework assignment, and
there's no reason I should be entitled to just _give_ you a homework
assignment.

Why isn't it reasonable for me to give you a homework assignment? Because I'm
not your boss[^not-your-boss]. And in civilized society, we don't abide
individuals just assigning arbitrarily large tasks to one another. It isn't
proper.

Notice I said "arbitrarily large tasks"; we actually _are_ okay with assigning
_small_ tasks to each other. For example, almost no one thinks it would be
audacious of me to say, "Hey, could you hand me that stapler?" Even if I were
to blurt, "Give me that stapler!"---a significantly ruder way to say it---my
suspicion is that most people would still give me the stapler, albeit with a
bit of annoyance.

There is some sort of unspoken dividing line for most of us, on the axis of
task size, where tasks to the left of the line will be performed on command and
tasks to the right will be rejected.

One of the devs on my team told me a story at lunch the other day. He used to
work at Barnes and Noble, and as an employee there he was incentivized to sell
memberships to the store. While most of his coworkers simply asked customers if
they wanted a membership, he found much greater success by sharing a few
concrete details up front, particularly if he could offer significant savings
on the purchase the customer was about to make.

Asking someone to make a decision like *Would you like to start a membership?*
is a bit like giving them a homework assignment. It's a decision that requires
gathering more information (i.e. asking, *What are the benefits?*), doing some
analysis, and finally committing to at least a small amount of overhead (e.g.
filling out a form) that the person hadn't originally planned for. For many,
the cost of making this decision pushes it past that unspoking diving line.

```
Tasks I will perform on command             Tasks I will not perform on command
---------------------------------|---------------------------------------------
            |                              |                     |
       Handing you                 Deciding whether to           |
        a stapler                   start a membership           |
                                                          Writing a report
                                                          on War and Peace
```

For the dev on my team, sharing details about the membership with customers had
a dramatic effect because it effectively reduced the size of the task being
assigned---skipping the information gathering and some of the analysis (e.g.
*This will pay for itself from savings on your purchased today alone*)---so
that it moved to the left of that line.

I'll share another anecdote. Recently one of the engineers on the Bitbucket
switched over to the security team. One day, in this new role, he started
conducting some testing against our staging environment, causing some
disruption to the team. When asked to stop, he reached out to the leader of the
DevOps team to inquire when would be a good time to conduct his tests against
the staging environment. The answer he got: *Never*.

See the similarity? *When can I run these tests that might cause some
disruption?* is a bit like *Would you like a membership?* The answer requires
data gathering and analysis, which the person being asked may not have time to
perform. The way to get people to say yes in these situations is to do that
data gathering and analysis _for_ them, so that the cost of the decision you're
asking them to make is much smaller[^cost-of-decision].

Here's another way of framing the lesson here. Sometimes *No* or *Never*
doesn't mean *No, you can't do that*; sometimes it means *No, I won't invest in
making that decision right now* (in other words: *No, I won't do that homework
assignment*). Be aware of that, and account for it by doing the legwork: make
a concrete proposal, explain the benefits, show that _you've_ done the
homework. In doing so you can make it easier and easier for someone to say yes,
just like handing over a stapler.

[1]: /posts/published-in-60-minutes.html

[^not-your-boss]: Unless I _am_ your boss, in which case... I'm going to need you to read *War and Peace*.

[^cost-of-decision]: And for the record, I believe that's exactly what happened in this case: the former Bitbucket engineer went back and made a more concrete proposal, including what the procedure should be for scheduling some planned testing and informing the appropriate on-call member(s) of the DevOps team.
