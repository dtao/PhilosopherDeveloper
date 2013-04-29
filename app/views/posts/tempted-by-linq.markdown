LINQ is a really awesome tool for .NET developers, just like a hammer is a really awesome tool for a carpenter. But here's the thing.

Sometimes I feel like, before LINQ, a .NET developer was akin to a carpenter without a hammer. And then the hammer came along, and carpenters the world over *totally* fell in love with it. It helped them get so many tasks done more quickly than they could before. But this led them to start using hammers in totally unintended ways.

These carpenters would attend meetings where they would ask questions like, "Does anyone know how to use a hammer as a level?" and "Who can show me how to tighten bolts using my hammer?" Some of the older carpenters at these meetings would shake their heads knowingly, while others would enthusiastically chime in with their clever and novel uses for hammers.

Guys, LINQ is just **one tool**. A carpenter wouldn't use a hammer for every single task he needs to accomplish. Likewise, we should not be using this *one* feature of .NET to do everything having anything to do with collections within the language.

This is *particularly* important to me, because I work on code that must be high-performance all the time at work. I remember when I first introduced my teammates to LINQ; one developer on the team in particular got very excited and started using LINQ extension methods all over the place. For example we would find code like this:

~~~{: lang=vbnet }
For Each prod As Product In Products.Where(Function(p) p.IsQuoting).OrderBy(Function(p) p.Expiration).ThenBy(Function(p) p.Strike)
    prod.SendQuotes()
Next
~~~

Yeah, that's *terrible*. **It's like using a hammer to perform brain surgery.** But how was my teammate to know, or even suspect there was anything wrong with what he was doing?

I think the .NET culture has embraced LINQ a *little* too excitedly, at least when it comes to code where performance matters. Joe Duffy [agrees with me](http://www.bluebytesoftware.com/blog/PermaLink,guid,4db70333-295b-441f-80f9-21b90bd44287.aspx), calling LINQ-to-Objects a technology that "makes writing inefficient code very easy."

Take [this Stack Overflow question](http://stackoverflow.com/questions/4903166/c-string-split-question), for example. A user asked for a way to take a string, split it on a given delimiter (e.g., a whitespace character), and remove the second element in the resulting `string[]` array.

The top-rated answer to the question looks like this (I in no way intend to disparage this answer—it is a perfectly acceptable solution, and the question did not specify performance as a concern—but only to use it as an illustration of how inefficient LINQ *can* be):

~~~{: lang=csharp }
string[] elements = input.Split(delimiter).Where((s, i) => i != 1).ToArray();
~~~

This looks nice and all. But now let's frame it in the form of **plain English instructions**; then you tell me if it sounds efficient to you.

1. Take this big block and break it into smaller blocks in such and such a way; then put all the little blocks into a box.
2. Now, *look at each of the blocks in the box* one by one, and give each block a number—zero, one, two, etc. As you are doing this, skip the block numbered "one."
3. As you proceed through step 2 above, do the following: put the first four (or so) blocks into a box. Then, if there are more than four blocks, take those four out and start putting them into a *new* box big enough for *eight* blocks; and continue putting more blocks into *that* box. Then, if there are more than *eight* blocks, take them all out *again* and put them into a box big enough for *sixteen* blocks... etc. Keep doubling the size of the box you're putting blocks into until you've got all the blocks in one box.
4. At the end of all this, see how many blocks you have in your final box. If it's not *exactly* as many as the box can hold, then get a new box precisely big enough for all the blocks—not too small, and no bigger than necessary—and put all the blocks in there.

So you see what I mean? Between steps 2 and 4 above, the instructions tell you to get box after box after box, for *no good reason*, **when you could clearly just use a box big enough to hold *one less* block than the original box to begin with**, thereby skipping the obnoxiously long and complicated process indicated in step 3. (By the way, yes, I am describing how `ToArray` works.)

The inefficiency here is a generic one: it is simply the process of allocating an array that holds every element of *another* array, minus one. My implementation of this, which doesn't do *nearly* as much work as the above code—and which I suggested in response to the Stack Overflow question—is as follows:

~~~{: lang=csharp }
public static T[] SkipElement<T>(this T[] source, int index)
{
    // Leaving out null/bounds checking for brevity.
    T[] array = new T[source.Length - 1]; // ONE array allocation (we know how big it should be!)
    Array.Copy(source, 0, array, 0, index);
    Array.Copy(source, index + 1, array, index, source.Length - index - 1); // ONE copy, total
    return array;
}

// Elsewhere
string[] elements = input.Split(delimiter).SkipElement(1);
~~~

Plenty of developers, if they were to read this post, would roll their eyes and say that worrying about this in the first place constitutes premature optimization. And that'd be a fair point in the majority of cases. But I see no reason why we need to automatically jump to LINQ every time we see a problem like this. I mean, look at that implementation above; is it *really* so complex? Is it a maintenance headache? Personally, I don't think so.

I, for one, would prefer not to be the sort of carpenter who reaches straight for his hammer just because he *can*, or because he *likes* it, when there's another tool that will help him **do the same job better**.

Just my two cents.
