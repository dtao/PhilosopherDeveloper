The following is the most recent post from my blog, **The Philosopher Developer**, written on April 23, 2013.

***

In defense of global state
==========================

I bet you weren't expecting any sane developer to make this argument!

Well, to be fair, the title of this post is somewhat intentionally provocative[^provocative-title]. But anyway, you're here now; so it served its purpose. And make no mistake: I *am* going to defend global state--just possibly not in quite the way you might be expecting.

What we mean by global state
----------------------------

First, some background. If you're reading this, there's a good chance you're a developer so I probably don't have to explain this; but I think there are at least two forms of **global state** that come to mind in software. One form is global **variables**--values that are accessible and can be changed, globally, anywhere, by all of the code in a project. The other is **constants**--values that may be *accessible* to potentially every part of a program, but cannot be changed.

These aren't the only kinds of global state, though. I would argue that *globality*--apparently that's [actually a word](http://dictionary.reference.com/browse/globality)[^globality]--is a *continuous* (as opposed to discrete or binary) property. Meaning: it isn't just variables and constants; there are things in between as well. There are some values that will *definitely* change (e.g., a local variable called `sum`), there are some that *might* (e.g., instance variables), others that probably won't (static configuration values), and so on. There is also the question of the scope of a variable's *impact*, which is not the same as how widely it happens to be accessible. One bit of state might define the language or dialect in which an entire UI is presented, for example, while another may simply indicate whether or not to display a certain dialog when an application loads.

So there's some sort of spectrum here (you know [how I like spectrums](/posts/am-i-an-engineer.html)), or at the very least there's more than just one or two kinds of global state.

What's wrong with global state?
-------------------------------

Global state has got a pretty bad rap in most of the software development community. For one, use of global state can make it difficult to reason about a section of code: what's happening *locally* may be clear, but the far-reaching *ramifications* of the code probably aren't. Global state also tends to fuel the proliferation of implicit dependencies between software components, making it increasingly difficult to "pull apart" those components down the line and resulting in code that less testable and less reusable.

Those are a couple of reasons nobody likes global state, and there are plenty more. I'm not going to claim they're invalid. But a recent tweet by my old teammate [Scott Muc](http://scottmuc.com/) got me thinking on this topic, and it compelled me to write this post.

<blockquote class="twitter-tweet"><p>Sometimes convention based frameworks feel like it's just 0 param methods using hidden global variables.</p>&mdash; Scott Muc (@ScottMuc) <a href="https://twitter.com/ScottMuc/status/326481455804997632">April 22, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Embedded in Scott's statement is the shared understanding that global variables are A Bad Thing[^a-bad-thing]. When everyone takes that for granted, then you can say things like "blah blah blah global variables" and your audience will intuitively grasp that *global variables* is just a proxy for *something bad*. Similarly, if I said, "Feature X is the `goto` of Language Y," you would understand I'm saying [something bad about Feature X](http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html).

Now, regarding the kinds of global state I described earlier: I would guess that most of us are much more sympathetic to *constants* than to global *variables*. They at least don't cause the same action-at-a-distance confusion that global variables can. However, they do still exhibit the other drawback I mentioned of global state: that dependence on it may spread through a code base, inhibiting reusability.

So we like constants more than global variables, but we're not exactly thrilled about either of them. What does this imply about the spectrum of globality? Do we start at "good" and gradually move towards "bad" the more scope and impact some bit of global state has?

More to the point: if I acknowledge the drawbacks of global state, why do I also like convention-based frameworks? What might I disagree with about Scott's tweet?[^to-be-fair-to-scott]

Deciding what should be global
------------------------------

I think the real question with global state comes down to considering a section of code, and deciding *what should be flexible*. That may sound obvious on one hand--variables are things that change, so we use variables where we want to allow flexibility--but on the other, I suspect the idea of making this decision feels somewhat foreign to lots of developers. Many of us have come to accept, almost without thinking, that flexibility is an inherent good. Invariant, inflexible aspects of a software system are perceived as weaknesses or poor design. Flexibility, modularity, reusability: these are all sort of rolled up into one big bundle of attributes we automatically ascribe to any "good" or "well-written" software.

But fundamentally, we human beings are limited in our mental capacity. Infinitely flexible systems are not in our best interest, for the simple reason that flexibility demands our attention[^flexibility-demands-attention]. And so choosing the scope of a variable is really a matter of deciding **at what point some information should require our attention**, and at what point we should be able to take it for granted.

There's a great section of [Gödel, Escher, Bach](http://www.amazon.com/Gödel-Escher-Bach-Eternal-Golden/dp/0465026567/) by Douglas Hofstadter that I think captures this idea quite beautifully. It is a chapter in which some characters tinker with a magical TV set that can alter the reality of a football game they're watching. By turning some knobs, they can see players alternately catching the ball or fumbling, scoring a touchdown or getting blocked, etc. One character fiddles with the knobs very aggressively and the game changes much more dramatically, to everyone's surprise.

Hofstadter goes on to compare the functioning of these knobs on the TV to "constants," "parameters," and "variables"--terms that should be quite familiar to any software developer:

> We build up our mental representation of a situation layer by layer. The lowest
> layer establishes the deepest aspect of the context--sometimes being so low that it cannot
> vary at all. For instance, the three-dimensionality of our world is so ingrained that most
> of us never would imagine letting it slip mentally. It is a constant constant. Then there are
> layers which establish temporarily, though not permanently, fixed aspects of situations,
> which could be called background assumptions--things which, in the back of your mind,
> you know can vary, but which most of the time you unquestioningly accept as
> unchanging aspects. These could still be called "constants". For instance, when you go to
> a football game, the rules of the game are constants of that sort. Then there are
> "parameters": you think of them as more variable, but you temporarily hold them
> constant. At a football game, parameters might include the weather, the opposing team,
> and so forth. There could be--and probably are--several layers of parameters. Finally, we
> reach the "shakiest" aspects of your mental representation of the situation--the variables.
> These are things such as \[a player\] stepping out of bounds, which are mentally "loose"
> and which you don't mind letting slip away from their real values, for a short moment.

Really, I probably could have skipped everything I've written so far and just started with that Hofstadter quote. But what's done is done, so let's move on now.

The relationship between explicit and global
--------------------------------------------

It's very common for developers coming from more "conventional" backgrounds (har har) to be initially perplexed by the "magic"[^stages-of-convention-based-frameworks] of convention-based frameworks such as [Rails](http://rubyonrails.org/). This is a natural reaction for many of us with previous experience working on [big balls of mud](http://en.wikipedia.org/wiki/Big_ball_of_mud), with enough global state to give us nightmares. But when you consider the opposite approach--explicit configuration at every level--I think what you'll find is a lot of boilerplate[^boilerplate] and an indefensible number of [YAGNI](http://www.xprogramming.com/Practices/PracNotNeed.html) violations.

Which brings me to an objection I've been sensing through the ether while writing this. Somewhere out there, one of you is yelling at the screen: *Global values and implicit values are not the same thing!* If it seems to you that I've been conflating the ideas of "global state" with "hidden information" until now, that's probably fair. But now chew on this for a second: **the more global something is, the less explicit it should have to be**.

Here's one of probably millions of examples I could give: when you walk up to someone in the U.S.[^sorry-non-american-readers], I'm guessing you don't start the conversation by asking, "Do you speak English?" The vast majority of people here speak English--it is effectively a *global value* in our country--which means we can be *implicit* in that knowledge when we interact. It saves time, and removes one potential variable of consideration--*What language(s) does this individual speak?*--from our minds, reducing cognitive load.

The pitfalls of always being explicit
-------------------------------------

Of course, implicitly understood global state unavoidably involves a learning curve. There is no way you can just walk into a foreign culture and expect to internally understand that culture without making a serious time investment, for example. But we all know that. It's why [language immersion](http://en.wikipedia.org/wiki/Language_immersion) is widely accepted (last I checked) as by far the most effective way to become fluent in a natural language.

Imagine someone from another culture who "masters" English, perfectly grasping the vocabulary and all of the grammatical rules of the language, then visits the United States and becomes frustrated by all of our idioms ("beat a dead horse", "break a leg", etc.), cultural references ("good thinking, Sherlock"), and other random phrases whose meanings aren't obvious at the surface level. To such a person I'd say: "Look, it just takes time." That's the cost of really learning the language.

But let's take a step back and imagine what life would be like if we insisted on being explicit about everything instead. I might have an exchange like this with a coworker:

> Coworker: How's Kathryn doing?  
> Me: Which Kathryn? *\[Kathryn is my wife's name.\]*

Or you might have this odd encounter with a stranger on the sidewalk:

> You: What time is it?  
> Stranger: In which time zone?

A doctor might be vexed by an overly-explicit patient:

> Doctor: How much do you weigh?  
> Patient: On which planet?

These things are what Hofstadter called "constants"; we may be able to *imagine* them changing--in some cases much more readily than others (e.g., changing time zones vs. changing planets)--but, generally speaking, we expect them not to. At the very least, they're certainly not going to change mid-conversation.

More importantly, there are *very sensible defaults* for the "ambiguous" values in these examples. If someone refers to "Kathryn" in a conversation with me, he or she is almost certainly referring to the Kathryn most important to me: my wife. If you ask someone what time it is, you're very likely asking about the time zone where you currently are. And in almost *every* conversation, when referring to properties of objects, we're specifically talking about how things are on Earth. All of this can remain *implicit*; we don't have to think about these things at all.

Hidden global variables can be our friends
------------------------------------------

I believe many of us have been trained to be overly explicit in developing software, preferring dependency injection and local configuration at every level of depth throughout a system. The classic example, which has [received some criticism](http://david.heinemeierhansson.com/2012/dependency-injection-is-not-a-virtue.html), is the common practice of writing any time-related code with an explicit dependency on an external `Time` or `Clock` object, making something as seemingly universal as **time** configurable. Adam Keys has [an excellent blog post on this point](http://therealadam.com/2013/01/03/design-for-test-vs-design-for-api/), in which I think he gets to the heart of my argument pretty concisely:

> Even **adding one optional parameter to a method carries "mass"**.

The "mass" is, of course, the cognitive load I mentioned of having to think about things that are flexible and non-global. My gut tells me that this predilection is particularly egregious in the Java and .NET communities, but I've seen it in Ruby land and elsewhere as well. And what this does is force undue attention on all of this configuration, much of which, most of the time, we ought to be taking for granted so that our minds can concentrate on more interesting issues.

This is why I enjoy working with convention-based frameworks. They shed much of this extra "mass," enabling developers to take things for granted that would otherwise weigh us down.

So yes, maybe at its core [convention over configuration](http://en.wikipedia.org/wiki/Convention_over_configuration) is just a fancy name for hidden global variables. But they're carefully chosen variables, which--after an admittedly necessary learning curve--establish a deeper level of shared knowledge, freeing us to be more implicit and less explicit. And just like in real life, that's often a good thing.

[^provocative-title]: And yes, I realize that to any non-programmer that sounds completely absurd.

[^to-be-fair-to-scott]: Scott, if you're reading this: I interpreted your tweet as essentially a playful expression of mild concern as opposed to an outright attack on convention-based frameworks. That said, you know how it is: I will never agree with you about anything.

[^a-bad-thing]: Or whatever the expression-coiners are saying these days.

[^globality]: Think: the opposite of *locality*.

[^flexibility-demands-attention]: An interesting discrepancy I have noticed between Linux enthusiasts and, say, Mac users (curiously, I find Windows users to be theoretically somewhere in between, even though that seems totally wrong) is in these users' desire to configure their systems. Linux is extremely flexible in that you can change almost any aspect of the operating system to suit your needs. However, with this flexibility comes greater demand on the user to fully understand the system. OS X, in contrast, is extremely inflexible and therefore demands very little from the user, other than to learn its basic idioms, which Apple believes users will like. (What fools! Oh wait.)

[^stages-of-convention-based-frameworks]: If the stages of *grief* are denial, anger, bargaining, depression, and acceptance, the stages of using a convention-based framework might be: wonder, perplexity, anger, disgust, and finally enlightenment. Or something like that.

[^boilerplate]: Here's a fun exercise if you want to get really depressed: write a script (maybe you already have one) to count the lines of code on your software project. Now figure out how many of those lines are *application logic*--i.e., what your software is actually supposed to *do*--and compare that with the number that are just configuring factories, binding dependency injections, wiring up controllers and event buses and logging infrastructure and all that other good stuff. Feel good?
