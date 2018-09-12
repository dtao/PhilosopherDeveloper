---
title: I demand smarter tools
date: 2014-01-04
published: true
---

I find myself growing more and more passionate about the idea that we've barely scratched the surface when it comes to building intelligent tools that can and should amplify our capacity as human beings. If a person can figure something out, then it should be possible for a machine to figure it out. It just takes a human brain with the insight and determination to program that machine with the right rules.

The itch of asm.js
------------------

I think the seed was planted when I read [Vyacheslav Egorov's thoughts on asm.js](http://mrale.ph/blog/2013/03/28/why-asmjs-bothers-me.html). Something had rubbed me the wrong way about asm.js[^something-about-asm-js] for a while but I couldn't quite put my finger on it. If I had to pick an excerpt from Egorov's post that best sums it up for me, I suppose it would be this:

> This might sound weird and hyperbolic, but for me pattern matching a statically typed subset
> inside JavaScript before exhausting all other possibilities is equal to giving up my pride as a
> compiler engineer.

I feel a related itch whenever the topic of software performance comes up, particularly with respect to so-called "statically typed" versus "dynamic" languages. It isn't that people are wrong to say that C++ or Java or whatever is "faster" than Ruby or JavaScript. This is true in practice even if it isn't true in theory.[^true-in-practice-not-in-theory] The issue for me really isn't performance at all. It's the question: "Do we retreat from challenges or do we march forward?"

Let me explain. Keep in mind I'm writing at the moment with performance as a mere reference point. There is a lot more to the static/dynamic divide than just efficiency; type safety is also a tool to reduce bugs, for example. But we can save a broader look at the issue for another day. I don't really have any bones to pick with static typing per se.

Do we go higher or lower?
-------------------------

Your typical mainstream statically typed languages (let's say C++, Java, C#) are *lower-level* languages than your typical mainstream dynamic languages (think Ruby, Python, JavaScript). Forget everything else and let's just talk about what lower-level means. It means the languages are closer to the hardware. There is less abstraction between what the actual CPU does and what the language is capable of expressing. Thus you may have access to registers, stack allocation, CPU-level instructions, etc. This access means finer-grained control, which is part of the reason some developers prefer these languages: they like the control.

Higher level means you're farther away from the hardware. There's no way to store a value in a CPU register in any popular JavaScript runtime.[^javascript-access-to-hardware] This is part of the reason some developers are disdainful of these languages: they think they're toys because they don't give you as much control.

I sort of take the opposite view. Having to think about lower-level details is not control; it's a set of shackles. And I say this as someone who [geeks out on lower level stuff](posts/how-to-build-a-thread-safe-lock-free-resizable-array.html) and even sort of loves it. (You wouldn't know that from any of my recent open source work, which is all Ruby and JavaScript. But it's the truth.)

My opinion is that the arrow of progress points up from lower-level to higher-level forms of expression. This has to do with *leverage*. We use higher-level languages so that we can do more with less code. It's the same reason we have levers and pulleys: so that we can lift and move heavier things with less human exertion.

In my ideal world, the only reason anyone would be writing C++ or Java anymore would be to enhance or optimize the runtime environments for higher-level languages. You wouldn't write an *application* in C++ or Java; you would only use JavaScript, or whatever. And when an even more expressive language came along, we would all stop writing JavaScript (except to enhance or optimize the foundations for this new language).

Slowly forwards, not quickly backwards
--------------------------------------

On some level I acknowledge that this is fantasy. There are compatibility reasons, education reasons, political reasons, all sorts of reasons why technologies stick around and their trajectories overlap. That actually doesn't bother me so much.

What I don't like is to see things going backwards. This is what I think subconsciously[^subconsciously] got me so fired up when I first started work on [Lazy.js](http://danieltao.com/lazy.js/). On the issue of performance, [@jdalton's](https://github.com/jdalton) [initial feedback](https://github.com/dtao/lazy.js/issues/1#issuecomment-17911128) on what I was trying to do was:

> It's better for devs to rethink, strip down (reduce abstraction), and simplify to improve
> performance.

The funny thing is that what he said is *absolutely true*---except for the "better" part: that's where I take issue. I thought, *So we have to trade, then? Abstraction for performance?* To me this is a false dichotomy. I mean, it's maybe true at a microscopic level, but it shouldn't matter. The fact that Lazy.js was fairly weak on performance at the time (this was in the very early days of the project) wasn't fundamentally about abstraction; it was just about code that hadn't really been tuned. To reduce abstraction would have been to retreat.

So whenever I see things progress in that direction, away from abstraction, to me it smells like defeat. Maybe I'm being ridiculous; that's just what it seems like to me.

For example, on a project several years ago I used a tool called [GWT](http://www.gwtproject.org/), which is a Java-to-JavaScript compiler. Think about that. A tool to compile a lower-level language to a higher-level language. To me the notion is as absurd as if you had an Assembly-to-Ruby compiler.[^java-to-javascript-compiler] There are some justifications for GWT---the main one I'm aware of is when you have a team of experienced Java devs who don't know HTML, CSS, or JavaScript---but they are tenuous. (Is it really easier or more desirable to learn GWT, which is a complex toolkit with a pretty rough developer experience, than to pick up HTML and JavaScript?)

My gut feeling about asm.js is another example. When we take what is in my opinion a very powerful language like JavaScript and say, "Let's make the code less readable to help out the compilers and improve performance," that's the wrong direction. It's going in reverse as humans to help the machines.

We do this because we develop [Stockholm Syndrome](http://en.wikipedia.org/wiki/Stockholm_syndrome) when it comes to our tools. They shape our way of thinking, and then they make us feel safe. Meanwhile we scoff when we see new technologies fall down and scrape their knees. And so we still have developers retreating from Ruby, or Python, or whatever, and writing web applications in Java even now. And we see bright people proposing new solutions to improve performance by sacrificing expressiveness, making our languages uglier and more verbose in order to dish out more hints to the computer.

I'll say it again: if a human can figure it out, we should be able to make a computer figure it out. We shouldn't have to spoon-feed our tools. We should make them smarter.

Just keep swimming
------------------

I want to reiterate here that I'm really speaking about something pretty general. If I've come across as particularly harsh towards any technology (like asm.js, which is really intended to be a compile target and so I've skapegoated it a bit here) it's more for effect than out of genuine antagonism, just to have something concrete to talk about. This isn't really about asm.js, or GWT, or Java. My point is that we should be enthusiastically seeking out more leverage from our tools.

Perhaps a more positive concrete example will resonate better. The huge popularity of [Node.js](http://nodejs.org/) is a great encouragement to me. I particularly like it because it's a platform based on a high-level language (JavaScript) that is known for amazing performance. The key to Node's success is that rather than give up abstraction for the sake of performance, it uses a *core* abstraction of JavaScript (callbacks) to drive forward a fundamentally more efficient paradigm (asynchronous as opposed to concurrent/multithreaded programming) for web applications, which are nearly always I/O-bound as opposed to CPU-bound. The result is not only superior performance in many cases; it's also code that's shorter and simpler. That's an amazing win.

So, I want to see more of that. More killer abstractions that encourage new approaches to *complement* the pursuit of performance, rather than clash with it. More expressive forms of developing software (or any kind of new technology). More optimization to *support* those expressive forms, without retreating back to the less expressive forms.

Again: I know this is very idealistic. Don't take it too seriously. I just want smarter tools, people.

[^something-about-asm-js]: Let me be clear about something: I don't actually have any beef with asm.js specifically. Considering the fact that it comes from Mozilla, and that it's been garnering a lot of attention since its proposal, I'm pretty confident there are very smart people behind it and that if we were to talk about it they'd have great points to make. This post is really about a much more general arc that I see, and asm.js represents a single point on that arc.

[^true-in-practice-not-in-theory]: Programming languages are simply grammars and vocabularies for expressing instructions. One is no more "faster" than another than English is "faster" than Dutch. But when we talk about these things, we're talking about compilers, runtimes, implementations.

[^javascript-access-to-hardware]: Actually, this is misleading. As I already said, a language is just a language. There's no reason you couldn't implement a JS runtime that allows you to directly control hardware. In fact [this already exists](https://github.com/rwaldron/johnny-five). But I digress. We're speaking in generalities here.

[^subconsciously]: I would be lying if I said I was already actively thinking about this topic at the time. But ideas have a way (for me at least) of starting off as nebulous feelings that only crystallize long after the first seeds have been planted.

[^java-to-javascript-compiler]: And I almost ended up having to use GWT after joining Google! Fortunately I was able to get my team to agree to use [AngularJS](http://angularjs.org/) instead. Really dodged a bullet there.
