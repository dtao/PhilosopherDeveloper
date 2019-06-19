---
title: The Pit of Success
date: 2019-06-19
published: true
---

If you search for "pit of success" (a well-known concept in the software field,
and perhaps in other fields) in Google, the first result is a [blog post on
Coding Horror](https://blog.codinghorror.com/falling-into-the-pit-of-success/)
by Jeff Atwood. In the post, he links to [an MSDN
article](https://blogs.msdn.microsoft.com/brada/2003/10/02/the-pit-of-success/)
by Brad Adams, which as far as I can tell is considered the seminal piece of
writing on the topic (though the term itself was apparently coined by a CLR
architect named Rico Mariani).

Unfortunately, if you visit the above MSDN blog today, you will see that it's
nearly unreadable due to a plethora of rendering artifacts. (My educated guess
is that the MSDN blog network must have migrated from one blogging platform to
another at some point, and the way the content is escaped clearly changed.)
Perhaps this is infuriating to no one but myself; but I view it as a minor
tragedy that such an important piece of writing is, in its current
form[^current-form], so badly misfigured.

Therefore I've taken it upon myself to lovingly restore the original content to
a more readable presentation. Without further ado, I present *The Pit of
Success* by Brad Adams.

> *The Pit of Success*: in stark contrast to a summit, a peak, or a journey
> across a desert to find victory through many trials and surprises, we want our
> customers to simply fall into winning practices by using our platform and
> frameworks.  To the extent that we make it easy to get into trouble we fail.
>
> ---
>
> I had a chance hear Rico Mariani do his stump speech on performance of managed
> code to an audience of very senior technical folks (not sure why they let me
> in)... As a performance architect on the CLR team Rico has a ton of passion for
> how we can change internal CLR details to make performance (more specifically
> workingset) better. He talked about some very cool things we are doing in
> Whidbey around NGen, VTable layout etc for saving a few bytes per type or
> instance.  All very cool stuff.  And in fact we see some fairly substantial
> performance wins in our performance test cases in the lab.
>
> But our experience with in house, real world applications has been that they
> are not realizing this level of performance win.  Why? Turns out their
> performance is dominated by other factors.  The big wins we realized at the CLR
> level are just noise compared to other performance problems in the
> applications.  With just a few days of work our pref team was able to improve
> the performance of one of these in house applications more significantly than
> all the CLR level improvements combined.  Their findings are published
> [here](http://www.gotdotnet.com/team/clr/HeadTraxReport.htm). This is NOT
> because the app developers are a bunch of clowns.  Rather it is because, as
> hard as we tried in V1, there were still some places where the design of the
> platform leads them down the wrong path.
>
> Because he was talking (mainly) to a set of platform folks he admonished us to
> think about how we can build platforms that lead developers to write great,
> high performance code such that developers just fall into doing the “right
> thing”. Rico called this the Pit of Success. That concept really resonated with
> me.  More generalized, it is the key point of good API design.  We should build
> APIs that steer and point developers in the right direction. Types should be
> defined with a clear contact that communicates effectively how they are to be
> used (and how not to).  I am not just talking about the docs and samples
> (although those are good) but in the design of the APIs.  For example, give the
> “pretty” name to the types most developers should use (ie. “Foo” and
> “FooBase”).
>
> A powerful thought, crystallized well... Enjoy.

[^current-form]: I even checked the Internet Archive, and [the earliest snapshot they have](https://web.archive.org/web/20160705182659/https://blogs.msdn.microsoft.com/brada/2003/10/02/the-pit-of-success/), from 2003, still looks terrible.
