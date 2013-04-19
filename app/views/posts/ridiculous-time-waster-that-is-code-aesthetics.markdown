Sometimes it drives me nuts how passionate software engineers can be about things that have nothing to do with the functionality of their software.

*Code aesthetics* is one such thing. (Those of you non-programmers out there: yes, believe it or not, this *is* a big deal to some engineers.) Developers will argue for hours about whether one way or another of writing code is "better," for all sorts of absurdly subjective reasons. Among them:

- "It's more readable." I always find this one kind of funny as it completely [begs the question](http://begthequestion.info/). It's like saying, "I personally prefer the way this one looks because it's better-looking." Of course *you* think the code is more readable your way; that's why we're arguing!
- "It's more concise." This is another popular one. Interestingly, it is often (though not always) in direct opposition to the preceding point.
- "It's more obvious." This one I actually can sympathize with. However, I *do* hate it (give me a few more years in the industry and maybe I'll change my mind) when the "more obvious" version of a routine is preferred despite the fact that it's also the "more stupid" version. I only agree with going with the "obvious" approach when the difference between *it* and an alternative with superior performance (for example) is negligble, *or* when the "superior" version is incredibly nasty (e.g., uses pointer hacks or some obscure implementation detail to accomplish a goal).

Here are some common examples of aesthetic issues which .NET developers argue about:

~~~{: lang=csharp }
// Whether or not to use var for locals.
var puppy = GetPuppy();
Puppy puppy = GetPuppy();

// Whether to put the statement in a one-line block on the same line,
// on the next line, or within braces.
if (someCondition) break;
if (someCondition)
    break;
if (someCondition)
{
    break;
}

// Whether to put the opening brace on the same line or the following line
// after a statement block.
foreach (Kitty k in kitties) {
    k.Purr();
}
foreach (Kitty k in kitties)
{
    k.Purr();
}

// Whether to put constants on the left or right of conditionals.
if (0 == value) { }
if (value == 0) { }
~~~

The above are just a few examples. I've got another, which a coworker and I discussed just today (*very* briefly, thankfully): whether methods that return `boolean` values (I'm actually on a Java project—**can you believe it?**) should be phrased in the *positive* or in the *negative*.

Well, that's not entirely fair. The truth is that my rule of thumb has basically always been to use a positive phrasing and then negate it from the calling side when necessary. For instance:

~~~{: lang=java }
public boolean isDone() {
    return someMember.doSomeLogic();
}

// Code elsewhere
if (!someObject.isDone()) {
    doSomething();
}
~~~

To me, the above is **perfectly reasonable**. But I discovered today, to my surprise, that some developers don't think so. In fact, not only did my colleague *not* like the above (he preferred to call the method `isNotDone` in the first place), he recalled a little coding exercise he and another colleague performed for a Ruby project some time ago that honestly made me shudder. Apparently, in order to avoid the dreaded `!` symbol (gasp!), they actually wrote a module to dynamically generate [duck typed](http://en.wikipedia.org/wiki/Duck_typing) methods that would return the opposite result of whatever was being called, e.g.:

~~~{: lang=ruby }
if someObject.not.done
    # oh my goodness
end
~~~

"Seriously?" I asked him. "Just to avoid having to type '!'?"

Apparently, some people care *that much*.
