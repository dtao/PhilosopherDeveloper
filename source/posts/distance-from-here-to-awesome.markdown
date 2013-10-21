---
title: The distance from here to awesome
date: 2013-10-21
published: false
---

I visualize the path of personal progress---whether as a software engineer, or anything else---as a perilous one, riddled with illusions. Wherever we stand, it's easy to think we're on an island of englightenment and look back at those behind us with a sense of superiority. "Don't walk along those rickety bridges!" we shout back at them. "They are poorly built! They will collapse underneath you!" Meanwhile we forget that we had to cross those very same bridges to get where we are. And to those ahead of us on their own paths, our enlightened island is itself a wasteland.

Let's talk about Twitter Bootstrap.

Twitter Bootstrap: a flawed framework
-------------------------------------

A little while ago I attended a meetup of sorts at the ThoughtWorks office in San Francisco, where I had a chance to chat with Pete Hodgson, my old friend and colleague. Pete talked about [Bourbon](http://bourbon.io/), a mixin library for SASS, along with [Neat](http://neat.bourbon.io/), a companion grid framework. Specifically he discussed how these tools are in many ways preferable to Twitter's extremely popular [Bootstrap](http://getbootstrap.com/) framework, for a variety of reasons.

Pete is a smart guy, and he had some good arguments against Bootstrap. I won't enumerate all of them, but one of the big ones is that it encourages you to put lots of presentation logic in your HTML, going against the widely-preached guideline of using [semantic markup](http://en.wikipedia.org/wiki/Semantic_HTML). So instead of a nice content-heavy HTML document with `<article>` and `<section>` elements, Bootstrap tends to produce "noisy" pages with `<div class="row">` and `<div class="col-lg-10">` and so forth.

To web developers with a lot of experience under their belt, there is an intuitive *ickiness* to this. The idea for semantic markup was borne out of frustration with old-school, Web 1.0 sites where a task as seemingly simple as redesigning the layout was a nightmare due to tight coupling between server-side rendering logic and the pixel-by-pixel look of a page. Focusing on *semantics* establishes a helpful separation between content and presentation, achieving something like what XML and XLST were supposed to provide but with the more flexible (and hipper) HTML and CSS.

The problem with this hard-won knowledge is that it's a bit abstract, and doesn't exactly tell you how to make a nice-looking website. You know what *does* make it easy to make a nice-looking[^nice-looking] website? Bootstrap.

*So Bootstrap is a tool to make a nice-looking website with crappy markup?*

Hang on for a second. If Bootstrap were *just* a collection of pretty UI features, that'd be one thing. But it isn't just that.

The fact is that Bootstrap *does* address a problem, which is the prevalence of disorganized [spaghetti](http://en.wikipedia.org/wiki/Spaghetti_code) layouts with rampant code duplication and CSS rules whose interactions are extremely fragile (e.g., remove a `<div>` and suddenly the text is blue). This was a real problem. Then Bootstrap[^not-just-bootstrap] came along with its simple vocabulary of consistent syling rules and attractive defaults, and suddenly coming up with a sane, pleasant layout became much easier.

*Yeah, but they didn't do it the right way! It isn't semantic!*

In other words, it isn't *totally awesome*.

The tricky thing about *awesome* is that it can be really far away. So if you want to *get* there from here, your first step needs to be somewhere close. That's how developers learn and grow---like everyone else---in small steps, not great leaps. If you're going to introduce a New Way of Doing Things, it needs to be familiar somehow.

OK, enough about Bootstrap. Let's talk aobut PHP.

PHP and Visual Basic: crappy languages
--------------------------------------

When I was at Cardpool we used to tease our designer because he preferred PHP to Ruby on Rails. Sometimes he would ask the other engineers how to do something The Rails Way, one of us would explain it to him, and he'd sort of roll his eyes and go "Ugh, this would be *so* much easier in PHP." And we'd all have a good laugh (or *I* would anyway, because I'm a jerk) at how *foolish* he sounded for saying such things.

The developer community loves to hate PHP because it's a bad language. And it really is. This has been discussed in about a million places; there's [a popular blog post that calls the language "a fractal of bad design"](http://me.veekun.com/blog/2012/04/09/php-a-fractal-of-bad-design/) if you want to read one.

There's also a lot of hate for Visual Basic, a similarly crappy language (not to be confused with VB.NET, a perfectly respectable language[^respectable-language] with an unfortunate heritage). VB is really verbose, does insane error handling, uses 1-based array indexing (*what?!*), and has all kinds of other issues. All totally worthy of hatred.

Incidentally, guess what my first experience with software development was? Hacking VBA macros in Microsoft Excel and writing little web pages in PHP.

Here's the magical thing about VB. If you're using Excel, you can click "Record Macro" (or whatever the button is), do a few things, then open up an editor and see generated code that automates what you just did. This code is crappy (it's VB); but if you're new to programming, that isn't what you notice. What you notice is that from just looking at it you can kinda see how it works, make a few changes, and make it do something a little different. So the distance from "I don't know how to code" to "Gee, I just automated some mundane tasks!" is quite small. This is a baby step.

Same with PHP. You follow maybe one or two online tutorials to set up an Apache server with mod_php, install MySQL, write a couple of `<?` and `?>` tags and it's off to the races. You're opening up your web browser and seeing your work in no time. Again, it's a baby step from "I've never done web development" to "I'm building a website right now" *(with a crappy language, but that doesn't concern me yet)*.

Meanwhile, imagine taking a complete neophyte and helping him or her get started with, say, Rails---which is already a lot more user-friendly than some of the other options out there. "Well, to begin with you must understand this concept called MVC. Here are some articles explaining the core ideas." This poor soul would be completely lost. The ideas of MVC are abstract and intangible; it takes experience to appreciate what they really are and why they're useful.

The same goes for an ORM like ActiveRecord, or DataMapper, or Hibernate; or a dependency management system like Bundler, or NPM, or Maven; or even a version control system like Git or Subversion.

My point is that you can't just throw all of your hard-won knowledge about how "good" developers build software the "right" way at a new developer and expect it to stick. From knowing *nothing*, the first step towards awesome is nowhere near MVC. It's much closer to PHP[^mvc-vs-php].

Living in a flawed society
--------------------------

This idea obviously doesn't just apply to software.

It's intriguing to me to imagine being transported to a much earlier time. Say, the early 1900s in America (because why not?). It would be difficult, I think, for someone living today to imagine just how many things were *wrong* with society back then.

Women couldn't vote. Racism and homophobia were the norm. Basically, unless you were a white, straight, protestant male (preferably a wealthy one), your life was pretty terrible. I picture being dropped into a society like that, knowing what the world is like today---not perfect by any means, but certainly several steps ahead of the early 1900s in terms of social justice---and being tasked with making things better. Where would I start?

It wouldn't be very practical for me to try to solve all of these issues at once. As hard as it might be, I think my best strategy in a scenario like that would be to *pick one* and try my hardest to make some headway on just that one issue. (Incidentally, I tend to believe that's what politicians today do; so when you see an elected official giving some canned speech on a topic he clearly doesn't care about, it could be *that just isn't his issue*.)

Because when it comes down to it, which would be better? For me to try and solve sexism, racism, homophobia, religious intolerance, etc. all at once, and fail completely (so nothing gets better)? Or to focus just on, say, sexism[^just-sexism], and actually make a little progress?

It would be frustrating, undoubtedly. But in this... completely preposterous world I've just dreamed up, where I'm some kind of leader of the masses (this analogy seems to have spiraled out of control a bit)... I think it would be crucial for me to realize that I'm not the only person who would ever come along to try and change things. Maybe I could fix one issue. Then someone else might rise up in the next generation and fix another. And so on. Things would improve over time---in small steps, not giant leaps.

Actually, I don't think it's that controversial to say that this is how progress happens in the real world.

So yes, our modern society is a much better place, in many ways, than it was a century ago. But, of course, it isn't *totally awesome*. There is still discrimination of all forms, crime, poverty, government corruption, the works. Awesome is a long way off. The way to get there is to keep taking small steps towards it.

[^nice-looking]: Albeit unfortunately rather cookie-cutter, too, these days.

[^not-just-bootstrap]: I don't mean to suggest that Bootstrap is the only framework of its kind. There were, of course, CSS frameworks prior to Bootstrap, and there have been frameworks introduced since. Think of *Bootstrap* as a representative for the popularity of CSS frameworks in general, which has grown over time.

[^stupid]: All in good fun, of course. We obviously didn't really think he was stupid, or we wouldn't have hired him.

[^respectable-language]: And for all I know, PHP has cleaned up its act and is perfectly fine in its latest incarnation as well. I don't know because I haven't used it in years.

[^mvc-vs-php]: I'm aware that "MVC" and "PHP" are not strictly exclusive concepts. They're orthogonal: one is a paradigm, the other is a language. PHP frameworks like CakePHP exist that marry the two. Sure. The point I'm making here is sort of symbolic. Think of "MVC" as a symbol for a more experienced developer's way of doing things, and "PHP" as a symbol for a newbie. And if you're an experienced PHP developer---I realize there are many such people---I apologize for writing what is probably a pretty offensive post to you.

[^legacy-code]: I don't mean to denigrate the role of those who find themselves in exactly this position. The fact is that there's a whole world of software development I've been largely sheltered from, and that's maintaining legacy systems. I respect and admire those who do it, and I don't envy them.

[^just-sexism]: Which would honestly seem a sensible place to start, given that women are 50% of the population and all.
