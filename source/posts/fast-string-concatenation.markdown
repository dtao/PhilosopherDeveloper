---
title: Fast String Concatenation
date: 2012-06-11
published: false
---

There are a couple of "bigger" topics that I've been wanting to write about lately (not big as in
*important*, of course---more big as in being more work to write about); but I can't seem to find the
time (read: make the effort). So here's a fun little challenge for now.

The background is that I recently discovered an interesting performance optimization in Chrome. It
has to do with concatenating strings in JavaScript. Those of us with backgrounds in Java or C# will
immediately recollect the hard lesson we've all learned at some point (and those of you who haven't
yet: you are about to!) about concatenating strings with `+=`:

    function String joinStrings(List<String> strings) {
        String joined = "";
        for (String str : strings) {
            joined += str;
        }
        return joined;
    }

I would wager we've *all*, at some point or another, written a function similar to the Java snippet
above. Maybe it was when we were in class; hopefully it wasn't while we were writing production
software where performance is a major priority. In any case, sooner or later, every developer finds
out that the code above is extremely inefficient 