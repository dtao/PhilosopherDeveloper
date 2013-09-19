---
title: We're all going to die because you don't know what a binary tree is
date: 2011-08-13
published: false
---

Guys, I'm worried about **[The Singularity](http://en.wikipedia.org/wiki/Technological_singularity)**.

![The Singularity](/images/skynet.jpg)

OK, wait. Let me take a step back. And explain.

At one point on my last project I dealt with a bug that involved certain records for a certain bank *disappearing*. Not from the internal database, mind you—only from the in-memory storage of a particular application. To my astonishment, I eventually traced the cause of the bug to the following Java code:

~~~{: lang=java }
public Collection<T> sortList(List<T> list) {
    Collection<T> sortedList = new TreeSet<T>(this.comparator);
    sortedList.addAll(list);
    return sortedList;
}
~~~

Non-programmers, I understand that is gibberish to you. Now here's the scary part: **it's gibberish to most *programmers* too**.

All right, maybe not exactly *gibberish*, but... not properly understood. I was surprised when I found this bug for a number of reasons, but the most startling of these was that a genuinely *good* developer wrote it[^good-developer]. And other genuinely good developers thought it was right.

What the code is apparently *supposed* to do is this: take a list and give back a sorted version of it (based on some potentially-custom comparator). What it *actually* does is: exactly that, plus **remove duplicates**. In other words, if you gave it the list `[3, 2, 1, 2]`, rather then return `[1, 2, 2, 3]` (the same list, only sorted, right?), it would return `[1, 2, 3]`, having removed the duplicate `2`.

So it's pretty obvious how this could cause a bug, yes? You have a bunch of records, you try to display them in sorted order, and suddenly a bunch of them are missing.

To my dismay, none of the other developers on my team could see what I was talking about when I first pointed this out. "So what if it removes duplicates?" was the general response. "That'll only happen if two objects have the same [hash code](http://en.wikipedia.org/wiki/Hash_function)."

Uhh, yeah... if a [`TreeSet<E>`](http://download.oracle.com/javase/6/docs/api/java/util/TreeSet.html) were a [`HashMap<K,V>`](http://download.oracle.com/javase/6/docs/api/java/util/HashMap.html). But it ain't, folks. It's a [Red-black tree](http://en.wikipedia.org/wiki/Red%E2%80%93black_tree)!

![Red-Black Tree](/images/red-black-tree.png)

I realize you non-programmers are probably on the verge of changing the page in disgust (*yuck, another one of these self-indulgent code show &amp; tell sessions!*); so let me try to back up and reduce the geekiness a bit.

Basically what scares me about this is that it demonstrates a [craftsman's](http://en.wikipedia.org/wiki/Software_Craftsmanship) basic lack of understanding of one of his tools.

Suppose you had a carpenter come to your house to install some cabinets, and part of the job required him to fasten some screws. And now suppose that in order to do this part of the job, he pulled out a **hammer**. You would be surprised, right? Maybe a little concerned, even? You might have a quick exchange like this:

> **You**: I couldn't help but notice you seem to be planning on using a *hammer* to fasten those screws.  
> **Carpenter**: Yeah, I think it'll work. Normally this hammer's pretty good at putting little things like these *\[eyeing the > screws\]* into wood and such.  
> **You**: Yes... I suppose it is...  
> **Carpenter**: So I figure I'll just, you know, drive 'em on in with this.  
> **You**: Hmm. But won't that... strip the holes?  
> **Carpenter**: Why would that happen? It's never happened when I've used it to drive nails!  

Something *very much like this* happens with an unfortunate regularity in the software industry. I know it doesn't make you happy to hear that, what with software affecting basically every aspect of your life from your [social life](http://technorati.com/blogging/article/anonymous-facebook-will-be-destroyed-by/) to your [bank accounts](http://online.wsj.com/article/SB10001424052702304778304576375911873193624.html) to your [electricity](http://en.wikipedia.org/wiki/2003_North_America_blackout) to your [healthcare](http://en.wikipedia.org/wiki/Therac-25). But it's true.

I attribute it to the fact that a lot of us software developers are—and I *know* I've said this before, multiple times—basically **tinkerers**. We fiddle around with stuff. Yeah, we like to understand the theoretical parts; but sometimes it's faster to just dive in and play with something, and eventually you come to develop a basic idea of how it works.

![Tinkering](/images/tinkering.jpg)

The key words in the above sentence, of course, are **basic idea**. The developer who decided to implement a `ListSorter<E>` using a `TreeSet<E>` had the following basic concepts in mind:

- A `TreeSet<E>` is sorted.
- A *set* implies only unique items; but that doesn't matter because...
- ...in Java, *uniqueness* is defined by hash codes.

Again, the non-programmers are nodding off. Those of you who *do* understand the above three points can maybe, hopefully, sort of sympathize with the poor guy who put them together and came up with a flawed implementation[^flawed-implementation]. But that doesn't change the fact that even though his *basic* understanding of the pieces might have been generally OK, like the fictional carpenter, he fundamentally misunderstood one of his tools. And that's the problem.

*Shut up about the stupid Java bug!* I can almost hear you shouting at me, through time and space! OK, OK, so **what does all this have to do with the Singularity?**

For those of you who were too lazy (!) to click on the link up top, the idea behind the Singularity is basically that we are approaching a historic moment[^historic-moment] when humans develop machines (or, to view the subject through my personal lens, *software* is the thing we're really talking about) that are **more intelligent than ourselves**, at which point we as a species basically forfeit control of the world.

In a way, this idea suggests that humankind is doomed to be succeeded by a new evolution of intelligent beings on Earth.

![Evolution to machines](/images/evolution-to-machines.jpg)

*Preposterous!* you say? I'm not so sure. What makes this seemingly far-fetched concept actually *plausible*, in my mind, is exactly what I've been talking about. Software developers *don't* fully understand the systems they build. The Java snippet above is actually a disturbingly *micro-level* example of this; typically, we do at least understand the *individual lines of code* we write. When you get to the scale of an entire software *system*, built by a team of maybe a dozen or more developers, then the level of comprehension by any single individual of the system as a whole drops from "rough" to **downright scary**.

Which, let's be honest, is nothing special about the software industry *per se*. In our technological age, **no one is an expert in everything**, which has some pretty far-reaching implications. Your typical plumber probably doesn't have a comprehensive understanding of the sewer system, while the civil engineers who *do* understand it may well not know how to fix a toilet. Your average bricklayer probably doesn't have much knowledge of large-scale architecture, while the architects who design modern structures are unlikely to be particularly knowledgeable about laying bricks.

But these are micro- to macro-level comparisons. The actual conceptual divides among us are much more fine-grained. I consider myself a *software engineer* (for those of you who object to the term "engineer" to refer to developers, just pretend I said *code monkey*); yet my knowledge in this field is **extremely limited**.

Ask me to write a simple [Hello World program](http://en.wikipedia.org/wiki/Hello_World) in C or Python or, I don't know, [*Fortran*](http://en.wikipedia.org/wiki/Fortran); and sure, I can probably manage that. Heck, I might even be able to whip up a [Fizz-Buzz](http://www.codinghorror.com/blog/2007/02/why-cant-programmers-program.html) program in just about any language, given a cursory overview of its basic syntax and control structures. But that doesn't mean much.

When it comes to working on a serious piece of software, I would be next to useless in all but a relatively small handful of technologies. Device drivers or OS kernel-level stuff in C or (*gasp*) [Assembly language](http://en.wikipedia.org/wiki/Assembly_language)? Heck, no! (I mean, don't get me wrong; I'd *love* to get a chance to work on that stuff, but it would take me a *while* to get a handle on it and be able to contribute.)

![Robot Army](/images/robot-army.jpg)

This is why I think the Singularity could actually happen. It isn't that any one person would ever intentionally design a system capable of enslaving humanity (nor do I actually think *that's* what will happen if and when the so-called "Singularity" occurs); it's that **we as a species**, *collectively*, are on the path towards creating something amazingly advanced without anyone really knowing how the pieces all fit together. The genetic engineers, the nanotechnologists, the [biological computing](http://en.wikipedia.org/wiki/Biocomputers) folks, the [*quantum* computing](http://en.wikipedia.org/wiki/Quantum_computer) folks, and—scariest of all, if you ask me—the people working in [genetic algorithms](http://en.wikipedia.org/wiki/Genetic_algorithm) are *all* doing **crazy stuff** right now. Who knows what it will all add up to, taken together?

There's no doubt that the people working in these fields are ridiculously smart. I'm not trying to say they're clueless. **But that doesn't mean that each group understands the work of every other group.** They're *tinkerers*, and, as with me and most other software developers, their curiosity can sometimes (perhaps even *most* of the time) outpace their understanding. It's only a matter of time before somebody puts it all together in a way he or she doesn't fully grasp, and then **boom**.

Robot Apocalypse.
{: .huge }

That's right, I said it. *We're all doomed.*

[^good-developer]: And no, I'm not talking about myself (though that would be pretty funny).
[^flawed-implementation]: It has just occurred to me that I haven't explicitly stated why the implementation is wrong. Does anyone care to offer an explanation in the comments?
[^historic-moment]: I refuse to type "an historic" because I just think it's wrong. If you disagree, I'm sorry that you're confused.
