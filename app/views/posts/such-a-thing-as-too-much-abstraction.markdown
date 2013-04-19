A couple days ago I was [pairing](http://en.wikipedia.org/wiki/Pair_programming) with another developer on my team, and at one point we had code with these characteristics:

- A class called `Stuff`
- A method (which utilized this class) called `doStuff`

Naturally, we changed these names later. The placeholder names were just that: **placeholders**, allowing us to get down to writing code right away without having to deliberate too much about names first.

However, we both kind of agreed that when the time finally *did* come for us to give names to this class and its accompanying method, we were a bit sad to say goodbye to `Stuff` and `doStuff`. This is because software engineers are **obsessed with abstraction**: the less we have to know about the implementation details of any particular software component, the happier we are. We just want to be able to view code as consisting of big functional blobs with no nitty gritty details exposed and very simple mechanisms for interaction.

In a software engineer's dream world, every software library would consist of extraordinarily simple APIs comprising, I don't know, two or three classes with three or four methods each. So the idea of having a class called `Stuff` and being able to call a method simply named `doStuff` is kind of tantalizing, in a way:

Engineer 1: So what does this piece of code do?
Engineer 2: It starts doing some stuff for a while, then it stops.
Engineer 1: OK... but what does it *actually* do?
Engineer 2: Are you asking me for implementation details? Get out of my face!

Why do I bring this up? Well, just today [a user on Stack Overflow asked](http://stackoverflow.com/questions/5326874/why-would-i-use-enumerable-elementat-versus-the-operator) about the [`ElementAt`](http://msdn.microsoft.com/en-us/library/bb299233.aspx) method, specifically wondering when it should or should not be used in place of the indexer for a collection type implementing `IList<T>`. *My* opinion is that `ElementAt` does not make sense in this case, since it is not needed. My view is that it makes sense to use `ElementAt` in those (fairly rare) cases when you want to access a specific item in a non-indexed collection, such as the *second* item in a `Queue<T>` (so, if you want the equivalent of `Peek` for the item *after* the next item in the queue):

~~~{: lang=csharp }
var random = new Random();
var queue = new Queue<int>();
for (int i = 0; i < 10; ++i)
{
  queue.Enqueue(random.Next());
}

int firstUp = queue.Peek();
int nextUp = queue.ElementAt(1);
~~~

Not surprisingly, [mine was not the only viewpoint on the subject](http://stackoverflow.com/questions/5326874/why-would-i-use-enumerable-elementat-versus-the-operator/5326989#5326989). An opposing view was that `ElementAt` provides a nice abstraction around the concept of random indexed access, which is actually optimized to take advantage of the `IList<T>` interface when available; and so it makes sense to use it *whenever you want*.

Whoa, whoa, whoa! There comes a point when abstractions stop being useful, you know! Let me ask you this: when, aside from something like the scenario I described above, would you want to use `ElementAt` purely as an abstraction? When you want indexed access, right? And when does it make sense to use indexed access, but it *doesn't* make sense to require an `IList<T>`?

I have trouble imagining code where using `ElementAt` as an abstraction provides any benefit over defining a method to accept an `IList<T>` and use its indexer directly. But I can *definitely* think of some scenarios where it would be **a terrible idea**.

For instance, say I wrote a `BinarySearch` method for any sorted `IList<T>` (I [sort of did, actually](http://philosopherdeveloper.wordpress.com/2010/05/24/whats-annoying-about-sortedlisttkey-tvalue-indexofkey-a-k-a-whats-sweet-about-reflector/)):

~~~{: lang=csharp }
public static int BinarySearch<T>(this IList<T> list, int index, int length, T value, IComparer<T> comparer) {
  // Argument validation

    int lower = index;
    int upper = (index + length) - 1;

    while (lower <= upper) {
        int adjustedIndex = lower + ((upper - lower) >> 1);
        int comparison = comparer.Compare(list[adjustedIndex], value);
        if (comparison == 0)
            return adjustedIndex;
        else if (comparison < 0)
            lower = adjustedIndex + 1;
        else
            upper = adjustedIndex - 1;
    }

    return ~lower;
}

// Useful overloads
~~~

Now, let's think about what it means to use `ElementAt` as an abstraction. It would allow us to define `BinarySearch` to take a less specific colletion type, right? Just `IEnumerable<T>`? Cool!

So:

~~~{: lang=csharp }
public static int BinarySearch<T>(this IEnumerable<T> list, int index, int length, T value, IComparer<T> comparer) {
  // Argument validation

    int lower = index;
    int upper = (index + length) - 1;

    while (lower <= upper) {
        int adjustedIndex = lower + ((upper - lower) >> 1);
        int comparison = comparer.Compare(list.ElementAt(adjustedIndex), value);
        if (comparison == 0)
            return adjustedIndex;
        else if (comparison < 0)
            lower = adjustedIndex + 1;
        else
            upper = adjustedIndex - 1;
    }

    return ~lower;
}

// Useful overloads
~~~

Nice, so now I can perform a binary search on any sequence! Sweet...

...

...except...

...hmm, does this actually make sense?

~~~{: lang=csharp }
var linkedList = new LinkedList<int>();
for (int i = 0; i < 1000000; ++i)
{
  linkedList.AddLast(i);
}

// How long will this take?
int index = linkedList.BinarySearch(new Random().Next(1000000));
~~~

Running the equivalent of the above code 10 times for a `LinkedList<T>` took about **14 seconds**. For a `List<T>` it took **17 *milliseconds*.**

*Yeah, so it's optimized for `IList<T>`, like I already said. What's your point?*

My *point* is that **it never makes sense to perform a binary search unless you've got random access**; the whole *purpose* of it is that it beats a linear search. If for a particular data structure it is *guaranteed* to perform the same or *worse* than a linear search, **don't allow it for that data structure**. Just require an `IList<T>` and be done with it.

This might seem like a contrived example, but I challenge you to come up with a counterexample—even a contrived one!—where the abstraction of using `ElementAt` is actually *useful*. That is, when *would* it make sense to rewrite code that would ordinarily require an `IList<T>` to instead require only an `IEnumerable<T>`?

Here's another way I can explain where I'm coming from (by analogy—surprise!).

Let's say you live across the street from a place called **The Everything Store**. This is a warehouse where they pride themselves on selling basically *everything* (like Target or Walmart, only *better*). The funny thing about this store is that if you walk in, they actually just stock household goods: lamps, picture frames, clocks, etc. That's all they've got on their shelves. If you want anything *else*, then yeah, you can *get* it; but you have to order it through their extensive electronic catalog and then come back a few days later to pick it up.

You might say, "This store is great! I can buy everything I could possibly want from them! *And*, if I actually want household goods, they're optimized for that scenario: I can just walk into the store, find what I want right there on the shelf, and walk out with it on the same day!"

Uh, yeah, but... what you've just described doesn't really deserve the title "Everything Store"; it's really just a *household goods store* that, through a monumental feat of abstraction, has positioned itself as something far more general than it really is. If you want a new lamp or a clock, then sure, go there. Otherwise, go to a store that actually *has* the stuff you want to buy.

So I disagree that it makes sense to use `ElementAt` in general as a way of abstracting indexed access without requiring an `IList<T>` implementation. It's just like the "Everything Store": it looks great from the outside, but the abstraction it provides is really just a disguise allowing it to masquerade as something it's not.
