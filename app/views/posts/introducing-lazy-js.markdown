Recently, for no particularly pressing reason, I decided to write a new JavaScript library. I had an idea for an [Underscore](http://underscorejs.org/) replacement, which would provide essentially all of the same functions (e.g., `map`, `filter`, `reduce`) but without creating intermediate arrays or doing any eager iteration. I wasn't sure whether my idea would work, or even if it hadn't already been done (for JavaScript). All I knew was that:

- Underscore seems to be the most popular library of its kind among JavaScript developers
- Underscore works by eagerly iterating over collections and creating intermediate arrays

So this new library was, from the beginning, what my former ThoughtWorks colleagues would call a "spike": a prototype, proof-of-concept sort of project.

Is this a new idea?
-------------------

As it turns out, the idea *has* been done, [more](http://linqjs.codeplex.com/) [than](http://fitzgen.github.io/wu.js/) [once](https://github.com/suckgamoni/fromjs) [before](https://github.com/dankogai/js-list-lazy). I should also note that the idea of lazy iteration, while *relatively* novel to the JavaScript world, is hardly new: I myself (and I suspect plenty of other devs) first became familiar with the concept through my experience in .NET, with a technology called LINQ[^funny-thing-about-linq]. So let me just state for the record that I am not claiming to be doing anything groundbreaking here.

That said, I think the results are quite promising, and the response from the JavaScript community thus far ([858 stars on GitHub](https://github.com/dtao/lazy.js) as of the time I am writing this) has been pretty enthusiastic. If I had to guess, I'd say a large part of that is probably due to the really solid performance Lazy.js has demonstrated thus far: the below chart pits Lazy.js against Underscore and Lo-Dash (sort of a spiritual fork of Underscore with some serious performance optimizations) on several common operations for arrays with 10 elements each on Chrome:

![Lazy.js performance](/images/lazy-performance.png)

How does it work?
-----------------

The paradigm of Lazy.js is very different from that of Underscore or Lo-Dash. Fundamentally, the key difference is that at the heart of Lazy.js, the code **is not about array transformation**; it's about **function composition**.

What do I mean by this? I have a bad habit of making terms up (probably because [I don't have a C.S. background](/posts/brushing-up-on-cs-part-1-algorithmic-complexity.html), so I don't know the academic terms); so let me explain myself.

When I say Underscore and Lo-Dash are about *array transformation*, I mean this. Let's consider the `map` function. In Underscore, if I write:

~~~{: lang=javascript }
var numbers = [1, 2, 3];
var nextSet = _.map(numbers, function(x) { return x + numbers.length; });
~~~

In the above example, essentially what the `map` function is doing is transforming one array--`[1, 2, 3]`--into another--`[4, 5, 6]`--by *mapping* each of its elements to a new value.

And so if we use Underscore to call `map` twice, we're transforming an array twice: once from the original array to a new array, and then again from the new array to yet another new array.

With Lazy.js, you don't transform arrays.

~~~{: lang=javascript }
var numbers = [1, 2, 3];
var nextSet = Lazy(numbers).map(function(x) { return x + numbers.length; });
~~~

Now *this* time, instead of transforming `numbers` into a new array, we've created a `Lazy.Sequence` object. How is that different?

A `Lazy.Sequence` is not quite like an array. For one, it isn't pre-populated with values. It doesn't necessarily have a `length` (though it might). What it *does* have is an `each` method, which behaves quite a bit like `_.each` from Underscore: you pass it a function, and it calls that on every "element" in the sequence.

Now here's where the divergence occurs. Like I said, Lazy.js is about function composition. Using Underscore, if you call `_.each`, the function you pass it will be called on values that are stored in an array. That array may or may not be the result of several transformations; it doesn't really matter, because an array is an array is an array. With Lazy.js, `each` does not necessarily apply to an array.

[^funny-thing-about-linq]: This is actually kind of funny, because LINQ stands for "Language-integrated query syntax"; it does not explicitly have anything to do with lazy evaluation. It just so happens that the LINQ libraries are implemented in .NET using lazy evaluation (or deferred execution); but they could have easily been implemented the same way as Underscore instead.
