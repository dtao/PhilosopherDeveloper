---
title: Put the browser in a bubble with Truman.js
date: 2013-09-18
published: false
---

So 2013 is shaping up to be the year that my repertoire of open source projects balloons completely out of control. My cycle of coming up with an idea, spiking it out[^spiking], and moving on to the next thing has been pretty dizzying, even for me. Clearly, as my wife is always kind enough to remind me (yet I keep seeming to forget), I just need to pick one thing (or, at least, just a *few* things) and stick with it.

Well, at least writing about some of the stuff I've been working on may help sift the more worthwhile stuff to the top. (Then again, I've resolved to write more about my open source work before. Whatever--I'm resolving even harder this time!)

Enough preamble. Let me tell you about one of these many projects I'm whining about.

Background: the lonely front-end
--------------------------------

Recently there was a stretch of time when I was away from the office for a while (because of [this](https://twitter.com/dan_tao/status/372824376862720000/photo/1)) and I needed to work on a new application. Because I was away--and at Google you can't access most of the engineering infrastructure outside the network--I was restricted to focusing just on the front-end. But this front-end would involve a lot of calls to an as-yet nonexistent back-end. So what was a guy to do?

There are typically a couple of approaches here, neither of them very good (in my humble opinion).

The first approach is to implement a stub back-end, that either does nothing and returns fake data or just does something really naive, like store whatever it's given to an in-memory collection with no validation. This can be pretty easy to throw together quickly and it provides *just enough* functionality to allow front-end development to move forward. However, I don't like it because it requires throwaway code. For instance, if I were to go this route I would probably use something like [Sinatra](http://www.sinatrarb.com/); but at work I know the back-end has to be Java[^has-to-be-java], so there's no opportunity for code reuse, even if I *wanted* there to be.

Another approach, which is even worse, is to implement some sort of API abstraction layer in JavaScript and attach it to a fake back-end placeholder initially. This is really the same approach as the previous one, only with the dummy logic residing client-side rather than server-side. But I say it's worse because it increases the complexity of the application *just so you can develop the parts in a certain order*, i.e., front-to-back. So at the end of the day--after you've actually built the *real* back-end--you have all this abstraction logic that serves no purpose. Which implies that, if I were a responsible dev, I'd refactor it all out. And who wants to do that?

Solution: putting the browser in a bubble
-----------------------------------------

Considering these two approaches, I came up with an idea for a third, which is actually kind of a hybrid of the two. My idea was to put a sort of "bubble" around the browser, so that the client-side logic *thinks* it's interacting with a server-side back-end, but it really isn't. The logic to do this is implemented client-side (so no throwaway Sinatra app) by *directly modifying the `XMLHttpRequest` prototype* (so no API abstraction layer).

![Truman in a bubble](/images/truman.jpg)

Remember [The Truman Show](http://www.imdb.com/title/tt0120382/)? Jim Carrey plays a character named Truman who thinks he's just a normal guy living a normal life, oblivious to the fact that he's in an enclosed area, isolated from the real world, surrounded by professional actors who play his family and friends. That's sort of the idea behind [Truman.js](https://github.com/dtao/truman.js). It allows you to write your front-end with no abstraction layer, writing code that merrily makes requests without realizing they aren't hitting the network.

This involves three main parts. The first is the modification of `XMLHttpRequest` itself, which entails clobbering methods like `open()`, `send()`, and `addEventListener()` and re-defining properties like `readyState` and `responseText`. Truman.js rewires the browser's built-in implementation by replacing the actual network request part with a simple `setTimeout` call to mimic the asynchronous nature of AJAX requests.

The second part relates to figuring out *what should happen* at the send of that `setTimeout` call. Based on the method and URL passed to `open()`, Truman.js infers an endpoint assuming the eventual back-end will expose a RESTful interface. So, for example, `GET /projects` is presumably supposed to return a list of projects, whereas `POST /projects/1` is probably supposed to update the project with an ID of 1. So we're talking about a bunch of routing logic. Eventually, I think it might make sense to expand this so that it can emulate not just RESTful APIs, but any sort of user-defined API. Then again, as I could well end up being the only person who ever uses this library, it might not.

The last part is where Truman.js persists data. Surprise, surprise: it uses `localStorage` to emulate a database. So when your code makes a request to `GET /projects/`, Truman.js pulls the corresponding property from `localStorage`, parses it as JSON, and passes it on to your code. When you post data via `POST /projects`, it does the reverse: parses the data you passed and *adds* it to `localStorage`.

[^spiking]: Anybody know who coined the term *spiking*? If you haven't heard it before, it basically means *prototyping*.

[^has-to-be-java]: And there's *no way* I'm writing a stub back-end in Java!
