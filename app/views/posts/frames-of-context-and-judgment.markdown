I recently had a brief[^and-i-mean-brief] online exchange with [Matt Copeland](http://matthewcopeland.me/), a former coworker at ThoughtWorks, about the website [shouldiuseacarousel.com](http://shouldiuseacarousel.com/). It's a fun little site presenting several bullet points against the use of carousels (rotating banners) in website UIs[^irony].

I'm no designer or UX expert. Experience has shown me that I *do* seem to take a greater interest in frontend-y stuff than most other developers I work with; but that's a far cry from someone with expertise in user experience. Still, when Matt first posted a link to the carousel-bashing site I found myself responding skeptically. (To be fair, maybe that's because I respond skeptically to pretty much everything that exists in this world.)

Judgments require context
-------------------------

Consider this point:

![A point with no context](/images/point-without-context.png)

Where is it? To answer that question we need some frame of *context*, or reference. For example, we could define a plane that the point lies in, with X and Y axes. Let's do that:

[!A point on a coordinate system](/images/point-on-coordinate-system.png)

Now we have context. The point is at (5, 5).

Contexts can be changed
-----------------------

But wait, is the point really at (5, 5)? Or is it just *somewhere*, and we overlaid a set of axes on top of it? Clearly--in this case at least, since I'm the one writing this!--it's the latter. We could just as easily draw the context like this:

[!Same point, different coordinate system](/images/point-on-different-coordinate-system.png)

Now the point is "at" (100, 100).

The lesson here is that the context we bring to something affects how we perceive it. This example was abstract, but the principle applies to all kinds of things. But we all know that already, right? Sure--but it's easy to forget it, or to fail to recognize where it applies, especially when the "point" is something we feel strongly about.

Back to carousels
-----------------

Whether carousels are generally "good" or "bad" isn't a question I have any ambition to answer. If anything, if the UX community seems to have reached a consensus that they're not worth using, I would tend to yield to that opinion. What I want to point out is simply that this is a case of bring-your-own-context, and that in such cases it's necessary to acknowledge that fact before zeroing in on a judgment.

To be more specific: of the 6 references to information arguing against carousels on [shouldiuseacarousel.com](shouldiuseacarousel.com), 4 of them are explicitly about "clicking" or some other form of user interaction (such as a user "completing a task"). I checked and one of the remaining 2 ([this article on the site WiderFunnel](http://www.widerfunnel.com/conversion-rate-optimization/rotating-offers-the-scourge-of-home-page-design)) similarly appeals to carousels' poor click-through performance. (The other reference I couldn't track down in about 20 seconds of Google searching, so I didn't bother.)

The overall picture I get from this is that carousels are bad at generating clicks. This is the context, the frame of reference, that I guess many of us must use in evaluating the effectiveness of some UI element. And maybe that's fair, especially considering how much screen real estate carousels generally take up. (*If it isn't driving clicks, did we really have to make it so big?*) But surely it isn't the *only possible* metric by which we could make a judgment.

Personally, I found this argument a little odd on first encountering it. I'm not deeply involved in the world of UX, so maybe it's because I haven't internalized the same metrics by which most professionals in that world tend to judge interfaces. But I never thought of carousels as being a great vehicle for interactive elements. I thought of them more as little slide shows, **presenting content in a space-efficient way without requiring the user to scroll**.

Here's an example: [the home page for Regal Cinemas](http://www.regmovies.com/) has a carousel showcasing some of the films that are currently playing in their theaters:

[!The Regal Cinemas home page](/images/good-carousel.jpg)



[^and-i-mean-brief]: As in, literally about 2 Tweets each.

[^irony]: Ironically, the site itself uses a carousel (to drive home the point, I guess).
