---
title: Real constraints and artificial constraints
date: 2014-04-21
published: false
---

About a month and a half ago, my old colleague [Pete Hodgson](https://twitter.com/ph1) wrote an article called [JavaScript without the this](http://programming.oreilly.com/2014/03/javascript-without-the-this.html), describing a strategy for writing applications in JavaScript without ever (or at least seldom) needing to use the `this` keyword.

We actually used this strategy---my teammates and I, under Pete's leadership---on a project while I was at ThoughtWorks called EMB. It worked well, and I do think it's a sensible approach. My feelings on the subject don't end there, though. My opinion is a *little* more complicated than a simple thumbs up or thumbs down. So I thought I'd take a minute to write out my thoughts.

## Real constraints and artificial constraints

In any line of work, there are going to be constraints. Some are *real*---by which I mean, there is no avoiding them---while others are *artificial*, constraints we impose on ourselves.

A grammar example would be "Never end a sentence with a preposition." This isn't an actual rule of English grammar that you'll find in any grammar book.[^grammar-itself-is-artificial] It's just a guideline English teachers use to keep their students from saying things like "When's dinner at?" Meanwhile English speakers all over the world ask each other "Where are you from?" and "What company do you work for?" without even the strictest grammar snobs stopping to correct them.

An example from the programming world would be the Microsoft guideline for C# developers to [not use the `readonly` keyword on fields of mutable reference types](http://stackoverflow.com/questions/2804805) (like `List<T>`). Again, this isn't really a *rule*; in fact it isn't even a principle of good design. It's simply a way to protect developers from their own ignorance. The advice is meant to prevent a dev from *thinking* that by marking a field `readonly` he has achieved immutability. There are plenty of C# developers ignoring this guideline, who know what the `readonly` keyword does and use it to prevent reassignment while fully understanding it provides no promise of deep immutability.

A common theme with artificial constraints like the examples I've given is that they are *willfully overzealous*. They place overly tight restrictions on their respective tools in exchange for added protection.[^freedom-in-exchange-for-protection] This is an excellent tradeoff when you just want to *use* a tool, but you aren't especially concerned with *mastering* it. You'd much rather be sure you aren't making any egregious errors than attempt to wield the tool to its full potential.

## Artificial constraints are training wheels

How many of our literary heroes do you think took the "Never end a sentence with a preposition" rule seriously? Faulkner wrote from the perspective of a mentally disabled person, throwing proper grammar out the window. Mark Twain used nonstandard spelling all the time to capture the voices of his characters. James Joyce was famously experimental, not only with his language but even with the format and layout of the *pages* of his books.

Someone who's just trying to get by without shooting themselves[^singular-they] in the foot rightly has a very different view of artificial constraints than someone who wants to be a master. If you're writing a user manual or some documentation, you might prefer to follow stricter rules (to prevent mistakes and avoid any ambiguity) than if you're setting out to write a novel. If you want to be like Faulkner or Twain or Joyce, you're less concerned with following all the rules. In fact what you really need is the confidence to bend language to your will.

I'm not going to convince anyone that code is art if they don't already lean that way; but I'm sure we can at least agree that it is a *skill*, and some are closer to "mastering" it than others.[^closer-to-mastery] And my key point here is that on the road to mastery, artificial constraints may serve a useful purpose for some time. But they can eventually be discarded, or at least demoted from *rules* to *options*, just like training wheels.

## Mastery of a programming language

OK, moment of honesty. My first reaction to Pete's write-up on JavaScript without `this`[^class-less-javascript] was: *Isn't this obvious?* I felt that the approach we used on EMB was really just a simplification of JavaScript down to the basics. It hardly seemed advanced or worth calling special attention to.

But then, of *course* I felt it was obvious: EMB was my first experience writing an application in JavaScript! So I had internalized this model of avoiding `this` most of the time, simply because that was the environment in which I learned the language.

The truth, though, is that many devs come at things from the opposite direction: rather than learning a new idiom along with the language, they take the patterns they know from other languages and ask, "How do I do this in JavaScript?" Those patterns often involve classes, which means they often involve `this`; and JavaScript's `this` keyword is *close enough* to, say, Java's, that it feels familiar. Which is where all the trouble comes from, since Java's `this` is lexically scoped and JavaScript's is... not.

So I sort of view `this`-less JavaScript, or class-less JavaScript, as a bit of a chameleon. On the one hand it is clearly an example of an artificial constraint: an overly restrictive way to write JavaScript, to protect devs from bugs related to the sometimes counterintuitive scoping of `this`. On the other hand it's actually a style that requires a better understanding of closures (as a state mechanism) than many devs have. So it straddles the divide between wanting protection and pursuing mastery.

## When to embrace artificial constraints

I like that Pete's discussion of the approach we took on EMB is not particularly prescriptive. He's not saying, "This is how you should write JavaScript"; rather, he's observing, "Here's a way you *can* write JavaScript, which perhaps you haven't considered." Which is a great thing, because I can see how many devs would never have considered it otherwise, and it could be a smart choice for a lot of teams.

But that leaves the question on the table: when *should* you write JavaScript this way? I propose the following simple distinction:

1. If you or your team is aiming to cultivate mastery of JavaScript as a language, then an artificial constraint like "Avoid `this` and use closures for state" is an *option*, nothing more. You can and should discuss such options as a team and make sure everyone understands its pros and cons, and what problem it's trying to solve.
2. If you're trying to *just build something*---maybe the devs on the team aren't dying to become JavaScript gurus specifically; they just want to focus on delivering features with minimal bugs---then I would say the scale tips more in favor of artificial constraints in general, and following Pete's advice in particular. It's a great way of avoiding a whole class of scope-related bugs, and it's a very easy style to learn.

[^grammar-itself-is-artificial]: Of course, grammar *itself* is mostly a collection of artificial constraints; but I'll save that for another post!

[^freedom-in-exchange-for-protection]: Hmm, giving up some freedom in exchange for protection? Sounds familiar!

[^singular-they]: Since we were just talking about grammar, how about this one? If you're a stickler, you may have noticed while reading that sentence that *someone* is singular and *they* is plural and so I must have made a mistake. But Google for "singular they" and you might be surprised what you find.

[^closer-to-mastery]: For the record, I don't consider myself a JavaScript master, or a master of any programming language for that matter. I'd be skeptical of anyone who made any such claim. I think of mastery as more of a lifetime pursuit, where you're constantly progressing in a positive direction (but never actually *reaching* some final destination).

[^class-less-javascript]: Which, actually, he first wrote about [back in 2012](http://blog.thepete.net/blog/2012/02/06/class-less-javascript/) as JavaScript without *classes*.
