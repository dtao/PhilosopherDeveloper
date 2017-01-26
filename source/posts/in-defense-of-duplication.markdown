---
title: In defense of duplication
date: 2017-01-21
published: false
---

Most software engineers are taught to think of *duplication* as a bad thing. Duplicated code is synonymous with sloppy work. Similarly, "duplicated effort" between two engineers or two teams is treated as a worrisome sign of a project being poorly run.

In part I think this is because we value order, and duplication is associated with chaos. In a well-ordered system we expect to find purposeful components with clearly defined responsibilities. If you have two components that do the same thing, where in some places you use one and elsewhere you use the other, that's chaotic. Similarly if you have two teams working on services that provide the same functionality, that's inefficient.

A common scenario we all have mentally teed up to explain this aversion is this. Say there's some common bit of logic you find yourself implementing in several places in whatever software you're building. Being a good engineer, you write a reusable function to encapsulate this logic; now you simply call that function whenever it's needed. Later on, you realize there's a better way to implement it. You update the function *in one place* and voilà, you just got a performance improvement everywhere! Still later you discover a bug in the code. Fortunately you are able to fix it quickly, and once again you get to experience the satisfaction of seeing that bug get fixed *everywhere* at once!

But wait. The bug was only *in* many places to begin with because of your efforts to reduce duplication: that reusable function you wrote. Oh well. Most of us would agree the pros outweigh the cons in this situation. After all, one bug to fix in one place is better than lots of bugs in lots of places!

