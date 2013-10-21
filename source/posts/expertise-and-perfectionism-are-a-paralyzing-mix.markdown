---
title: Expertise and perfectionism are a paralyzing mix
date: 2013-10-21 16:34:00 -0700
published: false
---

I used to be a bit of a perfectionist. I suppose I still am in many respects[^still-a-perfectionist]. But an interesting trend I've noticed about myself is that the more expertise I develop in an area, the more I let go of my perfectionism in that area. I think this is a necessary adaptation. When you're new to a field, you tend not to notice things that are wrong. You don't even know what "wrong" is, a lot of the time. Then as you develop a clearer, deeper understanding of the subject, your ability to see flaws is sharpened.

At this point---with a heightened sense of the flaws in something---a perfectionist has two choices: try to fix them, or look past them. The former path can be a noble one. Often, the only ones who *can* fix something are expert perfectionists, with the knowledge and the determination to do the job. I, however, tend to choose the latter path. And I believe that's the right choice, more often than not, because most of the time the flaws aren't very important. But they raise the bar for what *perfect* means to you; and so if *perfect* is the only level you can accept, you start to fixate on unimportant things. The ability to see flaws then becomes a curse.

The e-mail validation by regular expression fallacy
---------------------------------------------------

I remember on one of my first projects at ThoughtWorks, the team was having a design meeting and e-mail validation came up. We were deliberating between doing client-side or server-side validation (or both), discussing the pros and cons of either approach. A new employee at the client company---a guy who, I should add, gave off a vaguely arrogant vibe, which rubbed some people the wrong way and which I think pitted many in the room against him before he even opened his mouth---chimed in with his two cents, that client-side validation was basically an obvious choice. "I have a simple regex that I've used for years and it works just fine," he said.

This seemed to strike a nerve with some members of the team, who jumped on the guy immediately and insinuated not-so-subtly that he didn't know what he was talking about. In an instant I felt I understood the dynamic perfectly. This young hot shot had a tool that he'd used, and it wasn't actually correct---coming up with a good, *comprehensive* regular expression to validate e-mail addresses is famously hard---but he'd managed to dodge a bullet thus far, probably never ran into a problem with it, and so he thought it was an easy problem. The more experienced members of the team, meanwhile, knew much more than he did about just how large the space of valid e-mail addresses is, how complex regular expressions are unmaintainable, how a small error could lead to false positives, false negatives, etc. The only *true* way to validate an e-mail address, they knew, is to actually send a message to it and see if it ever gets delivered.

In retrospect, though, I think the new guy was right. He was better off not knowing the flaws in his approach. You can write a pretty simple regular expression to at least verify that a string *looks like* an e-mail address. And as far as validation goes, that's good enough to cover the vast majority of cases. The key is to make it overly permissive rather than restrictive, so that you don't get any false negatives (legit e-mail addresses that don't pass validation); occasional false positives are actually not catastrophic.

And this is where expertise and perfectionism got in the way, in my opinion. The most sensible thing to do was to use a simple, imperfect solution. The new guy had a simple solution that he *thought* was perfect. The experts saw that it wasn't. But that shouldn't have mattered.

The Unicode string reversal problem
-----------------------------------

Here's another one I've seen creep up from time to time: somebody asks how to reverse a string, a nice simple solution is proposed, and then inevitably someone with a lot more expertise comes along and points out a problem: the simple solution mixes up Unicode pairs!

The point was raised for C# a [few years ago on Stack Overflow](http://stackoverflow.com/a/228062/105570). Just today Mathias Bynens---the guy who built [jsPerf](http://jsperf.com/), among other things---wrote about [a similar issue in JavaScript](http://mathiasbynens.be/notes/javascript-unicode#reversing-strings).

Say you have a string like `"hello"` and you want to reverse the characters to get `"olleh"`. You can implement this for the vast majority of (English or language-agnostic) strings using a pretty simple algorithm:

1. Convert the string to an array of characters
2. Reverse the array of characters
3. Construct a new string from the (now reversed) array

An approach along these lines is available in probably every mainstream programming language, either out-of-the-box or quite trivially using a few lower-level building blocks. The problem is that there's an assumption between steps 2 and 3 above: that there is a 1-to-1 mapping from the values in the array to characters in the string (for instance, maybe each character is 32 bits). For the vast majority of inputs, this will be true. But there are Unicode code points, called astral symbols, that would occupy more than one element in an array of 32-bit characters. If you reverse a string containing astral symbols using the simple algorithm above, you can end up with weird results: bizarre glyphs, tildes over the wrong letter, etc. Pandemonium.

This can be fixed. See the Stack Overflow question and Bynens's post for examples of implementations that resolve the issue. These are cases of expert perfectionists taking the noble path I mentioned earlier. They are high-road developers. As for me, I am fine with the low road. In most cases, I would prefer the simpler solution, bugs and all. It is obvious, and the edge cases with astral symbols are likely to be both rare and benign[^benign-edge-cases].

This last part---about the edge cases being rare and benign---is central, I think, to my feeling about expertise and perfectionism. In both the e-mail validation and string reversal examples, the reason I am OK accepting an imperfect solution is that **the flaws are not really harmful**. It would be one thing if bad e-mail validation caused a security breach or something like that. It doesn't. It's just a bug.

OK, one last example, this time where I'm the guilty one.

A bothersome race condition
---------------------------

At my first software job, at a real-time trading firm in Philadelphia, we had a lot of multithreaded code. So I developed a pretty keen sense for race conditions, deadlocks, contention, etc.

At one point we started seeing an error every now and then. It came from a component that a teammate worked on, which involved queuing up jobs and allocating workers to send trade orders to the exchange. I pored over his code for a good long while---probably half a day, if not a full day---and gradually came to understand how it worked. (This is not an indictment of his code. I was quite a newbie at the time, so my code reading skills were underdeveloped; and multithreaded code is inherently complicated to start with.) Ultimately I identified a race condition that was responsible for the error we were seeing.

I spent another day or so (probably) coming up with a fix, cleverly avoiding lock contention where I could with atomic operations and [compare-and-swap](http://en.wikipedia.org/wiki/Compare-and-swap) tricks. Finally I proposed my solution to my teammate. He gracefully conceded that I had found the problem, then proceeded to argue that I should scrap my solution and just leave the bug there.

At first I was dumbfounded. But he was right, I think, for at least two reasons. First, in the algorithmic trading game, performance is paramount: if you can run your algos and execute a trade one microsecond sooner than your competitors, then you win. Introducing my fix, no matter how efficient it was, would make the overall process slightly slower. Let's say the error occurs once a day, my teammate argued (in fact, it only occurred maybe once per week). Then if we lose X dollars because of this bug, it's only worth fixing if the speed we sacrifice accounts for less than X. And as it turned out, we had much more to gain from the speed increase of leaving the bug there than from fixing it.

The other reason, which would have been completely over my head at the time, comes back to maintainability. My solution that fixed the race condition was pretty complicated. I was confident it was *correct*---of course, looking back I think, *who knows?*---but that was neither here nor there. Without the fix, my teammate's code had a bug, but it was much simpler to understand. And one principle I've come to appreciate a great deal in my career is that, all else being equal, or nearly equal, simpler is almost always better.

It definitely bothered me, at the time, leaving that race condition in there. My perfectionist side was vexed. But it was the right thing to do; and looking back now, being *more* of an expert than I was at the time, I'm actually fine with it.

Are you an expert perfectionist?
--------------------------------

Now, I've described my own experience here. To *me*, the way to deal with expertise and a perfectionist demeanor is to ease up on the perfectionism. I'm sure there are some reading who much prefer the high-road approach, developing *correct* solutions above all else. To that I say: good for you. Honestly. I think the world is better off with both kinds of people. But let me leave you with two closing thoughts.

First---and this is actually a bigger topic, worthy of its own post, but I just want to mention it briefly---sometimes what is appropriate for a library is completely different from what is appropriate for an application. Most of my professional career I have been primarily an *application* developer, and so my attitude towards perfectionism reflects that. If you are developing a library for widespread consumption, I think perfectionism makes a lot more sense. We expect our libraries to iron out bugs for us, even if that sometimes requires complicated solutions. The [esrever library](https://github.com/mathiasbynens/esrever) for fixing the string reversal issue in JavaScript is a perfect example of this. It *should* exist, and I'm glad it does. But if I saw the same code in an application I would be troubled.

Second: remember to check your attitude. There is a strong temptation, when you are a relative expert in some area, to be impatient with those who know less than you. It is *particularly* strong when those people *act* like they know *better* than you (as was the case with the new guy in my first example about e-mail validation). They might be disrespectful or arrogant; it might feel good to "put them in their place," so to speak. But as I've tried to argue here, just because someone knows less than you about something, that doesn't necessarily mean he's wrong and you're right. If you're a perfectionist, you may actually be in a bad position to judge, precisely *because* you're an expert and can see more flaws.

[^still-a-perfectionist]: My wife would almost certainly argue as much.

[^benign-edge-cases]: Anyway, I have trouble imagining a software application where a string reversal algorithm that produces results with readable astral symbols is of critical importance. Then again, [just because I can't imagine it doesn't mean it isn't possible!](/posts/absence-of-disproof-is-not-proof.html)
