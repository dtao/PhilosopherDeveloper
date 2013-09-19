---
title: Garbage, garbage everywhere
date: 2011-02-16
published: false
---

Today I want to respond to a comment that was left on a previous post with regard to the following LINQ query:

~~~{: lang=vbnet }
For Each prod As Product In Products.Where(Function(p) p.IsQuoting).OrderBy(Function(p) p.Expiration).ThenBy(Function(p) p.Strike)
    prod.SendQuotes()
Next
~~~

What's wrong with the above code? In most cases, **nothing, really**. It gets the job done in a somewhat obvious way, in a some readable line of code.

That's *most* cases. But most cases don't take performance into consideration; and you may recall, in [the post in question](/posts/tempted-by-linq.html), I was specifically talking about performance.

In order to understand the performance impact of that code, it's necessary to first understand **garbage**.

Back in the early days of computer programming, whenever a developer *allocated* some memory in code, he or she was responsible for also *deallocating* it.

This actually made for some pretty lean code. Imagine it like a society in which every citizen always deals with his or her own trash: rather than have collectors who come through on a regular basis, this society's members all dispose of their own trash in one way or another. In an ideal world, this society would enjoy significant savings as a result of not needing to invest in the infrastructure to deal with trash on a large scale.

However, in the *real* world, such a society would almost certainly have a huge trash problem, since **not every member of society is a responsible citizen**. In software terms, not every program always deallocates its memory perfectly. This often results in what is referred to as a [memory leak](http://en.wikipedia.org/wiki/Memory_leak).

Developers using platforms like Java (JVM) or .NET (CLR) have this fanciful notion in their heads that *memory leaks can't happen on my platform, because my language is garbage collected!* This is not entirely true to begin with (in .NET, at least, [memory leaks are very possible and potentially very costly](http://developers.slashdot.org/story/07/11/17/0552247/C-Memory-Leak-Torpedoed-Princetons-DARPA-Chances)); but more importantly, it's just **a bad attitude to have**. When you believe that you can just do whatever the heck you want because your language is garbage collected, chances are you're going to end up writing some pretty inefficient code.

For those of you who may not know what [garbage collection](http://en.wikipedia.org/wiki/Garbage_collection_(computer_science)) is in software, it's pretty much what it sounds like: a process whereby a system will "clean up" the memory allocated by a program after that memory is no longer in use, *without requiring software developers to do this themselves*. So a language with garbage collection (e.g., C#) is like a society in which individual citizens do *not* concern themselves with disposing of their own waste. In other words, it's like *our* society, which does have garbage collectors who handle *everyone's* garbage.

Now consider this: whether or not a society expects its *individual citizens* to deal with their trash, or it expects *garbage collectors* to, there's still **garbage to be dealt with**. And that is, no matter how you spin it, a cost.

*What the heck does this have to do with that LINQ query?* I'm glad you asked. Let's look at that first line again:

~~~{: lang=vbnet }
For Each prod As Product In Products.Where(Function(p) p.IsQuoting).OrderBy(Function(p) p.Expiration).ThenBy(Function(p) p.Strike)
~~~

How much garbage does this code create? I will count the throwaway objects:

1. An enumerator to iterate the results of the `Where` call.
2. A delegate object to execute `p.IsQuoting` on every iteration.
3. Another enumerator to provide access to the result of `OrderBy`.
4. Another delegate object to call `p.Expiration` for each iteration.
5. *Another* enumerator to iterate over the results of `ThenBy`. This enumerator will need to store its own intermediate collection of `Product` objects, since it has to sort them and iterate over them in sorted order based on `p.Expiration` followed by `p.Strike`.
6. *Another* delegate object to call `p.Strike` for every iteration.

See that? That's **6 objects**, not including the intermediate collection of `Product` objects requiring sorting prior to iteration in the `For Each` loop.

To put this in perspective: **the above code *could* be written without requiring *any* new object allocations**, with the possible exception of the intermediate collection (depending on whether or not the sort from `OrderBy`/`ThenBy` could be in-place).

To me this is sort of like this: say you have a bowl of pasta for lunch every day. You could use the fork and bowl you have in your kitchen drawer for every bowl, *or* you could use a different throwaway paper bowl and plastic fork *every time you eat this meal* (every day).

Which would you choose?

***

For the record, here's how you could do the same work with no garbage:

~~~{: lang=vbnet }
' Initialization code somewhere--
' Let's say this ProductComparer class encompasses the OrderBy/ThenBy logic.

' I am not counting this as garbage, because the cost would be incurred ONCE,
' as opposed to every time the below code executes.
Dim comparer As New ProductComparer
Products.Sort(comparer)

' Now here's the clean, garbage-free code.
' (OK OK, there is still possibly an enumerator object...
' then again, there might not be; e.g., if Products is a List(Of Product),
' then its enumerator will actually be a value type which does not create
' garbage.)
For Each prod As Product in Products
    If prod.IsQuoting Then
        prod.SendQuotes()
    End If
Next
~~~
