This post continues from where [my last one](http://philosopherdeveloper.wordpress.com/2011/03/31/how-i-discovered-a-bug-in-the-c-compiler-part-1/) left off; but don't worry—I swear I'll make this one more less rambling and more comprehensible. And rest assured that I will actually get to the explanation this time!

So where did we leave off? We witnessed some truly bizarre behavior of a **mutable value type** within a **using statement** which also happens to include a **closure**. What does this look like?

How about instead of using a custom value type to illustrate, this time I'll show you what I mean with a type straight from the BCL itself (meaning, this guy was written by Microsoft folks, so you know it's not just something weird about the way *I* did things):

~~~{: lang=csharp }
var list = new List<int> { 1, 2, 3 };

// Criterion 1: within a using statement...
using (var e = list.GetEnumerator())
{
    // Criterion 2: ...which includes a closure...
    Func<int> closure = () => e.Current;
    
    // Criterion 3: ...a mutable value type...
    while (e.MoveNext())
    {
        Console.WriteLine(e.Current);
    }
}
~~~

**What do you think the above program will print?**

Well, if you were paying *attention* to my last post (and if not—honestly, I totally understand), you'd know the answer already. The above program outputs:

    0
    0
    0
    0
    0

...and on and on, ad infinitum.

Remember, this happens *specifically* when all three of the above criteria (reiterated in the code comments) are met. It does *not* happen when only one or two of those criteria are met.

Now let's get to the bottom of this. In order to do so, there are a few puzzle pieces we need to understand.

Puzzle Piece #1: How does the C# compiler implement closures?
-------------------------------------------------------------

This one's a head-scratcher for a lot of C# developers who've never really looked into the inner workings of closures. I'd say it's right up there with [iterator blocks](http://msdn.microsoft.com/en-us/library/dscyy5s0.aspx) when it comes to features that many .NET developers regard as "magical"; unlike, say, `foreach` or `using`, it isn't immediately *obvious* how such a feature could be built.

Well, this is how it works. Say I have a piece of code with a closure like this:

~~~{: lang=csharp }
int x = 0;

Action incrementX = () => x += 1;

incrementX();
incrementX();

Console.WriteLine(x);
~~~

As you can probably guess, the above code prints `2` to the console. How does this work? How does `incrementX` actually affect the value of `x`? If you're not scratching your head over this, you probably should be (unless you already know how closures work, in which case, you can just skip right ahead to the next section)! After all, suppose instead of using a closure, I used a method group:

~~~{: lang=csharp }
int x = 0;

Action incrementX = IncrementX;

incrementX();
incrementX();

Console.WriteLine(x);
~~~

Now ask yourself: is there **any conceivable way** that this slightly modified version of the first code snippet could do the same thing? **No**, absolutely not! No external method `IncrementX` could access the **local variable** `x` and modify its value (without taking `x` as a `ref` or `out` parameter, that is); so how does the *closure* do it?

The answer is that the C# compiler **transforms** the first code snippet in a very clever way, by "lifting" the variable `x` into a **field** of a **compiler-generated type**, like so:

~~~{: lang=csharp }
// This is just an example; in reality the compiler would choose a much more
// strange-looking name.
class IncrementXType
{
    public int x;
    public void IncrementX()
    {
        x += 1;
    }
}

// ...elsewhere
var obj = new IncrementXType();

Action incrementX = obj.IncrementX;

incrementX();
incrementX();

Console.WriteLine(obj.x);
~~~

See how that works? Now, instead of a *local* variable, `x` is a **field** of the compiler-generated `IncrementXType` class; meanwhile, the `incrementX` action becomes a simple call to the `IncrementXType.IncrementX` method.

Pretty clever, yet simple once you understand it. So that's the first piece of the puzzle.

Puzzle Piece #2: How *exactly* does a `using` statement work?
-------------------------------------------------------------

The typical C# developer's understanding of a `using` statement is that it takes a piece of code like this:

~~~{: lang=csharp }
using (var r = GetResource())
{
    // Do something with r.
}
~~~

...and translates it to something like this:

~~~{: lang=csharp }
Resource r; // where Resource implements IDisposable
try
{
    r = GetResource();
    // Do something with r.
}
finally
{
    if (r != null)
    {
        r.Dispose();
    }
}
~~~

Well, that's *basically* correct; but there's a limitation on the `using` statement a lot of developers don't know about. It's in section 8.13 of the C# specification—the section on `using` statements:

> Local variables declared in a resource-acquisition are read-only, and must include an initializer. A compile-time error occurs if the embedded statement attempts to modify these local variables (via assignment or the `++` and `--` operators), take the address of them, or pass them as `ref` or `out` parameters.

Hmm, so what does that tell us? Clearly, I can't do this...

~~~{: lang=csharp }
using (var r = GetResource())
{
    r = new Resource();
}
~~~

That is explicitly disallowed in the spec (I'm not allowed to modify the variable `r` via assignment). I also couldn't do `r++` or `r--` (if I'd defined those operators). **But there's a hole here.** The spec doesn't say anything about mutating the state of `r` through a method (like `MoveNext`!). Therefore this *is* allowed:

~~~{: lang=csharp }
using (var e = new List<int> { 1 }.GetEnumerator())
{
    e.MoveNext();
    Console.WriteLine(e.Current);
}
~~~

The above code works just fine. The value stored at `e` is modified, and the output is `1`.

So how is this even a piece of the puzzle? It seems the restrictions on `using` quoted above don't actually contribute to an explanation of the odd behavior we've seen.

Well, they do. But in order to understand how, we need to reveal the third and final piece of the puzzle.

Puzzle Piece #3: What happens with `readonly` value type fields?
----------------------------------------------------------------

Let's say I have *this* piece of code now:

~~~{: lang=csharp }
class EnumeratorBox<T>
{
    public readonly List<T>.Enumerator Enumerator;
    public EnumeratorBox(List<T> list)
    {
        Enumerator = list.GetEnumerator();
    }
}

// ...elsewhere
var list = new List<int> { 1, 2, 3 };
var box = new EnumeratorBox<int>(list);

// Note: box.Enumerator is a FIELD, not a PROPERTY, so we are theoretically
// accessing the field directly here (not a copy of it).
while (box.Enumerator.MoveNext())
{
    Console.Write(box.Enumerator.Current);
}
~~~

In a somewhat mysterious fashion, the above code does *not* print `123` like you might expect (I know *I* would). The fact that the `Enumerator` field is `readonly` means that all method calls on that "field" actually operate on a *copy*, and not on the "field" itself (in a way, this makes perfect sense, as it ensures that the field really *is* read-only). So calling `box.Enumerator.MoveNext` actually *does nothing* to `box.Enumerator` itself.

In this sense it's almost as if declaring a field `readonly` is like doing this:

~~~{: lang=csharp }
class TypeWithReadonlyField
{
    // Obviously this keyword does not exist; let's just pretend that it does
    // and that it means "only accessible by the compiler."
    superprivate int __readOnlyField;
    
    private int _readOnlyField
    {
        get { return __readOnlyField; }
    }
}
~~~

The key takeaway here is that when a field is `readonly`, you can't really *get* at it directly. If you *could*, it wouldn't *really* be read-only, since you could call a method on it that might mutate its state.

How it all fits together
------------------------

By now you may have put these puzzle pieces together in your head already; but in case you haven't, or you're still sort of working it out, here's the full picture. It's actually quite straightforward, now that the above puzzles pieces are all laid out.

**First**, we go back to the way closures are implemented. Remember that local variables are "lifted" to fields of compiler-generated classes.

**Second**, recall that the `using` statement is defined such that the local variable used to point to the acquired resource is *read-only* within the `using` statement itself.

*Therefore*, when the compiler sees a closure within a `using` statement, <strong>it "lifts" the local variable referenced within the closure to a `readonly` field of a compiler-generate class!</strong>

So this:

~~~{: lang=csharp }
var list = new List<int> { 1, 2, 3 };

using (var e = list.GetEnumerator())
{
    Func<int> closure = () => e.Current;
    
    while (e.MoveNext())
    {
        Console.WriteLine(e.Current);
    }
}
~~~

...becomes (something like) *this*:

~~~{: lang=csharp }
class EnumeratorBox<T>
{
    public readonly List<T>.Enumerator Enumerator;
    public EnumeratorBox(List<T> list)
    {
        Enumerator = list.GetEnumerator();
    }
}

// ...elsewhere
var list = new List<int> { 1, 2, 3 };

EnumeratorBox<int> box;
try
{
    // The closure below caused e to be "lifted" to a field
    // of box.
    box = new EnumeratorBox<int>(list);
    
    // Then the closure accesses this field, which is readonly
    // (because we're in a using statement).
    Func<int> closure = box.Enumerator.Current;
    
    // Subsequently, method calls actually operate on a COPY
    // of this field.
    while (box.Enumerator.MoveNext())
    {
        Console.WriteLine(box.Enumerator.Current);
    }
}
finally
{
    if (box != null)
    {
        ((IDisposable)box.Enumerator).Dispose();
    }
}
~~~

Did you follow all that? Yeah, it's pretty complicated. But like I said, once all the pieces are in place, it's actually not so hard to see what's happening.

How do I know this is what's actually happening? Because [it was confirmed by Eric Lippert](http://stackoverflow.com/questions/4642665/why-does-capturing-a-mutable-struct-variable-inside-a-closure-within-a-using-stat/4688670#4688670), of course!

And thus ends my story of discovering a bug in the C# compiler. So basically, if you ever find yourself debugging some piece of code where your local value type variable refuses to be mutated, *and* you're inside a `using` statement, *and* you've got a closure in there that closes over that local variable, now you'll know why!

Truly epic, I know.
