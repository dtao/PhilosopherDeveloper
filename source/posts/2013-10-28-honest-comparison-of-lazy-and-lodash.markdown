---
title: An honest comparison of Lazy.js, Underscore, and Lo-Dash - Part 1
date: 2013-10-28
published: false
---

A while ago [I wrote about Lazy.js](/posts/introducing-lazy.js), a new JavaScript library I am developing that offers very similar functionality to [Underscore](http://underscorejs.org/) and [Lo-Dash](http://lodash.com/), with two key differences: **deferred execution** (so sequences aren't enumerated until you call `each`) and a **sequence-based paradigm** for functional map- and reduce-style operations, as opposed to an array-based one.

In [the project README](https://github.com/dtao/lazy.js) I make some bold claims about Lazy's performance potential and include charts implying that the library obliterates the competition. I will be updating those charts in the near future to be a bit less hyperbolic and will also make an effort to clarify some of the differences between Lazy and those other libraries. This post can be considered the start of that clarification effort.

My goal here is to be completely honest. Let me share this quote from Richard Feynman---from the book *Surely You're Joking, Mr. Feynman!*---which I will use as my inspiration in exploring the differences between Lazy and its competitors.

> It's a kind of scientific integrity, a principle of scientific thought that
> corresponds to a kind of utter honesty---a kind of leaning over backwards.
> For example, if you're doing an experiment, you should report everything that
> you think might make it invalid---not only what you think is right about it.
> *[...]*
> 
> Details that could throw doubt on your interpretation must be given, if you
> know them. You must do the best you can---if you know anything at all wrong,
> or possibly wrong---to explain it. *[...]*
> 
> In summary, the idea is to try to give *all* of the information to help
> others to judge the value of your contribution; not just the information that
> leads to judgment in one particular direction or another.

So I will do my best to be particularly careful in pointing out things that Underscore and/or Lo-Dash do *right*, as well any problems I currently have or foresee with Lazy. (Of course, where these problems exist I will also explore possible solutions.) More for the sake of having a focus than anything else, I will be primarily talking about performance; so practically speaking this whole discussion will concentrate primarily on Lazy and Lo-Dash (since Underscore does not prioritize performance, or at least doesn't appear to).

Underscore and Lo-Dash: The Good Parts
--------------------------------------

To start with, let me give credit where it's due. I consider **Underscore** to be a very high-quality library. The API is intuitive, and the source code is nice and clean. In fact---though this is just a guess on my part, as I don't know the author of Underscore personally---it seems to me that simplicity and conciseness are key goals for Underscore, which would explain why the library is not very competitive on performance with either Lazy or Lo-Dash: performance is not a major concern.

That said, I consider**Lo-Dash**---which is *almost*[^almost-a-superset] a pure superset of Underscore---to be a superior library, for several reasons. Its performance is basically across-the-board faster, despite the fact that its author, [John-David Dalton](https://twitter.com/jdalton), has decided to downplay that factor lately[^eased-up-on-the-performance-focus]. The code is more complex---and for this reason I certainly do believe Underscore's existence is justified, for those less tolerant of complexity and clever tricks---but it is also well tested, for both functionality and performance.

Lo-Dash also provides modular builds, tailored to all kinds of scenarios. There's a build that provides optional support for older browsers; there's an Underscore compatibility build, etc. *And* it offers more functionality than Underscore (hence "superset"): a more intuitive chaining syntax, deep cloning of objects, function currying---the list goes on.

So Lo-Dash is really good. Underscore is quite good as well, in its own way, though my preference is clear. I still think Lazy is better---or at least, it has the potential to be. As a much younger library, of course it is lacking in some respects. (For example, the [documentation](http://danieltao.com/lazy.js/docs/index.html) is not quite as good, and there are some features such as async iteration which are sort of experimental, perhaps a bit buggy, and will probably undergo breaking interface changes before a version 1.0 release.) But on a *fundamental* level, I believe Lazy's paradigm is more generic, more powerful, and conducive to better performance.

Lazy.js versus the competition: Apples and Oranges
--------------------------------------------------

The reason I think Lazy has the potential to be a better library than either Underscore or Lo-Dash comes down to a simple paradigmatic difference. I described this before, in my previous post about Lazy; but I'll try it again: whereas Underscore and Lo-Dash speak the language of *arrays*, Lazy takes a **collection-agnostic** approach to functional transformations.

All of the list-based operations in Underscore and Lo-Dash take arrays as arguments. `map` takes an array and applies a transformation to its elements. `filter` (or `select`) takes an array and skips over some of its elements. `zip` takes two arrays and joins their elements as pairs.

Lazy knows how to do these things with arrays too. But it doesn't need arrays. You can `map` the characters of a string. You can `filter` over a sequence of DOM events. You can `zip` together the lines from two separate files as you read each from a stream (in Node.js).

Likewise, the majority of methods in Underscore and Lo-Dash *return* arrays (or values, e.g., `reduce`). Lazy doesn't create an array unless you call `toArray` on a sequence. So it's tempting, if you're writing some benchmarks to compare the performance of Lazy to Lo-Dash (for example), to tack `toArray` to the end of the Lazy code to get an "apples-to-apples" comparison.

This isn't really fair to Lazy. Most of the time, you wouldn't actually call `toArray` using Lazy at all; you'd call `each` and iterate over the results of applying some transformation(s) to a sequence. The approach I recommend---calling `each` instead, with some low-cost operation like `noop`---feels a bit unfair in the other direction: in this case, Lo-Dash has to iterate over the source array, create a new array, then iterate over the new array. Whereas Lazy just performs one iteration.

But I actually think this isn't unfair at all. In fact, **this is the whole reason I think Lazy is fundamentally better**.

[^almost-a-superset]: I believe there are some areas in which Lo-Dash deviates from Underscore; 

[^eased-up-on-the-performance-focus]: If you visit the Lo-Dash website, you'll see it currently lists "consistency" and "customization" ahead of "performance" as the key selling points. I believe it used to list performance first.
