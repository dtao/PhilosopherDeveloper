Preamble
========

As I'm sure plenty of you already know (the title of this blog is a bit of a giveaway), I was a **philosophy** major in college. Which means I was *not* a C.S. major. But that's not the full extent of it: I didn't *minor* in C.S., either; I actually took *absolutely no computer sciences courses at all* in college.

I did recently receive an M.S. in software engineering from [Carnegie Mellon](http://www.cmu.edu/silicon-valley/); but the courses in that program were higher-level in nature: software architecture, process management, software metrics, entrepreneurship--that sort of thing. And so I've still never really had an academic foundation for a lot of the more theoretical stuff that those with bachelor's degrees in computer science have.

To clarify: I *do* know a decent amount of C.S. stuff in practice, because:

* I worked for two years at an algorithmic trading company, where performance was a key concern (use of optimal data structures was critical) and the software was highly concurrent (so I got plenty of hands-on experience with things like synchronization, mutexes, semaphores, etc.)
* I am a huge nerd who spends way too much time reading about [skip lists](http://en.wikipedia.org/wiki/Skip_list) and [red-black trees](http://en.wikipedia.org/wiki/Red_black_tree) and all that good stuff on Wikipedia

Anyway, all this is my long-winded way of introducing a little series of blog posts I'm going to be doing, starting with this one. The basic idea behind it should already be obvious: I'm going to "brush up" on (in some cases, learn entirely from scratch) some of the fun theoretical stuff that I missed by never going through a college C.S. program.

Those of you already well-versed with theoretical C.S. stuff will probably not be all that intrigued by this or the next few posts. Then again, maybe you will. My goal is actually two-fold here:

1. Obviously, to add to my own knowledge and study some of the things that fascinate me more in depth
2. To do my best to explain these concepts in a straightforward and easily comprehensible way, so that even someone without a C.S. background can understand them (at least insofar as it's feasible--I will readily admit some of this stuff may end up being too tricky for me to explain without requiring some lower level knowledge on the part of the reader)

OK, now that I've written about five too many paragraphs *introducing* this series (not off to a good start!), let's go ahead and dive in.

Part 1: Algorithmic Complexity
==============================

So originally I was thinking I'd start with some sorting algorithms. I'm excited about that topic, because it's honestly one of the things that got me really psyched about computer programming when I first started (which also means it probably isn't the best topic for the first goal I mentioned above, because a lot of this stuff I've known for a while). I remember when I first started learning several years ago, reading through countless Wikipedia articles about [all the different sorting algorithms](http://en.wikipedia.org/wiki/Sorting_algorithm) that have been devised over the years and being totally obsessed with it. I just thought it was the coolest thing ever.

But upon thinking about it for a bit, I realized I'd be getting ahead of myself by starting there. If you visit the Wikipedia page I just linked to, you'll see a big table listing the names of a bunch of famous algorithms, with columns labeled "Best", "Average", and "Worst" and containing values like *n<sup>2</sup>* and *n log n*. I noticed that table, and it occurred to me that most people have no idea what those things mean. (And to be honest with you, I've met a lot of *developers* who don't fully understand what they mean either. Most have a rough sense, but often developers think they get it when in fact they are mistaken about a few things, which I'll get to.) And so the best place for me to start, if I want to eventually get to sorting algorithms, is a concept called **algorithmic complexity**.

### The Basic Gist

I personally find most academic terms like "algorithmic complexity" to be vaguely pretentious[^pretentious], so I'm going to present the idea as much in plain English as I can. The whole point of this concept is to explain how well an algorithm--essentially, any software procedure, or even more simply a set of instructions--will perform, i.e., **how fast it runs**. But that's not the whole picture. Actually, how "fast" an algorithm runs is not a specific enough question; the real issue is how fast it runs *for a given set of input*.

(I can already see the flags going up in my more technical readers heads: "That is not an accurate way of explaning algorithmic complexity!" Hold your horses, guys. I'm getting there.)

It's pretty easy to explain the distinction I just made. Imagine if someone were to ask you, "How fast can you paint a house?" Your first obvious response would almost certainly *not* be: "About a week." How could you give an answer without knowing more context about what the person is asking? You'd need to know: How *large* of a house? What *kind* of house? Under what conditions? And so on.

But there's another, more important distinction between the concepts of *speed* and *complexity*. And this is the part that a lot of developers don't actually understand (though I'm sure all the developers reading this do!). To describe it, I'll give another (absurd) analogy.

### Choosing a Gym Membership

Let's say you decide to join a gym, and you have two choices. Gym A will charge you $100 every year that you have a membership with them. Gym B, on the other hand, charges a one-time fee of $1000 for joining. After that, though, they charge no recurring fees.

For the sake of illustration, let's say that whichever gym you choose, you will be a member with them for life. Put aside for now the fact that that isn't very realistic. My question to you is: which should you choose, given that you must choose one?

It isn't a hard question, really. Most of us have dealt with some decision like this at some point in our lives; or anyway, we can think logically enough to see that a one-time cost of $1000 is probably better than paying $100 *every year*, as the latter would likely amount to more than $1000 over the course of a lifetime.

To prove this intuition, let's suppose you have 25 more years to live. Then:

$100 &times; 25 years = $2,500

You would ultimately pay Gym A more than twice as much as you'd pay Gym B in this case. Pretty bad. But what if you had *50* more years to live? Then with Gym A you'd pay $5,000, more than *four times* as much as you'd pay with Gym B.

We're now honing in on what algorithmic complexity is really about. It is intended as a way of measuring **the cost of an algorithm relative to input size**. In the gym example, we could think of "Choose Gym A" or "Choose Gym B" as two separate algorithms, where the input size is the number of years you have a membership with either gym.

In the case of Gym A, doubling the number of years doubles the cost. So in terms of algorithmic complexity, we would say this is *O(n)*[^big-o-notation], which I read as "order of *n*" (the *n* represents whatever value you use to define input size--in this case, the number of years).

In the case of Gym B, doubling the number of years does what? Has no effect, actually. The cost is $1,000 regardless of whether you're with the gym for 1 year or 100 years. And so we would describe this "algorithm's" complexity as *O(1)*. Notice there is no *n* there, because the input size in this case does not impact the cost of the algorithm at all.

### Complexity Versus Suitability

Now, I've met plenty of engineers who mistake this to mean that *O(1)* is "better" or "faster" than *O(n)*. But that's not quite right. $1000 is a lot of money. Suppose I took away the restriction that you had to stay with either Gym A or Gym B for the rest of your life. If you were only to keep your membership for a few years, then Gym A would end up costing you *less* than $1000; and suddenly the *O(n)* option would be a smarter choice than the *O(1)* one.

And so there is often a judgment call involved in picking the right algorithm for a particular scenario. In the world of sorting algorithms, for instance (the topic I intend to write about next), you will often see cases of "hybrid" algorithms which start with some *O(n log n)* algorithm (like [Quicksort](http://en.wikipedia.org/wiki/Quicksort)) for large sets of input data, but then convert to a *O(n<sup>2</sup>)* algorithm (like [Insertion sort](http://en.wikipedia.org/wiki/Insertion_sort)) when the input size is small. In other words: preferring the cost structure of something like Gym B in general, but being open to joining something like Gym A if it's only for a short time.

### One Last Example

I should offer one more example of complexity, since I've only hit on two fairly easy-to-understand cases so far--*O(1)* and *O(n)*. For this example, I will refer to a common method people use to greet one another in groups.

Let's say Jack and Jill meet for the first time.

Here's one way it could go down: Jack says "Hi, I'm Jack," to which Jill responds, "Hello, I'm Jill," and they shake hands.

Two people, two introductions (Jack introducing himself to Jill and vice versa). Seems reasonably efficient, right?

Let's add two more people to the mix: Alice and Bob. Below is a quick list of the introductions that would occur in this group of four, following the same sort of greetings as above:

1. Jack-Jill
2. Jack-Alice
3. Jack-Bob
4. Jill-Jack
5. Jill-Alice
6. Jill-Bob
7. Alice-Jack
8. Alice-Jill
9. Alice-Bob
10. Bob-Jack
11. Bob-Jill
12. Bob-Alice

Whoa! We just went from two introductions to twelve! Clearly this method of greeting people would not be sustainable if the number of people grew much larger. (And yet, the Owambo people in Namibia greet one another in precisly this way--and to be honest, I quite like it. But that is a *completely* different topic.)

So, clearly this situation is different from the case of Gym A from my earlier example. Whereas with Gym A, the cost of membership grew *linearly* (in a straight line) over time, the number of greetings above basically explodes out of control if you add many more people to the setting. This is an example of an *O(n<sup>2</sup>)* algorithm--one in which the performance cost of the procedure in question grows *exponentially* with input size.

It probably isn't the best example I could have given, as it's not 100% obvious that the exponent should be 2 (4 squared is 16, not 12). If you want an explanation, I'll provide it in a footnote[^complexity-explanation].

Anyway, hopefully now you have a sense of what algorithmic complexity is about. If you only have a rough idea but don't feel like you totally understand it yet, that's OK; I will do my best to give better examples and provide better explanations as I move forward in this blog series.

And if you found this material mind-numbingly boring: don't worry, I will most likely break up the series with posts about other topics from time to time as well.

[^pretentious]: Yeah, I don't totally know why. To be fair, I find "industry" terms like *scalability* to be equally pretentious, for similarly inexplicable reasons.

[^big-o-notation]: This way of describing complexity is called [Big O notation](http://en.wikipedia.org/wiki/Big_o_notation), and it's probably one of the most common interview topics that I can think of for software engineers.

[^complexity-explanation]: Unless I'm mistaken, the greeting procedure really is O(n<sup>2</sup>). The reason is this. For every person you introduce into the group, that person has to greet everyone already in the group. So if the group consists of n people, and you add another person, right there that's n more introductions. But *in addition*, every person in the group also has to greet the new person; so that's *another* n more introductions. In total, the number of introductions will always be n<sup>2</sup> (every person greeting every other person), minus n since you don't greet yourself. So in the example I gave, 4 people made 12 introductions, which is 16 (4 squared) minus 4 since Jack did not introduce himself to Jack, etc.
