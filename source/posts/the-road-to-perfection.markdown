---
title: The road to perfection
date: 2013-09-25
published: false
---

The road to perfection is never-ending.

I visualize the path of personal progress---whether as a software engineer, or otherwise---as a perilous one, riddled with illusions. Wherever we stand, we think we're on an island of englightenment and look back at those further back on the path with disdain. "Don't walk along those rickety bridges!" we shout back at them. "They are poorly built! They will collapse underneath you!" Meanwhile we forget that we had to cross those very same bridges to get where we are. And to those ahead of us on their own paths, our island of enlightenment is itself a garbage pile. 

PHP and Visual Basic
--------------------

At Cardpool we used to tease our designer because he preferred PHP to Ruby on Rails. Sometimes he would ask the other engineers how to do something basic in Ruby, one of us would tell him, and he'd sort of roll his eyes and go "Ugh, this would be *so* much easier in PHP." And we'd all have a good laugh (or *I* would anyway, because I'm a jerk) at how *foolish* he sounded for saying such things.

The tech community loves to hate PHP because it's a "bad" language. And it really is. This has been discussed in about a million places; there's [a popular blog post that calls the language "a fractal of bad design"](http://me.veekun.com/blog/2012/04/09/php-a-fractal-of-bad-design/) if you want to read one.

There's also a lot of hate for Visual Basic, a similarly crappy language (not to be confused with VB.NET, a perfectly respectable language[^respectable-language] but with baggage by association with its heritage). VB is really verbose, does insane error handling, uses 1-based array indexing (*what?!*), and has all kinds of other issues. All totally true, and worthy of hate.

Guess what my first exposure to software development was? Hacking VBA macros in Microsoft Excel and writing little webpages in PHP.

Could it have been otherwise? I don't know. But I have this hypothesis that if you're going to reach the island of Good Web Development, a path through the PHP forest is the best route to take. If you're going to become a world-class application developer, spending some time in the swamp of VB is good for you.

Here's the thing. If you're using Microsoft Office, you can click "Record Macro" (or whatever the button is), do a few things, then open up an editor and see code that automates what you just did. From looking at this code, you can kinda see how it works; and it's pretty obvious how you could tweak that and make it do something a little different. So the distance from "I don't know how to code" to "Gee, I just automated some mundane tasks!" is quite small.

Same with PHP. You follow maybe one or two online tutorials to set up an Apache server with mod_php, install MySQL, write a couple of `<?` and `?>` tags and it's off to the races. You're opening localhost in your browser and seeing your work in no time. Again, the distance from "I've never done web development" to "I'm building a website right now" is small.

Meanwhile, imagine taking a complete neophyte and helping him or her get started with, say, Rails. "Well, to begin with you must understand this concept called MVC. Here are some articles explaining the core ideas." This poor soul will be completely lost. The ideas of MVC are abstract and intangible; it takes experience to appreciate what they really are and why they're useful. Same goes for an ORM like ActiveRecord, or a dependency management system like Bundler, or even a version control system like Git.

My point is that you can't just throw all of your hard-won knowledge about how "good" developers build software the "right" way at a new developer and expect it to stick. We learn in gradual steps, not leaps. And from knowing *nothing*, the first step is nowhere near MVC. It's much closer to PHP[^mvc-vs-php].

Bootstrap
---------

[^stupid]: All in good fun, of course. We obviously didn't really think he was stupid, or we wouldn't have hired him.

[^respectable-language]: And for all I know, PHP has cleaned up its act and is perfectly fine in its latest incarnation as well. I don't know because I haven't used it in years.

[^mvc-vs-php]: I'm aware that "MVC" and "PHP" are not strictly exclusive concepts. They're orthogonal: one is a paradigm, the other is a language. PHP frameworks like CakePHP exist that marry the two. Sure. The point I'm making here is sort of symbolic. Think of "MVC" as a symbol for a more experienced developer's way of doing things, and "PHP" as a symbol for a newbie. And if you're an experienced PHP developer---I realize there are many such people---I apologize for writing what is probably a pretty offensive post to you.

[^legacy-code]: I don't mean to denigrate the role of those who find themselves in exactly this position. The fact is that there's a whole world of software development I've been largely sheltered from, and that's maintaining legacy systems. I respect and admire those who do it, and I don't envy them.
