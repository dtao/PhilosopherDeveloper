---
title: Expertise and perfectionism are a paralyzing mix
date: 2013-10-22 07:51:00 -0700
published: true
---

I used to be a bit of a perfectionist. I suppose I still am in many respects[^still-a-perfectionist]. But an interesting trend I've noticed about myself is that the more expertise I develop in an area, the less of a perfectionist I become.

I think this is a necessary adaptation. When you're new to a field, you tend not to notice things that are wrong. You don't even know what "wrong" is, a lot of the time. But as you develop a clearer, deeper understanding of a subject, your ability to see flaws is sharpened. Gradually, *everything* seems wrong for one reason or another.

In this predicament---having a heightened perception of flaws---a perfectionist has two choices: try to fix them, or look past them. To fix them is sort of like taking the high road, in my mind; and it can be a noble choice. Often, the only ones who *can* fix something are expert perfectionists, with the knowledge to understand the job and the determination to actually do it.

Personally, I often choose the low road. And I believe that's the right choice, more often than not, because most of the time the flaws you learn to see as an expert aren't very important. But they raise the bar for what *perfect* means to you; and so if *perfect* is the only level you can accept, you start to fixate on unimportant things. The ability to see flaws can therefore be a curse rather than an asset.

Let me give you some examples.

Validating e-mail addresses with regular expressions
----------------------------------------------------

On one of my first projects at ThoughtWorks, the team was having a design meeting and e-mail validation came up. We were discussing the various considerations and gotchas involved. Suddenly a new employee at the client company chimed in with his two cents, claiming that the problem was easy. "I have a regex that I've used for years and it works just fine," he said.

I should add that I remember this guy giving off a vaguely arrogant vibe. I could be wrong about that, but I got the impression his personality rubbed some people the wrong way. I think that pitted many in the room against him before he even opened his mouth.

Anyway, his statement seemed to strike a nerve with some members of the team, who jumped on the poor guy immediately and insinuated not-so-subtly that he didn't know what he was talking about.

In an instant I felt that I understood what was going on. This young hot shot didn't really understand the extent of the problem---coming up with a good, *comprehensive* regular expression to validate e-mail addresses is famously hard---but he'd stumbled upon a partial solution that, while not strictly correct, nonetheless worked most of the time. And so he thought it was an easy problem.

The more experienced members of the team, meanwhile, knew better. They appreciated just how large the space of valid e-mail addresses is, how complex regular expressions are unmaintainable and hard to debug, and how the only *true* way to validate an e-mail address is to actually send a message to it and see if it ever gets delivered. They had been bitten before by surprising edge cases before. Apparently the new guy hadn't, and so he needed a little education.

In retrospect, though, I think the new guy was right. His approach was flawed, yes. But he was better off not knowing the flaws in his approach. The truth is that you can write a pretty simple regular expression to at least verify that a string *looks* like an e-mail address. And as far as validation goes, that's good enough to cover the vast majority of cases. The key is to make it overly permissive rather than restrictive, so that you don't get any false negatives (legitimate e-mail addresses that don't pass validation); occasional false positives are actually not catastrophic.

A flawed approach that mostly works is better than nothing. And this is where expertise and perfectionism got in the way, in my opinion. The most sensible thing to do *was* to use a simple, imperfect solution, just as the new guy suggested (even if he didn't realize it was imperfect). The experts could see the flaws. But they shouldn't have shot down his idea.

Reversing Unicode strings
-------------------------

Here's another case of expertise turning up flaws that I've seen a couple of times: somebody asks how to reverse a string, a nice simple solution is proposed, and then inevitably some expert comes along and points out that the simple solution isn't quite right.

The point was raised for C# a [few years ago on Stack Overflow](http://stackoverflow.com/a/228062/105570). Just yesterday Mathias Bynens---the guy who built [jsPerf](http://jsperf.com/), among other things---wrote about [a similar issue in JavaScript](http://mathiasbynens.be/notes/javascript-unicode#reversing-strings).

I'll describe the problem briefly. Say you have a string like `"hello"` and you want to reverse the characters to get `"olleh"`. You can implement this for the vast majority of (English) strings using a pretty simple algorithm:

1. Convert the string to an array of characters
2. Reverse the array of characters
3. Construct a new string from the (now reversed) array

An approach along these lines is available in probably every mainstream programming language, either out-of-the-box (i.e., `String#reverse` in Ruby) or quite trivially using a few lower-level building blocks.

The problem is that there's an assumption in the algorithm described above: that there is a 1-to-1 mapping from the values in the array to characters in the string. For the vast majority of inputs, this will be true. But there are Unicode code points, called *astral symbols*, that would occupy more than one element in an array of fixed-size characters. If you reverse a string containing astral symbols using the simple algorithm above, you can end up with backwards code points, which gives you weird results: bizarre glyphs, tildes over the wrong letter, etc.

This can be fixed. The abovementioned Stack Overflow question and Bynens's post provide examples of implementations that resolve the issue. These are cases of expert perfectionists taking the high road I mentioned earlier. As for me, I am fine with the low road. In most cases, I would prefer the simpler solution, bugs and all. It's short, it's obvious, and the edge cases with astral symbols are likely to be both rare and benign[^benign-edge-cases].

This last part---about the edge cases being rare and benign---is central to my feeling about expertise and perfectionism. In both of the examples I've given so far, the reason I would feel comfortable accepting an imperfect solution is that **the flaws are not really harmful**. It would be one thing if bad e-mail validation caused a security breach or something like that. It doesn't. It's just a bug.

OK, one last example, this time where I'm the guilty one.

Patching a rare race condition
------------------------------

At my first software job, at a real-time trading firm in Philadelphia, we had a lot of multithreaded code. So I developed a pretty keen sense for [race conditions](http://en.wikipedia.org/wiki/Race_condition), [deadlocks](http://en.wikipedia.org/wiki/Deadlock), thread contention, etc.

At one point we started seeing an error every now and then. It came from a component that a teammate worked on, which involved queuing up jobs and allocating workers to send trade orders to the exchange. I pored over his code for a good long while---probably half a day, if not a full day[^a-full-day]---and gradually came to understand how it worked. Ultimately I identified a race condition that was responsible for the error we were seeing.

I spent another day or so (probably) coming up with a fix, cleverly avoiding lock contention where I could with atomic operations and [compare-and-swap](http://en.wikipedia.org/wiki/Compare-and-swap) tricks. Finally I proposed my solution to my teammate. He agreed that I had found the problem, then proceeded to argue that I should scrap my solution and just leave the bug there.

At first I was dumbfounded. I instinctively fought back, and probably even privately thought he was an idiot. But after a while I came around to his side.

My teammate was right, I think, for at least two reasons. First, in the algorithmic trading game, performance is paramount: if you can run your models and execute a trade one microsecond sooner than your competitors, then you win. Introducing my fix, no matter how efficient it was, would make the overall process slightly slower. Let's say the error occurs once a day, my teammate argued (in fact, it actually occurred less frequently than that). Then if we lose X dollars because of this bug, it's only worth fixing if the speed we sacrifice accounts for less than X. And as it turned out, we had much more to gain from the speed increase of leaving the bug there than from fixing it.

The other reason, which would have been completely over my head at the time, comes back to maintainability. My solution that fixed the race condition was pretty complicated. I was confident it was *correct*---of course, looking back I think, *who knows?*---but that was neither here nor there. Without the fix, my teammate's code had a bug, but it was much simpler to understand. And one principle I've come to appreciate a great deal in my career is that, all else being equal, or nearly equal, simpler is almost always better.

So I added a comment to the section with the race condition, explaining that knew about it and justifying our decision. It definitely bothered me, at the time, leaving that race condition in there. My perfectionist side was vexed. But it was the right thing to do; and looking back now, being *more* of an expert than I was at the time, I'm actually fine with it.

A final word to expert perfectionists
-------------------------------------

Now, I've described my own experience here. To *me*, the way to deal with expertise and a perfectionist demeanor is to ease up on the perfectionism. I'm sure there are some reading who much prefer the high-road approach, developing *correct* solutions above all else. To that I say: good for you. Honestly. I think the world is better off with people like you. But let me leave you with two closing thoughts.

First---and this is actually a bigger topic, worthy of its own post, but I just want to mention it briefly---sometimes what is appropriate for a library is completely different from what is appropriate for an application. Most of my professional career I have been primarily an *application* developer, and so my attitude towards perfectionism reflects that. If you are developing a library for widespread consumption, I think perfectionism makes a lot more sense. We expect our libraries to iron out bugs for us, even if that sometimes requires complicated solutions. The [esrever library](https://github.com/mathiasbynens/esrever) for fixing the string reversal issue in JavaScript is a perfect example of this. It *should* exist, and I'm glad it does. But if I saw the same code in an application I would be troubled.

Second: remember to check your attitude. There is a strong temptation, when you are a relative expert in some area, to be impatient with those who know less than you. It is *particularly* strong when those people *act* like they know *better* than you (as was the case with the new guy in my first example about e-mail validation). They might be disrespectful or arrogant; it might feel good to "put them in their place," so to speak. But as I've tried to argue here, just because someone knows less than you about something, that doesn't necessarily mean he's wrong and you're right. If you're a perfectionist, you may actually be in a bad position to judge, precisely *because* you're an expert and can see more flaws.

Basically, **perfectionism is unscalable**. The more you know about something, the more flaws you see; and the more flaws you see, the more you *have* to be tolerant of them. Or else you'll become paralyzed.

[^still-a-perfectionist]: My wife would almost certainly argue as much.

[^benign-edge-cases]: Anyway, I have trouble imagining a software application where a string reversal algorithm that produces results with readable astral symbols is of critical importance. Then again, [just because I can't imagine it doesn't mean it isn't possible!](/posts/absence-of-disproof-is-not-proof.html)

[^a-full-day]: This is not an indictment of my coworker's code. I was quite a newbie at the time, so my code reading skills were underdeveloped. And multithreaded code is inherently complicated to begin with, at least relative to single-threaded code.
