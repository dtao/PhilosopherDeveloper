---
title: Ghost clicks in jQuery Mobile
date: 2011-11-01
published: true
---

I know it's been a long time since I've written (*especially* for someone who's repeatedly claimed he will write daily posts). I've got some more substantial ideas to discuss in the near future (honest!)<strike>, but this particular post is going to be a short one</strike>. \[Correction: this post ended up being kinda long.\]

On my current project we're in the process of wrapping up a mobile website we built using [jQuery Mobile](http://jquerymobile.com/). One issue we encountered during development was that on certain pages, a strange "ghost click" behavior was observed: the user would click a button, the page would change, and then a button on the destination page (positioned at the same location as the original button) would seem to be automatically clicked as if the user had clicked twice—or as if a *ghost* had clicked it.

It turns out that this is a known issue for mobile web browsers, which [Google wrote about back in January](http://code.google.com/mobile/articles/fast_buttons.html). In the article, Ryan Fioravanti explains that most mobile browsers introduce a delay of ~300 ms before every `click` event, for the reason that they want to account for the possibility that the user might be double-clicking to zoom in on the page. So what can happen on a mobile web project this:

- Someone notices that the UI seems sluggish. In particular, clicking on buttons feels very slow.
- A developer looks into the problem and finds that the issue can be mitigated by handling an event other than `click`, such as `touchstart` (jQuery Mobile has a `vclick` event[^vclick-event]).
- Now that the clickable element in question handles a non-`click` event, when it is clicked, **there is still a `click` event waiting to be triggered within the next ~300 ms**; and so if a page change occurs, an element on the next page could very well be ghost-clicked.

It's worth noting that this behavior is also found in *any* software that supports double-clicking, including basically every popular desktop OS. The *difference* is in the **time interval**: it's far easier to click twice quite rapidly using a mouse (or touchpad) **with your pointer finger** than it is to tap twice quickly on a touchscreen **with your thumb**. My understanding is that on Windows, for example, the lag time for double clicks is somewhere in the vicinity of 70 ms (don't quote me on that), which is relatively imperceptible for most people, as our [reaction time](http://en.wikipedia.org/wiki/Mental_chronometry)—and hence the time it takes us to notice things—is [apparently something like 200 ms](http://www.humanbenchmark.com/tests/reactiontime/index.php). (Mine is a rather embarrassing 250 ms. Then again maybe that's just because I'm running low on coffee.)

But 300 ms is actually a noticeable period of time. And so this delay introduced by mobile browsers dooms websites that rely exclusively on the `click` event to feel slightly less responsive than those that explore other means of handling clicks. This is especially frustrating to developers as it is *only* reproducible on actual devices, not in simulators and therefore not in automated acceptance tests.

It would actually have been nice if mobile browsers supported an option to disable this click delay. After all, the whole reason the delay is there in the first place is to support zooming in, which doesn't really make sense for sites with interfaces designed for mobile devices in the first place (such as sites using JQM). Maybe at some point in the future browsers *will* come to support this option.

In the meantime, ghost clicks are something to be aware of. For the purpose of improving perceived performance, I still recommend finding alternatives to the `click` event such as JQM's `vclick`; but when these alternatives end up introducing ghost clicks, the fastest fix is simply to go back to `click` for the offending element(s).

[^vclick-event]: If you look at the source code for jQuery Mobile, you see that they actually tried to implement a "ghost click buster" much like Google suggests in the article. While I can't comment on this in much detail, based on our experience on my current project their valiant efforts appear to be fairly unreliable. That is, avoiding the ghost click by any means other than simply handling `click` after all is not so easy.
