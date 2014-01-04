---
title: I demand smarter tools
date: 2014-01-03
published: false
---

I find myself growing more and more passionate about the idea that we've barely scratched the surface when it comes to building intelligent tools that can and should amplify our capacity as human beings. If a person can figure it out, then it should be possible for a machine to figure it out. It just takes a human brain with the insight and determination to program that machine with the right rules.

I think the seed was planted when I read [this guy's thoughts on asm.js](http://mrale.ph/blog/2013/03/28/why-asmjs-bothers-me.html). Something had rubbed me the wrong way about asm.js for a while but I couldn't quite put my finger on it. If I had to pick an excerpt from his post that best sums it up for me, I suppose it would be this:

> This might sound weird and hyperbolic, but for me pattern matching a statically typed subset
> inside JavaScript before exhausting all other possibilities is equal to giving up my pride as a
> compiler engineer.

I feel a related itch whenever the topic of software performance comes up, particularly with respect to so-called "statically typed" versus "dynamic" languages. It isn't that people are wrong to say that C++ or Java or whatever is "faster" than Ruby or JavaScript. This is true in practice even if it isn't true in theory. (Programming languages are simply grammars and vocabularies for expressing instructions. One is no more "faster" than another than English is "faster" than Dutch. But when we talk about these things, we're talking about compilers, runtimes, implementations.) The issue for me really isn't performance at all. It's the question: "Do we retreat from the challenge or do we march forward?"

Let me explain. Keep in mind I'm writing with a focus (at the moment) on performance. There is more to a statically typed language than just efficiency; type safety is also a tool to reduce bugs, for example. But we can save a broader look at the issue for another day. I don't really have any bones to pick with static typing per se.

Your typical mainstream statically typed languages (let's say C++, Java, C#) are lower-level languages than your typical mainstream dynamic languages (think: Ruby, Python, JavaScript). Forget everything else and let's just talk about what lower-level means. It means the languages are closer to the hardware. There is less abstraction between what the actual CPU does and what the language is capable of expressing. Thus you may have access to registers, stack allocation, CPU-level instructions like interlocked increment/decrement, compare-and-swap, etc. This access means finer-grained control. This is part of the reason some developers prefer these languages. They like the control.

Higher level means you're farther away from the hardware. There's no way to store a value in a CPU register in any popular JavaScript runtime. (Actually, this is misleading. As I already said, a language is just a language. There's no reason you couldn't implement a JS runtime that allows you to directly control hardware. In fact [this already exists](https://github.com/rwaldron/johnny-five). But I digress. We're speaking in generalities here.) This is part of the reason some developers are disdainful of these languages. They think they're toys because they don't give you as much control.

I sort of take the opposite view. Having to think about lower-level details is not control; it's a set of shackles. And I say this as someone who geeks out on lower level stuff and even sort of loves it. (You wouldn't know that from any of my recent open source work, which is all Ruby and JavaScript. But it's the truth.)

The arrow of progress (in my opinion) points up from lower-level to higher-level ways of expressing intent. In my ideal world, the only reason anyone would be writing C++ or Java anymore would be to enhance or optimize the runtimes for higher-level languages. You wouldn't write an application in C++ or Java; you would only use JavaScript, or whatever. And when an even more expressive language came along, we would all stop writing JavaScript (except to enhance or optimize the foundations for this new language).

On some level I acknowledge that this is fantasy. There are compatibility reasons, skilled labor reasons, all sorts of reasons why technologies stick around and their trajectories overlap. And that's fine.

What I don't like to see is backwards progress. For example, on my first ThoughtWorks project we used a tool called [GWT](http://www.gwtproject.org/), which is a Java-to-JavaScript compiler. Think about that. A tool to compile a lower-level language to a higher-level language. To me the notion is as absurd as if you had an Assembly-to-Ruby compiler. (And I almost ended up having to use GWT after joining Google! Fortunately I was able to get my team to agree to use [AngularJS](http://angularjs.org/) instead. Really dodged a bullet there.)

My gut feeling about asm.js is another example. When we take what is in my opinion an awesome language like JavaScript and say, "Let's make the code less readable to help out the compilers and improve performance," that's the wrong direction. It's hurting the humans to help the machines.

We do this because we develop [Stockholm Syndrome](http://en.wikipedia.org/wiki/Stockholm_syndrome) when it comes to our tools. They shape our way of thinking, and then they make us feel safe. Meanwhile we guffaw when we see new technologies fall down and scrape their knees. And so we still have developers retreating from Ruby, or Python, or whatever, and writing web applications in Java even now. And we see bright people proposing new solutions for deforming our expressive languages and giving more hints to the computer.

I'll say it again: if a human can figure it out, we should be able to make a computer figure it out.

I'll say this again too: mostly this is fantasy. Don't take it too seriously if I seem antagonistic. (I'm not as grumpy as you might think from reading this.) I just want smarter tools.
