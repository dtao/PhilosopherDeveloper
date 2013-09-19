---
title: A boy can dream...
date: 2011-02-24
published: true
---

Well, I've finished an initial implementation of a `ConcurrentList<T>` data structure. It implements the `IList<T>` interface (partially--no `Insert`, `RemoveAt`, etc.--it is an append-only structure) and is both **thread-safe** and **lock-free**.

(I also came up with a few different ways to resolve the `Count` issue mentioned in my previous post; what I've settled on for now is basically the most obvious and straightforward version.)

The source code for the class itself is available to view in my GitHub repository here:

[**Check out the source code.**](https://github.com/dtao/ConcurrentList)

Now for the somewhat disheartening part: thus far, based on my own performance benchmarks, I see little evidence that this actually outperforms a simple `List<T>` with synchronized calls to `Add` (using, e.g., a `lock` statement). So that's a bit disappointing. But I figured I'd share the source code, in case some hackers out there might be able to figure out how to make it better.

Also, I feel like part of the issue I may be having is that it's tough to really create a lot of thread contention on a puny little laptop with such a lightweight method (I'd wager `List<T>.Add` couldn't be much more than 10 lines). So maybe if this could get tested on a 32-core server somewhere, the results would be more noteworthy. I don't know!

Anyway, at least it passes the unit tests. That's got to be worth something, right?
