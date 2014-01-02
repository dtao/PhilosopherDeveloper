---
title: Testing private methods
date: 2014-01-02
published: true
---

I'm currently working on a library called [Autodoc](https://github.com/dtao/autodoc). It serves multiple purposes[^multiple-purposes], one of which is to make testing your JavaScript code dead simple. Here's an example of how you use it:

```javascript
/**
 * Checks if a number is even.
 *
 * @private
 * @examples
 * isEven(2) // => true
 * isEven(1) // => false
 */
function isEven(x) {
  return x % 2 == 0;
}
```

Now, one of the features of the library is that it even lets you test "private" functions, meaning functions your library doesn't expose (hence the `@private` tag in the above example). To me, this is a very useful feature.

Well, apparently not everyone feels that way. This recently happened on Twitter and it got me feeling a bit defensive:

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/search?q=%23autodoc&amp;src=hash">#autodoc</a>: &quot;Hey, this function is private but I want to test it anyway.&quot; ... <a href="https://twitter.com/search?q=%23sigh&amp;src=hash">#sigh</a> NO</p>&mdash; derickbailey (@derickbailey) <a href="https://twitter.com/derickbailey/statuses/418753130965106688">January 2, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

A quick [Google search for "Should I test private methods"](https://www.google.com/search?q=should+i+test+private+methods) found mostly variations on a single argument. Hopefully I'm not taking too much liberty in paraphrasing the argument as follows:

1. Private methods are implementation details and shouldn't be tested
2. If a method *does* need tests, it should be public (and potentially refactored into a separate class)

To me this line of reasoning is perfectly fine as a general rule of thumb, which I'm sure applies in a lot of cases. That doesn't mean I accept it as universal.

Rather than make a direct counter-argument, let me instead examine a real-world example from my own code, to hopefully illustrate where I'm coming from.

My most well-known library, [Lazy.js](https://github.com/dtao/lazy.js), includes several functions that involve *uniqueness*; e.g.: `uniq()`, `union()`, `intersection()`. For these methods Lazy internally uses a custom `Set` class, which is private[^private-in-javascript]. It's private because---in my opinion---it simply doesn't belong as part of the library's public API. However, it also has tests, because it's a sufficiently complex piece of functionality that I want to ensure works properly.

Let's consider the possible angles from which a member of the don't-test-private-methods school of thought might say this is wrong.

**You should make `Lazy.Set` public**

I disagree. As a library, Lazy is about composing functional transformations into sequences. It makes no promises of providing any specific data structures. To expose one would be to bloat the API with noise or "mass" that distracts from the library's core purpose.

Aside from bloat, though---which is arguably mostly an aesthetic matter---there is the issue of responsibility. If I expose a class from my library, then I should reasonably be expected to document and support that part of the API, to the point where removing it would break backwards compatibility and warrant a [major version change](http://semver.org/). For something that conceptually doesn't fit with the rest of the library to begin with, I think that would be silly. Better to keep it private and reserve the freedom to remove it completely if I come up with a different implementation altogether.

**Fine, but then create a separate `Set` library and depend on that from within Lazy**

An open source JavaScript library is much more convenient and accessible to developers if it has no dependencies. Imagine if in order to use lazy.js you needed to require a separate set.js file first.

Now, that isn't to say that I shouldn't *copy*[^copy-pasta] the `Set` code to a separate project and share that, while redundantly keeping the same code in Lazy. I would maybe *consider* that, but my motivation to do so is quite low since [there are already set libraries out there](https://github.com/component/set). I would still keep the code for `Set` within Lazy.

**You could create a separate `Set` library but pull it into lazy.js as a build step to keep zero run-time dependencies**

Yes, I could do that. I'll be honest, though; to me that just sounds like an overly complicated solution with almost no payoff given the points I've already made. I mean, seriously, what would be the *actual* benefit to doing that, aside from quelling some inner OCD?

There would also be obvious downsides to this approach, beyond mere complexity (which is a big enough downside on its own). For one, this would almost certainly cause confusion among developers. I might receive a pull request within Lazy to modify the Set class and have to redirect the submitter to a separate repo. For what? Again, other set libraries exist.

**Well, you still shouldn't need to write tests for `Set` directly; just test the publicly exposed sites where it's used**

I personally find TDD to be a very helpful technique (sometimes). For me, writing some tests, implementing a bit, writing more tests to cover the corner cases, and buliding up as I go is a powerful workflow. So this is how I implemented the `Set` class within Lazy, and it's something that Autodoc facilitates really nicely.

Let's imagine I followed this advice and said, "OK, since `Set` is private I shouldn't be testing it because it's an implementation detail. The tests for `uniq()`, `union()`, etc. should cover it." To me this is basically disregarding the whole point of unit tests. The further downstream you catch a bug, the more time you waste on troubleshooting.

**TDD is fine; but once you've figured out your implementation you should delete the tests**

Honestly I doubt anyone would seriously say this. It's just the last thing I can think of someone suggesting in this imaginary conversation. To which I could only respond by throwing my hands up in the air and going with "Let's agree to disagree."

## To test or not to test

Suppose you're building a car. This is obviously a complex piece of machinery. Perhaps you've developed some custom parts that go inside the car. And suppose I were to say, "Don't test those parts." You would say, *What? Why noy?* I might say, "You should know they function properly as long as the car drives correctly." That would be silly: you'd be setting yourself up to catch potential problems much further downstream than necessary. I might say, "If these parts are sufficiently complex then you should actually start up a separate business selling them directly." That would also be silly. They're not *so special* as to warrant an entirely separate business. However, I also don't want to rely on an external vendor for similar parts.

I think having custom parts, that I don't sell directly, is fine. And I think testing them is just smart.

In the end I say: if you have small, testable pieces, then test them. You are only doing yourself a favor. Whether or not those pieces are private is a totally separate matter.

If somebody says, "don't test private functions," maybe he/she is speaking from valid experience that applies in some cases. Maybe they've seen a lot of private code that should actually be refactored, exposed, and tested properly. Maybe they've seen a lot of tests for trivial implementation details that provide no real value. Neither of these kinds of experience are all-encompassing. Nor should the ensuing "don't test private methods" dogma be applied as a blanket rule to all software development.

[^multiple-purposes]: Arguably it does more than it should, actually. But then *doing a lot* is sort of the point.

[^private-in-javascript]: Of course JavaScript doesn't have a `private` keyword; what I mean is the class isn't exposed in any way to consumers of the library.

[^copy-pasta]: *Gasp!* Copy source code?! Well, in this case it would be either that or nothing. If you have a strong argument against what I'm saying, which takes into account the points I'm making, leave a comment and let me know!
