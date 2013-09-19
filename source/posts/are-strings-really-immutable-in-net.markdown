---
title: Are strings REALLY immutable in .NET?
date: 2010-05-28
published: true
---

**Edit: [I wrote a follow-up](/posts/string-manipulation-in-net-epilogue.html) to this.**

True or false:  
It's possible to reverse a string in-place in .NET.
{: .large }

The **beginner** says: True! I could do it like this:

```csharp
static void ReverseString(string str) {
    int i = 0;
    int j = str.Length - 1;
    
    while (i < j) {
        char temp = str[j];
        str[j--] = str[i];
        str[i++] = temp;
    }
}
```

I've got news for you, friend: **that will not work**. It won't even *compile*, in fact. While you can *access* the characters in a string by index, you cannot *set* them.

The **intermediate developer** says: False! [Strings are immutable](http://msdn.microsoft.com/en-us/library/system.string.aspx#remarksToggle) in .NET.

Good answer! It's a well-known fact (among experienced .NET developers) that the `System.String` class is designed to be immutable; you cannot change an instance once it has been instantiated.

This is what often confuses rookie developers who try to write code like the following and fail to understand why it doesn't work:

```csharp
string str = "Hello!";

str.Replace('H', 'J');

Console.WriteLine(str);
```

The above program outputs "Hello!", not "Jello!" as some might expect. This is because the `String.Replace` method *returns a new string* resulting from the replacement operation. In other words, the program could be "fixed" as follows:

```csharp
string str = "Hello!";

// notice: here we are assigning str
// to a new object
str = str.Replace('H', 'J');

Console.WriteLine(str);
```

This is standard behavior for any immutable type (which includes all of the primitive types in .NET such as `int`, `double`, `bool`, etc., as well as `DateTime` and `string`).

OK, so, since strings are immutable, clearly you can't reverse one in-place, right? So the answer must be false?

The **master**[^master] says: **True**.

<strong><em>Whaaaaaaaaaaat?!?!?</em></strong>

OK, first of all, you can use the `fixed` keyword in C# to access a string from a char pointer. This means that if you're compiling in `unsafe` mode, reversing a string in-place actually becomes totally straightforward:

```csharp
static unsafe void ReverseString(string str) {
    int i = 0;
    int j = str.Length - 1;

    fixed (char* fstr = str) {
        while (i < j) {
            char temp = fstr[j];

            fstr[j--] = fstr[i];
            fstr[i++] = temp;
        }
    }
}
```

What's that, you say? Nobody compiles with the `/unsafe` switch? Fair enough. But did you know it's actually *still* possible to reverse a string in-place in .NET, **without compiling in `unsafe` mode**? It's sad, but true; and it's all thanks to an evil little gremlin named "Reflection":

```csharp
static void ReverseString(string str) {
    int i = 0;
    int j = str.Length - 1;

    MethodInfo setter = typeof(string).GetMethod(
        "SetChar",
        BindingFlags.Instance | BindingFlags.NonPublic
    );

    while (i < j) {
        char temp = str[j];

        setter.Invoke(str, new object[] { j--, str[i] });
        setter.Invoke(str, new object[] { i++, temp });
    }
}
```

So, actually, **yes, it is possible to reverse a string in-place in .NET, even when compiling without the `/unsafe` switch**. It's evil, and you should **never** do it; but it's *possible*.

By the way, in case you're not grasping why this is so evil, let me just offer a quick little illustration to show why having a method like this would be absolutely horrible. (This also explains pretty clearly why strings are immutable in .NET in the first place.)

```csharp
Console.Write("What's your name? ");
string name = Console.ReadLine();

string reverse = name;
ReverseString(reverse);

Console.WriteLine(
    "Your name is {0}, which spelled backwards is {1}.",
    name,
    reverse
);
```

The output of the above program (for "Daniel") is this:

    Your name is leinaD, which spelled backwards is leinaD.

Oh crap! Well, that makes sense, because we set `name` and `reverse` to the same object. But what about this?

```csharp
string x = "Hello";
string y = "Hello";

ReverseString(x);

Console.WriteLine(y);
```

At least *that* should output "Hello", right? Since `x` and `y` are two different objects?

Nope. [String literals are interned in .NET](http://msdn.microsoft.com/en-us/library/system.string.intern.aspx), which means that `x` and `y` in the above code are *actually the same object*; so when you reverse `x` in-place, you've also reversed `y`.

"Cut it out!" you are saying. "That's enough! This is insanity! I *get* it already!"

Do you, though? **DO YOU?**

Just to make sure, let me throw one more insane little bit of code your way. Just to make sure you fully, completely understand how weird this is.

**What do you think this code will output?**

```csharp
ReverseString("Hello!");

Console.WriteLine("Hello!");
```

"No," I hear you saying. "It can't be... surely not..."

Oh, but it can. And it is.

    !olleH

**That's what the above code outputs!** I swear! Try it for yourself and see!

In short, then: yes, it's possible to reverse a string in-place in .NET. But **DON'T EVER, EVER DO IT**. (In other words, do as I say, not as I do. I am sharing my foolhardy experiment with you so that you don't have to experience such terror for yourselves.)

[^master]: This is meant to be tongue-in-cheek, by the way. I am definitely *not* claiming to be a .NET master.
