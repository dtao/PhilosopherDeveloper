**Update: Some time after writing this post, I created a [project on GitHub](http://dtao.github.com/NBinarySearch/) for this.**

Here's a problem I'm sure tons of developers have run into, resulting in much frustration.

Say you have a sorted list of some kind, but it's not a `List(T)`, and it's not an array. In other words, it's an `IList(T)` that you know is sorted. If you want to search for an item within that list, it makes sense to utilize a [binary search](http://en.wikipedia.org/wiki/Binary_search), rather than a linear search; but guess what? That doesn't exist in the .NET framework. There's `List(T).BinarySearch`, and there's `Array.BinarySearch(T)`, but there's no general `BinarySearch` (just like there's no general `Sort`).

One data structure where this proves particularly frustrating is `SortedList(TKey, TValue)`, because, although `SortedList(TKey, Value)` *does* have an `IndexOfKey` method, and this method *is* a binary search, it returns -1 if the value passed isn't found. This basically makes it a crippled version of `Array.BinarySearch(T)`, which actually returns the **negative bitwise complement** of the "next best" index (that of the first value greater than the value searched for) -- a useful little piece of information that allows you to write code like this:

~~~{: lang=csharp }
int closestIndex = Array.BinarySearch(myArray, someValue);
if (closestIndex < 0)
    closestIndex = ~closestIndex;
~~~

Now, why do you suppose `IndexOfKey` is inconsistent with `List(T).BinarySearch` and `Array.BinarySearch(T)`? Is it due to some subtle difference in implementation that is necessary for the internal structure of `SortedList(TKey, TValue)`?

Buh, no. Take a look at the source code for the `IndexOfKey` method using [Reflector](http://www.red-gate.com/products/reflector/), and what you'll find is this peculiar little bit of code:

~~~{: lang=csharp }
    int num = Array.BinarySearch<TKey>(this.keys, 0, this._size, key, this.comparer);
    if (num < 0)
    {
        return -1;
    }
    return num;
~~~

**Seriously**? You're telling me `IndexOfKey` *actually uses `Array.BinarySearch(T)`*, and just refuses to return the same value?

This is NOT ACCEPTABLE (to me, anyway). Thankfully, Reflector allows us to take a gander at the implementation of `Array.BinarySearch(T)` as well, which can be refitted to work on any `IList(T)`, no problem. (Believe me when I say this is **extremely preferable** to implementing one's own binary search... especially when you see how simple this implementation is.)

**Behold, a generic `BinarySearch` method that will work on *any* `IList(T)`, based on Microsoft's own `Array.BinarySearch(T)` implementation:**

(I've also included the obvious overloads.)

~~~{: lang=csharp }
public static int BinarySearch<T>(this IList<T> list, int index, int length, T value, IComparer<T> comparer) {
    if (list == null)
        throw new ArgumentNullException("list");
    else if (index < 0 || length < 0)
        throw new ArgumentOutOfRangeException(
            (index < 0) ? "index" : "length"
        );
    else if (list.Count - index < length)
        throw new ArgumentException();

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

public static int BinarySearch<T>(this IList<T> list, T value, IComparer<T> comparer) {
    return list.BinarySearch(0, list.Count, value, comparer);
}

public static int BinarySearch<T>(this IList<T> list, T value) where T : IComparable<T> {
    return list.BinarySearch(value, Comparer<T>.Default);
}
~~~

Feel free to add this code to any static helper class you like. I know I will.
