I've got a confession to make: I got a little carried away after [my last post](/posts/are-strings-really-immutable-in-net.html). In particular, I became somewhat obsessed with the following discovery: **Not only can you manipulate strings in-place in .NET, you can do so without the `unsafe` switch, and without any performance penalty whatsoever (as would typically be associated with any form of reflection)**.

Seriously? Yes.

There's this little-known method in .NET (well, little-known to most developers who work on your run-of-the-mill business applications): [`Delegate.CreateDelegate`](http://msdn.microsoft.com/en-us/library/53cz7sc6.aspx). What this method does, essentially, is provide direct access to a class method via a `MethodInfo` object, in the form of an appropriately-typed delegate.

In order to understand how this affects string manipulation in .NET, consider the fact that a `MethodInfo` object can represent *any* method: **public or non-public**.

In other words, this means you can access the `string.SetChar` method (totally private -- remember, the `System.String` class was designed to be immutable) *directly*, without the performance hit of using reflection by calling `MethodInfo.Invoke`.

To illustrate how this can be done, take a look at this completely evil static helper class I wrote: [EvilStringHelper](https://gist.github.com/3371692).

The `EvilStringHelper` class provides an extension method on `string` called `ReverseInPlace`. This method does exactly what it sounds like.

Now, to illustrate how well this method performs, I thought I'd compare it to its most obvious legal analogue: [`Array.Reverse`](http://msdn.microsoft.com/en-us/library/d3877932.aspx) (on a `char[]` array).

Take a look:

~~~{: lang=csharp }
class Program {
    const int N = 10000;
    const int L = 10;

    static void Main(string[] args) {
        var immutableStrings = new string[N];
        var mutableStrings = new string[N];
        var arrays = new char[N][];

        var rand = new Random();

        for (int i = 0; i < N; ++i) {
            var s = GetRandomString(rand, L);

            immutableStrings[i] = s;
            mutableStrings[i] = s;
            arrays[i] = s.ToCharArray();
        }

        TimeSpan immutableStringTime = TimeExecution(immutableStrings.Length, i => immutableStrings[i] = immutableStrings[i].ReverseOutOfPlace());
        TimeSpan mutableStringTime = TimeExecution(mutableStrings.Length, i => mutableStrings[i].ReverseInPlace());
        TimeSpan arrayTime = TimeExecution(arrays.Length, i => Array.Reverse(arrays[i]));

        Console.WriteLine("Took {0} ms to reverse {1} strings out-of-place.", immutableStringTime.TotalMilliseconds, N);
        Console.WriteLine("Took {0} ms to reverse {1} strings in-place.", mutableStringTime.TotalMilliseconds, N);
        Console.WriteLine("Took {0} ms to reverse {1} arrays.", arrayTime.TotalMilliseconds, N);
        Console.WriteLine();

        Console.WriteLine("First 10 reversal results (to verify proper reversal):");
        for (int i = 0; i < 10; ++i) {
            Console.WriteLine("{0}: {1} {2} {3}", i, immutableStrings[i], mutableStrings[i], new string(arrays[i]));
        }

        Console.ReadLine();
    }

    static TimeSpan TimeExecution(int count, Action<int> action) {
        var stopwatch = Stopwatch.StartNew();
        for (int i = 0; i < count; ++i)
            action(i);
        stopwatch.Stop();

        return stopwatch.Elapsed;
    }

    static string GetRandomString(Random rand, int length) {
        char[] chars = new char[length];

        for (int i = 0; i < length; ++i)
            chars[i] = (char)rand.Next(65, 91);

        return new string(chars);
    }
}
~~~

The output of the above code is pretty astounding:

~~~{: lang=text }
Took 3.1009 ms to reverse 10000 strings out-of-place.
Took 1.8825 ms to reverse 10000 strings in-place.
Took 1.7296 ms to reverse 10000 arrays.

First 10 reversal results (to verify proper reversal):
0: VTDTZOMEED VTDTZOMEED VTDTZOMEED
1: ZEQZBQHUMY ZEQZBQHUMY ZEQZBQHUMY
2: SLEXKVEZTI SLEXKVEZTI SLEXKVEZTI
3: IYJPLVIBAF IYJPLVIBAF IYJPLVIBAF
4: ZXSEVUTCBZ ZXSEVUTCBZ ZXSEVUTCBZ
5: EQAFJLNGPS EQAFJLNGPS EQAFJLNGPS
6: EMLKYPBSPB EMLKYPBSPB EMLKYPBSPB
7: AJFRGAWSPM AJFRGAWSPM AJFRGAWSPM
8: MWOTQZLGFF MWOTQZLGFF MWOTQZLGFF
9: WDBJJHTTOG WDBJJHTTOG WDBJJHTTOG
~~~

Do you *see* that? Reversing strings in-place turned out to be **almost as fast as reversing `char[]` arrays!** Yeah, that's pretty nuts. For something that's supposed to be completely and utterly illegal, it turns out string manipulation in .NET is actually ridiculously inexpensive. (Also notice that the fastest way I could think of to reverse a string the kosher way (i.e., out-of-place)--which itself includes some unsafe low-level performance optimizations with `stackalloc` and `fixed`--really can't compete with in-place reversal.)

By the way, if you peruse the `EvilStringHelper` class, you might notice that it does more than just `ReverseInPlace`. In particular, you might notice that it uses `Delegate.CreateDelegate` to provide direct access not just to the uber-private `string.SetChar` method, but to another, perhaps even *more* invasive little fellow: `string.SetLength`.

With these together, we end up with this shocking possibility: taking a string, and just flat-out **changing it to something completely different**.

Here's some example code that shows how messed up this gets:

~~~{: lang=csharp }
Console.WriteLine("Hello!");

"Hello!".ChangeTo("Goodbye!");
Console.WriteLine("Hello!");

"Hello!".SetChar(5, 'o');
"Hello!".SetChar(6, 'y');
Console.WriteLine("Hello!");

"Hello!".ReverseInPlace();
Console.WriteLine("Hello!");

string.Empty.ChangeTo("I am definitely not empty.");
"Hello!".ChangeTo("");
Console.WriteLine("Hello!");

Console.ReadLine();
~~~

Can you possibly guess what the above code outputs? Let me spare you the mind-tingling anticipation and just tell you:

~~~{: lang=text }
Hello!
Goodbye!
Goodboy!
!yobdooG
I am definitely not empty.
~~~

Just let that simmer. **Five consecutive calls to `Console.WriteLine("Hello!")` output five completely different strings.**

OK, I've definitely beat this topic to death. But you have to admit: it's pretty freaky.
