I recently caught wind of an exciting new project that claims to be "the world's smallest and fastest JavaScript library": [Vapor.js](http://vaporjs.com/).

We developers are always excited about small & fast libraries, so naturally I was intrigued. Taking a look at the project's homepage, you immediately see the following tantalizing graph:

![The world's smallest & fastest JavaScript library](/images/vaporjs.jpg)

Wow. Now *that's* fast (off the charts, *literally!*)... but wait a minute. How can this be? Let's take a look at the source code...

On its GitHub page, the Vapor.js README file starts off as follows:

> **vapor.js is a new amazing JavaScript framework.**
>
> In just 0 lines of code it provides:
>
> \[The README ends there.\]

Ah. *I* get it now. It's a joke.

But you know what? I actually think there's something to this. A couple of things, actually[^couple-of-things].

First, there's the "fastest" claim and that absurd graph. Obviously, if the library does *nothing*, it's as "fast" as it can possibly get. But, you know, I say "obviously"; yet it's very easy to forget this fundamental axiom:

You make software *faster* by making it *do less*.
{: .large }

(This concept is clearly not original to me. I'm sure I've read an article or blog post specifically about this idea somewhere else; unfortunately, I was not able to find a reference with a quick Google search.)

CPUs aren't creatures; you can't magically make them perform more operations per second by cracking a whip or digging in your spurs (although *like* many animals, they *can* be sped up by reducing their load). Your processor is a **machine**, executing instructions at a (basically) constant rate. It's the **number of instructions** that affects how "fast" or "slow" your software feels.

Note that I am not just talking about *features*. The same feature can be implemented in countless ways, some requiring far more *processing* than others. For a trivial example, consider sorting a sequence. There's [Bubble Sort](http://en.wikipedia.org/wiki/Bubble_sort), one of the most famously (or infamously) inefficient algorithms known to computer science; and then there are vastly superior algorithms like [Merge Sort](http://en.wikipedia.org/wiki/Merge_sort), [Quicksort](http://en.wikipedia.org/wiki/Quicksort)—one of the most *efficient* algorithms (for sorting) known—or even [Comb Sort](http://en.wikipedia.org/wiki/Comb_sort), which is basically Bubble Sort after getting its act together. Same feature, different implementations.

But the other point this brought to my mind is not performance-related. It has to do with quality and productivity. Far too often, software projects become burdened with external dependencies: frameworks, libraries, tools, all piled on atop one other so liberally that it can quickly become very difficult to keep track of all of them.

For a taste of what I'm talking about, here is a collage of the dependencies (that I can *think* of) we have on my current project:

![Dependencies](/images/dependency-overload.jpg)
{: .plain .no-caption }

(There's not really any good reason HAML goes in the center. [Picasa](http://http://picasa.google.com/) chose to put it there.)

Of course, anyone who's worked on a software project of any size before will not be particularly surprised by this. That's not even *that many* dependencies compared to some software projects.

But guys. They're **dependencies**. That means if something goes wrong with any one of those tools/technologies depicted above, it's a show-stopper for us (as in: we must address *that* issue before we can continue working on *our* software).

I think [I've actually made a similar point before](/posts/acquired-needs-of-software-engineers.html). And, as I said then, I want to stress that I'm *not* saying we should abandon these (very useful) tools. I think what I've come to realize in my limited time as a software developer is simply that when you start reaching for external tools to do your job, you should take a moment to consider that a **tool** becomes a **dependency** very quickly; and the option to **just not use it** should always be *considered*, if not chosen.

[^couple-of-things]: I'm not saying the "makers" of Vapor.js actually mean it to be anything other than a joke, mind you.
