---
title: The audacity of prescription
date: 2013-11-18
published: false
---

I recently wrote a protip on Coderwall called ["Bootstrap without all the debt"](https://coderwall.com/p/wixovg) and it got a *lot* of views[^lot-of-views], mainly thanks to [Hacker News](https://news.ycombinator.com/item?id=6740324). Of course, with the HN link came a lot of very opinionated readers, among them some who seemed to think I was saying something a lot more controversial than what I *thought* I was saying. My wife and I are currently home on the east coast visiting our families for the holiday; and so though I've noticed a steady trickle of comments being posted---mostly positive, but some rather critical---I haven't spent any time responding to them just yet.

Well, at the moment I find myself with a little bit of down time; so why not write out my thoughts?

What's this about Bootstrap?
----------------------------

For the record, or if you didn't already read it, here's the gist of my protip. (Feel free to skip the following few paragraphs if you aren't interested, as they are only tangential to the rest of this post.)

There is a project called [Twitter Bootstrap](http://getbootstrap.com/) that has become very popular among web developers. It makes it easy to create a site with an attractive albeit cookie-cutter design quickly, without being an expert in CSS (the primary language used in most web design). Since its rise in popularity, many experienced developers have observed that it can be a double-edged sword, making it easy to get started but then boxing you into a restrictive paradigm, both creatively (by getting you to think in terms of Bootstrap design elements) and technically (by becoming entrenched in your HTML).

My opinion is that, given the first concern---the risk of starting to view the world through Bootstrap-tinted glasses---the best way to use Bootstrap on a major project[^on-a-major-project] is either (a) not at all, or (b) only a little, in the beginning, to get some nice-looking pages put together before embarking on the journey of a custom design (or researching another framework that might be a better long-term investment). I think the approach I describe in my protip is really for developers pursuing the second option: they want to use Bootstrap to make their site look decent, but they don't want to be stuck with it in the long term (which is why my closing section is titled "Graduating from Bootstrap").

But readers inferred a lot more than this. Some pointed out that CSS selectors can get out of hand when you use SASS's `@extend` directive. Some questioned the inherent value of semantic markup, and implicitly accused me of mindlessly promoting an ideal that died years ago (yikes). Others remarked that the strategy I promote in the protip breaks Bootstrap's JavaScript features.

These are all points worth addressing, at least on some level. They also bug me, mostly because they strike me as [straw man](http://en.wikipedia.org/wiki/Straw_man) arguments. I did not promote the approach in my protip as a smart long-term strategy for site design---just the opposite---nor did I make any claim about semantic markup being inherently good or a worthwhile goal in and of itself. I just described a *technique*, that *can* be useful, in some scenarios.

Then again, regardless of the merits of my silly protip, or of any of the comments in response to it, the simple truth is that I, like almost anyone, get defensive when I feel I'm being criticized.

[^lot-of-views]: Man, I wish any posts on this *blog* would get 50k+ views!

[^on-a-major-project]: On the other hand, on a *small* project, many of the concerns associated with major projects (for some definition of *major*, which I won't bother to formalize) are much less applicable. If you know Bootstrap well, and you're just putting together a small app, I think more often than not it would make more sense to go ahead and use Bootstrap---sprinkling in some custom CSS if you like---than to even *worry* about things like framework lock-in or semantic markup. Those things shouldn't even be on your radar unless the scale of your project is pretty significant.
