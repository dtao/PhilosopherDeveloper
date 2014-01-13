---
title: Applications are different
date: 2014-01-11 21:38:00 -0800
published: true
---

Here's an observation I find myself making pretty frequently. While it's probably obvious to some, I think a lot of developers don't think about it. So my intention is simply to plant the idea in your head, in case it wasn't already there.

## Two kinds of develop<strike>ers</strike>ment

There isn't just one kind of developer. Broadly speaking, there are at least **two** kinds: *library* developers and *application* developers.[^at-least-two-kinds] That isn't to say that each of us falls 100% cleanly into one category or the other. I consider myself both. But when I'm wearing my "library developer" hat, my work looks very different from when I'm wearing my "app developer" hat.

It's tempting to view us all the same: we all tackle the same problems, so the same rules and principles apply to all of us the same. But that simply isn't reality. A lot of heated debates flare up on the internet between developers about the "right" way to build software, or what "matters" and what doesn't; and what I think is often really happening is that you have a *library* developer applying the values of library development to an *application* developer with completely different values (or vice versa).

## The single responsibility principle

There's a principle a lot of software developers know about called the [single responsibility principle](http://www.oodesign.com/single-responsibility-principle.html) (often referred to as *SRP*). Basically it says that a software component (i.e., a class or a function) should do one thing. This encourages developers to break their work down into discrete modules that make sense and can be refactored on their own. The benefit is that when you need to change some behavior, you know where to change it; and the consequence of doing so is easy to reason about. Components that do too much can cause ripple effects when you modify them for one purpose, since their responsibilities may cover many unrelated scenarios. And more generally, SRP simply encourages sane software design.

## The library/app divide

Of course, I'm not exactly the staunchest believer in following principles *just because*. I believe they have their place, though. And I think we see a very good example of the pitfalls of losing sight of SRP when looking across the library/app divide. So many software principles, laws, "best practices"---basically all the ways we try and share what we learn, the wisdom we acquire---are packaged as seemingly universal rules. Hence the arguments.

One example would be performance. Someone who develops business applications[^business-applications] is very likely to have taken to heart the old Knuth quote, which [we've all heard](http://joeduffyblog.com/2010/09/06/the-premature-optimization-is-evil-myth/) a jillion times:

> We should forget about small efficiencies, say about 97% of the time; premature optimization is the root of all evil.

This is such a useful reminder for developers of internal business apps, I think it's actually *good* that it's treated dogmatically among a portion of the community. Applications have *business rules*, which come first. If the software has any value, it's helping people do their jobs much more effectively than they could *without* the software. This means in all but extreme cases shaving a few seconds off of some feature's running time, or cutting down on memory usage, should be a lower priority than getting the feature right.[^efficiency-of-the-software]

But then somebody asks a question about performance on the internet somewhere, and all of these app developers jump in and shout, "Premature optimization!" What if it's *not* a business application? What if it's a library developer? Does the mantra still hold? Probably to some extent, but much less than for apps.

## Is there anybody downstream?

A lot of this comes down to dependencies. If you're developing an application, in almost every case, you are a leaf node on the dependency graph. Nobody is going to depend on the code you've written for their library or application. (As I'm typing this I realize that plugins are the exception. That's a whole other can of worms.)

Dependencies have a way of amplifying problems. For instance, if you've determined that a basic design decision you made was wrong, and you're an application developer, chances are it'll be tedious but you can modify your design, clean up the resulting mess, and nobody has to suffer from it (except for you). If you've got lots of dependencies it isn't such an easy proposition. You risk breaking a lot of other people's code.

The same goes for performance. A piece of software is only as performant as its slowest component. It's the same way a chain is only as strong as its weakest link. If you have a library with a bad bottleneck in it somewhere, this trickles down to every user of your library. Furthermore, these issues can compound. What might seem like a little slowness in your isolated benchmarks can, together with a little slowness here and there from *other* libraries, really kill a downstream application's performance. Which is why for library developers performance often *is* a legitimate first-class concern.

At the risk of sounding truly extreme, I think the same even applies to testing. A library with no tests or poor test coverage is a ticking time bomb, because eventually some regression (or just straight-up bug) is going to break a *lot* of apps. Testing applications is also valuable, but in my opinion the difference is significant. A bug in an application is easily detected by a *user*. And users finding bugs, though icky on some level, actually provides a very useful byproduct which is *de facto* prioritization. I've worked on projects where the approach was "Tests are optional, except for regression tests on user-reported bugs which are mandatory." Before steam starts coming out of your ears at that, think about how that might play out and ask yourself whether it would ever work. (What do you think?)

## App dependencies aren't library dependencies

Clearly I'm talking about more than just dependencies, but dependencies are a big part of the picture here. And I think almost every dependency management system I've encountered treats all software as if it's all going to have downstream consumers. So dependencies need to be defined and exposed in a standardized way, and incorporated into a graph that resolves them so that any node can have dependent nodes.

But libraries are parent nodes. Apps are leaf nodes. Understanding an app's dependencies **doesn't matter** unless you're on the team developing the app.

I recently started work on a project called [deft](https://github.com/dtao/deft), which is a dependency declaration system targeting app developers. I'm mainly focusing on JavaScript, but it could really be for anyone. I call it a "declaration" system[^declaration-system], as opposed to a "management" system, because it's only about *consuming* dependencies, not exposing or sharing them.

I created deft because of this issue. Alternatives like [Bower](http://bower.io/) or [component](http://component.io/) exist sort of on the boundary between library and app development. Library devs need to create bower.json or component.json files to define their dependencies so that their libraries can fit into these dependency ecosystems. And then app devs can consume them, and their subdependencies can be fetched, and all that good stuff.

But the single responsibility principle applies to these tools, same as it does to software principles. What tools like these require from and offer to library and app developers is very different. So they have to do different things. They have multiple responsibilities.

The job of deft is very clear. It offers *nothing* to library developers. There is no ecosystem, no dependency graph. It piggybacks off the ecosystems already out there (namely, GitHub and the web at large). It is *just* about fetching dependencies and nothing else. And it offers no clean solution to the problem of exposing your dependencies, because for (the majority of) applications that simply isn't necessary.

## Should we be arguing about this stuff?

I've talked about performance and I've talked about dependencies (and testing, briefly). There are lots of other ways libraries and applications are different; of course there are also lots of ways they are the same. I've focused on differences because, as I mentioned in the beginning, I think a lot of developers don't really think about that.

The next time you find yourself reading a blog post or watching a presentation on some software topic and you find yourself thinking, "This guy doesn't know what he's talking about!" ask yourself: *Are these ideas applicable to library development? App development?* Or if you find yourself nodding in agreement, ask the same question: *Do I agree with this person because these ideas hold for everyone, or just because we're working on similar problems?*

And the next time you're evaluating a software tool, technology, approach, etc., and you think, "Who would want to use this?" or "Obviously everyone should use this!" think about the library/app divide.

I don't mean to suggest that there is always a clear answer to these questions, or that for every problem we should have two different solutions (one for libraries, another for applications). But I *do* think that, a lot of the time, arguments between developers are really over the library/app divide and neither party has a universally more correct view. And I also think that there are times when we try to solve a problem one way for all devs when the appropriate solution for one side is not ideal for the other.

[^at-least-two-kinds]: Of course, you could divide developers further into subcategories. You might even feel there are more than two top-level categories. I'm going to simplify anyway, kind of like saying all living things are either plants or animal (when in fact there are fungi, etc.), because I think "library" and "app" developers covers the majority.

[^business-applications]: This also brings up an interesting point, which is that among app developers there is also a big difference between those who make *internal* versus *consumer-facing* applications. Often those who work on consumer-facing apps *do* run into the issue of performance; but it's typically perceived as one of those "good problems to have" (i.e., if you're worried about performance, it's probably because you've started getting lots of traffic).

[^efficiency-of-the-software]: That isn't to say performance doesn't matter *at all* for internal apps. I actually worked at a company with an internal application that took over ten minutes just to boot up. That's ridiculous to me; but what's even *more* ridiculous is that I heard tales of that same application taking *up to two hours* to load before I joined. (I guess the other devs on the team finally got around to addressing the most glaring performance issue at one point, which was that the application was essentially loading the company's entire database into memory.) So, yeah: slippery slope, or something.

[^declaration-system]: In retrospect, maybe a better term would be "consumption" system.
