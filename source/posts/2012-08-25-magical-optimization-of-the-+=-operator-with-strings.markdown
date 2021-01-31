---
title: A magical optimization of the += operator with strings
date: 2012-08-25
published: true
---

Today I felt like writing something more low-level than I've written in a while... and since C# is about the lowest I go (yeah, pretty sad---I haven't really earned my beard yet), that will be my language of choice for this post.

But we start with JavaScript, actually. A couple of months ago, shortly after joining [Cardpool](http://www.cardpool.com/)--a topic *definitely* deserving of its own post, in due time---I started working on a top-secret new project. Without giving too much away (as if it really matters), I'll just say that my work on this project involved writing a library to process a sequence of data from an input device which emulated a computer keyboard. Essentially this input sequence would ultimately be interpreted as a string; but unlike your typical scenario of taking user input from, e.g., a text field---where the string is given to you all at once---in this case the library had to *assemble* the string from bytes fed to it one-by-one.

In a language like Java or C# (or even Ruby), this would be totally easy, albeit unconventional. The data structure for a string is [more or less](/posts/are-strings-really-immutable-in-net.html) immutable in Java and C#, but both have the concept of a mutable `StringBuilder` for precisely the case where you need to construct a string by concatenating many segments. And in Ruby, strings are mutable to begin with (you use the `<<` operator to append to an existing string).

But this library I was working on was in *JavaScript*--a language that I love, but one without any specialized options for concatenating strings quickly. JavaScript strings are immutable, and there is no concept of a `StringBuilder`. If you want to concatenate many strings together, you have two options:

- The good ol' `+=` operator
- Storing the elements in an array, and then calling `join()`

Before bothering to profile anything, here was my guess: I figured that on small strings, the two options would be roughly equivalent. But given that strings in JavaScript are immutable, I assumed that even on modern browsers the array-based concatenation strategy would prove superior pretty much across the board. That would make sense, right?

To my surprise, after [profiling the two options on a variety of browsers](http://jsperf.com/concatenating-lots-of-little-strings/2), I found that the `+=` operator beats the pants off the array method on Chrome.

![The performance of += on Chrome is pretty astonishing](https://i.imgur.com/wIYN7.png)

*How could this be?* I thought. Given an immutable data structure for strings, it seemed to me any use of `+` would necessitate the allocation of an entirely new block of memory to hold a copy of the original data plus the appended data. The only obvious alternative I could think of was to use some sort of [rope](http://en.wikipedia.org/wiki/Rope_\(computer_science\)), which felt like a totally unwarranted compromise for a language like JavaScript given that it would make random access O(log N) instead of O(1) and would hardly ever be useful (not to mention that appends would still be O(log N), so they almost certainly still wouldn't beat the array method).

Obviously the Chrome developers cooked up some crazy optimization for the `+=` operator; but what *was* it? (Incidentally, it seems that some engineers at Microsoft must have done something similar for Windows 8, since IE 10 shows a similar performance disparity between using `+=` and the array method). It got me thinking: if I were to optimize for this case---and it does make some sense, considering how `+=` is really your only option in JavaScript, or at least by far the most obvious one that JavaScript developers are likely to use---how might I do it?

Well, perhaps the pay-off won't be worth my long-winded exposition thus far. But here's what I came up with. I actually quite like it. (Though to be clear: this is really just a proof of concept, and I would almost certainly not have any use for it in any production code.)

The challenge, just to reiterate one last time, was to create **an immutable implementation of strings optimized for very fast appends using the `+` operator**. I came up with a solution in C#. Obviously the Chrome devs did not use C#--nor did the Microsoft devs, for that matter---but I'm sure they could have taken a similar approach in whatever language they used. I'm not saying they *did*--chances are their solution is much smarter than mine---just that they *could* have.

The Basic Idea
--------------

Here's what I came up with. For starters, I needed to forget about what a string "is"--or anyway, what my notion of one was prior to thinking about this optimization: as a particular *data structure* comprising a contiguous sequence of characters---and focus on the *concept* of a string, which I would say is more closely related to *the interface it provides*: random access to such a sequence, along with the total length of the sequence. From these basic building blocks all other aspects of a string's interface can be derived: iteration, substring operations, replace, search, the whole shebang. (If you think about it, you could actually implement the entire interface for, say, .NET's `System.String` class using only an `IList<char>` as the backing data structure. But I'll leave that to you as an exercise.)

Fine, so you're with me so far. I'm sure most of you already knew that anyway. But what does this shift in focus give us? Essentially, it allows us to conjure **an immutable *concept* with a mutable *data structure* underneath it**. And this is the basis for [my `FastString` class](https://gist.github.com/3471636).

The Implementation
------------------

At the heart of a `FastString` object there are two parts: `buffer`, an underlying `StringBuilder` (the mutable data structure underneath), and `length`, an integer. In addition to these fields, there is the concept of **buffer ownership**: if a `FastString` has the same length (not to be confused with *capacity*) as its buffer, that means it is the "owner" of the buffer:

```csharp
private bool OwnsBuffer
{
    get { return this.buffer.Length == this.length; }
}
```

Now, the idea here is that if you use `+` to append to a `FastString`, two things can happen. If the `FastString` is the owner of its underlying buffer, that means that you can safely append directly to the buffer. This is because no other `FastString` instances can be referencing any characters past the current end of the buffer, and so the immutability of every existing instance is maintained. Then the `+` operator returns a new `FastString` instance pointing to the same buffer but with the new length. At this point, this new instance becomes the buffer's new owner.

It is a bit of a strange approach, I grant you. But it is perfect for a particularly common use case: concatenating many strings in a loop:

```csharp
FastString whole = "";
foreach (string part in parts)
{
    whole += part;
}
```

Here, every time a new `FastString` is instantiated via the `+=` operator, the previous owner (which is essentially discarded in the above loop) cedes ownership and the new instance inherits it. Notably, this will have the same performance characteristics as using a `StringBuilder`, because, after all, that's basically what it is doing. But the proof is in the pudding: here's example output from a sample run concatenating 20,000 strings:

    Finished concatenating 20000 strings the 'fast' way in 2.7935 ms.
    Finished concatenating 20000 strings the 'slow' way in 4832.8853 ms.
    Output equal? True

A **1730x** speed-up? I'd say that's not bad! (And this would of course only increase as the number of strings increased---since the `FastString` approach should have amortized O(1) complexity versus the O(N) that `String` provides.)

Is this what the Chrome devs did? Like I said, I doubt it. I would actually be very curious to know what approach they used. (I'm guessing that since I don't have much experience in lower-level languages than C#, there are probably a whole collection of tricks I would never even think of.) And if *you* can think of any other optimizations, leave a comment and let me know!

Anyway, as I wrote already, this is not really useful in any real-world application I can imagine. But it was a fun challenge to take on, and I hope it was interesting to read about. Also, it's nice to write about something relatively low-level (at least compared to my usual fare) every once in a while. This is the stuff that got me into programming in the first place.

But that's the topic of another, much higher-level post. Speaking of which, I should probably write soon about a couple of fairly major events in my personal and professional life:

1. Leaving ThoughtWorks
2. Graduating from CMU

Let that be a reminder to myself, for next time.
