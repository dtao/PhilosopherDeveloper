I recently started a JavaScript project called **Lazy.js** that's been getting quite a lot of attention[^a-lot-of-attention]. Essentially the project is a utility library in a similar vein to [Underscore](http://underscorejs.org/) or [Lo-Dash](http://lodash.com/), but with [lazy evaluation](http://en.wikipedia.org/wiki/Lazy_evaluation) (hence the name).

The reason I think the project has been piquing the interest of so many JavaScript developers is that it offers the promise of some truly solid performance, even compared to Lo-Dash (which is itself highly optimized in comparison to Underscore). This chart, a variant of what you'll find on the project's home page, illustrates the performance of Lazy.js compared to Underscore and Lo-Dash on several common operations for arrays of 10 elements each on Chrome:

![Lazy.js performance versus Underscore and Lo-Dash](/images/lazy-performance.png)

You can read more about what Lazy.js does [on the project website](http://dtao.github.io/lazy.js/). In this blog post, I want to write a little bit about how it works, and what makes it different from Underscore or Lo-Dash.

A different paradigm
--------------------

Fundamentally, Lazy.js represents a paradigm shift from the model of Underscore and Lo-Dash, which provide a host of useful functions for what I'll call **array transformation**[^array-transformation]: each function accepts an array as input, does something with it, and then gives back a new array:

![Array transformation](/images/array-transformation.png)

This isn't how Lazy.js works. Instead, what is essentially happening at the core of Lazy.js is **function transformation**[^function-transformation]: each function accepts a *function* as input, stores it, and then when `each(fn)` is called, *uses that function to transform `fn`*.

Let's take `map` as an example. The idea of *mapping* is simple and something we do all the time: (to be continued)

[^a-lot-of-attention]: For me, anyway--as of the time I'm writing this, it has [865 stars on GitHub]((https://github.com/dtao/lazy.js)!

[^array-transformation]: I [don't have a C.S. background](/posts/brushing-up-on-cs-part-1-algorithmic-complexity.html), so I don't know if there's a academic term for these ideas. Probably is.

[^function-transformation]: I started to write *function composition*; but that isn't really it. [Function composition](http://en.wikipedia.org/wiki/Function_composition) is when you have functions *f* and *g* and you put them together to get *(f &sdot; g)(x) = g(f(x))*. This is essentially just taking the result of one function and passing it as input to another, something we computer programmers do all the time.
