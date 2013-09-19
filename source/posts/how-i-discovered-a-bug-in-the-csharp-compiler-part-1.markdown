---
title: How I discovered a bug in the C# compiler, part 1
date: 2011-03-31
published: true
---

This is the story of **my epic adventure in discovering a bug in** (the latest version of) **the C# compiler**.

First of all, some background. I was working on a library, mostly for personal use, which was to include an enumerable collection type similar to `List<T>` or `T[]`. One of the goals of this library was to be *efficient*; so, naturally, for this type's enumerator I made the decision to create a mutable value type.

***Wait a minute!*** What's that, you say? *Mutable value types are **evil**!* Oh?

This is a topic for a whole other blog post; but just to give a mini-argument in *defense* of this decision, by way of example, let me point out one simple fact: **if you make the return value of `GetEnumerator` a *reference type*, then every `foreach` loop creates a new object to be garbage collected later**. Don't care? That's fine; I *did* care, so I took an alternate approach (which, incidentally, is the same approach utilized by the designers of the collections in the `System.Collections.Generic` namespace in the BCL).

For *my* `GetEnumerator`, I explicitly implemented both `IEnumerable.GetEnumerator` *and* `IEnumerable<T>.GetEnumerator` and made a public version of the method returning an `Enumerator<T>` struct, like this:

```csharp
public Enumerator<T> GetEnumerator()
{
  return new Enumerator<T>(this);
}

IEnumerator<T> IEnumerable<T>.GetEnumerator()
{
  return GetEnumerator();
}

System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
{
  return GetEnumerator();
}
```

This allowed my `Enumerator<T>` type to behave quite well when used in `foreach` loops without causing unnecessary garbage collection. And the fact that it was a mutable value type hardly mattered—just like it hardly matters for `List<T>.Enumerator`, `Dictionary<TKey, TValue>.Enumerator`, etc. (The only times when it hypothetically matters is when you pass an `Enumerator<T>` value to a method and for some reason *expect* the code within the method to affect the value outside that method's scope—but that's just insanity on your part!)

So I realize I could probably give a much more thorough explanation of that decision, but that'll have to wait for another day. For now, let's move on: so I had this mutable enumerator type. And naturally, since my goal was for this library to be high-quality, I decided to write some unit tests for it, my weapon of choice for that purpose being the same as everyone else's in the .NET world: [NUnit](http://www.nunit.org/).

Here is a critical excerpt from one of these unit tests:

```csharp
using (var enumerator = _array.GetEnumerator())
{
  int x;
  Assert.Throws<InvalidOperationException>(() => x = enumerator.Current);
  
  while (enumerator.MoveNext())
  { }

  var enumeratorObject = (IEnumerator)enumerator;
  enumeratorObject.Reset();
  Assert.IsTrue(enumeratorObject.MoveNext());
}
```

What the heck is the point of that test? I'm glad you asked! Actually, I'm not glad, because the question sort of makes me realize that I did something rather dumb. But this will be educational for us all; so allow me to explain.

As you may or may not know, the `IEnumerator<T>` interface "inherits" from the non-generic `IEnumerator` interface, which in turn includes a `Reset` method. Frankly, **this is insane**, and is explicitly implemented (meaning: hidden) by practically *all* `IEnumerable<T>` implementations I've ever seen, including those in the BCL (like the aforementioned `List<T>`, etc.), for that very reason.

I took the same path: I hid it. But I also did something stupid: I **also implemented it**.

What's so stupid about that? A couple of things. First and foremost, doing so violated the [YAGNI principle](http://en.wikipedia.org/wiki/YAGNI), in a truly spectacular way (YAGNI stands for "You ain't gonna need it"; this mantra is cited often amongst software engineers to remind ourselves that sometimes it makes no sense to build a particular piece of functionality, because nobody asked for it and it'll never get used). While I'm generally not one to blindly follow principles (at least I don't *think* I am), in this case it's almost painful to think about the irony of this choice. On the one hand I opted to *explicitly implement* a function, an act which basically says, <em>I want you **not** to use this so badly I'm going to make it invisible for you</em>; and on the other, I figured, *Eh, might as well make it work anyway*.

Don't get me wrong: when I say I "implemented" it, I don't mean to imply that I put any non-trivial amount of work into it. I didn't. Implementing a `Reset` method for this particular enumerator type basically looked like this:

```csharp
void System.Collections.IEnumerator.Reset()
{
  _index = -1;
}
```

But [just because something's easy to implement, that doesn't mean it isn't a mistake to do so](http://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare). If you're not expecting anyone to ever use it, just don't write it. It can only mislead and confuse others. That's all I'm saying.

The second reason it was stupid? I'll get to that.

What the test is supposed to *do* is this:

1. Make sure `Current` cannot be called before enumeration starts (throw an exception in this case).
2. Move to the end of the enumerator, then call `Reset` and verify that you can start enumerating again.

So, the code is written to do just that. We take this local enumerator value, we use it to enumerate whatever (until `MoveNext` returns `false`), and then we call `Reset` and verify that we can enumerate again. So it's a test on the `Reset` method, essentially. (Really, it's not a proper **unit** test at all. But once again: a topic for another post!)

Does it do what it's supposed to do?

...

...

...

...

...

Hmm...

...

...

...

What the heck is going on?

When I first wrote the above test, I clicked "Run" and waited 5 seconds. Then I waited 5 more seconds. Then another 10. And I started to think, *There is no way it's just taking Visual Studio (or NUnit) this long to load up; something is definitely wrong here*. (Unit tests should be *super* fast. Even more than 5 seconds for an entire suite of tests—at least for a project that isn't huge—should constitute a red flag.)

Something *was* wrong. I stepped through Visual Studio's debugger and found that the state of `enumerator` was not changing on consecutive calls to `MoveNext`. I would step into the method, see it increment the value of an `int` field, exit the method, and the field would be back to its original value.

To be honest, at first, I thought it had to do with NUnit. I thought, *NUnit* must be getting inside the byte code and fiddling with what I've written!

Nope. I put together a skeleton project with the same basic parts minus NUnit and tried again—same result.

So then I thought maybe it had something to do with a custom value type implementing `IDisposable`. So I tried this:

```csharp
struct Enumerator : IDisposable
{
    int _field;

    public int Increment()
    {
        return _field++;
    }

    public void Dispose()
    { }
}

using (var s = new SimpleStruct())
{
    Console.WriteLine("{0}, {1}", s.Increment(), s.Increment());
}
```

The above outputs `0, 1`. So that wasn't it either.

Long story short, I eventually discovered it was **the specific combination of mutating a value type inside a `using` statement *with* a closure** that caused the behavior I was seeing. So, in other words:

```csharp
// This will output 0, 1.
using (var s = new SimpleStruct())
{
    Console.WriteLine("{0}, {1}", s.Increment(), s.Increment());
}

// This, however, will output 0, 0.
using (var s = new SimpleStruct())
{
    // Note: all we're doing is DECLARING this;
    // it doesn't even get used!
    Func<int> closure = () => s.Increment();

    Console.WriteLine("{0}, {1}", s.Increment(), s.Increment());
}
```

Because this has turned into such a long post (or it feels like one, anyway), I'm going to pull a typical me and split it into two posts. This feels like a good stopping point; can any readers figure out why the behavior of the two blocks of code above would be different? In my next post I will give the full explanation (which I have verified with someone on the actual C# compiler team). So don't worry if you can't figure it out; the answer's on its way soon!
