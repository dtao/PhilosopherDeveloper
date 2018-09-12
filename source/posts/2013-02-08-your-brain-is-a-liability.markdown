---
title: Your brain is a liability
date: 2013-02-08
published: true
---

It's natural to think of *being smart* as an asset. This is obvious in many ways, so I don't feel I need to enumerate them. But there are also ways that it can be a liability; and since this is the contrarian view, I naturally want to talk about it[^bill-schofield].

Before I start, though, a note about the word "smart": it can mean many things. What I am specifically referring to now is what I will call raw **brain power**: the capacity of a person's mind to think quickly, grasp tricky concepts, store a lot of information at once, and so on. If the mind were a computer, in other words, I'd be talking about *hardware* (CPU, memory, etc.) as opposed to software.

The *software* of a computer system makes *use* of the hardware. It isn't the other way around. Powerful hardware on its own is useless. For the purpose of this argument I propose that we think of being "smart"--i.e., of having a lot of brain power---as analogous to having a computer with powerful hardware. In contrast, having good instincts, solid judgment, and a fresh perspective---characteristics more in line with what we generally call "wisdom"--is like running well-written software.

With this analogy in mind I think it makes some sense to conceptualize the brain as, quite simply, a *tool*. And framed in that way, I pose to you the question: if you were a carpenter[^carpenter-analogy], and you had a top-of-the-line but rare and expensive tool---I don't know; let's say some custom-built *screwdriver*--would it be a wise idea to build cabinets that *required* your special tool to repair or disassemble? Or would it be better to build them with regular old screws that any ordinary screwdriver could tighten and loosen?

Maybe you don't like that analogy. I'll admit it isn't perfect. Let's get more concrete.

It takes being **smart** to be able to read through complex code and understand what it does. I've worked with really bright developers who can do this much more quickly and easily than I can. But this is dangerous. If it's no trouble to *you* to understand something, you will be less likely to recognize that it is overly complicated and could be simplified---for the benefit of your teammates, and even for you, down the road. In contrast, if you struggle to understand what a section of code does, you will be much more inclined to work on making it [more comprehensible](/posts/optimize-for-comprehensibility.html).

Or suppose your code exhibits some strange behavior. There's a subtle bug and no one on the team is quite sure what could be causing it. If you're smart, your brain will scan its data banks of knowledge faster than any of your teammates; and while everyone else is scratching his head you may develop a *hunch* what the problem might be. But your hunch could be wrong, and you may end up wasting a lot of time exploring the wrong possibility. When you're generally right about these things, it is all too easy to assume you're *always* right. Your slower teammates will be more cautious about jumping to conclusions and may actually find the source of the problem through careful debugging while you're busy following your intuition.

Being smart can also cause you to develop the tendency to go with your first idea for a design or an implementation, because your first idea is often a good one. But this doesn't take into account how much your thinking is influenced by environmental factors, or how you might be "in the zone" at certain times and not at others. Meanwhile, your teammates have less confidence in their brains; so they force themselves to think through multiple alternatives before sitting down to write code. This could well lead them to come up with a superior solution to what you had in mind.

Now, I realize that in a sense all these examples may be construed as a form of *hubris*, or arrogance. So you could perhaps simplify my argument to this: *be careful if you're really smart, because then you're liable to become arrogant!* But the above are real examples (everything I've written about so far I've observed in real life); and they don't actually require cocky or condescending personalities. These are traps that anyone who simply *is smart*--again, by which I mean, *has a really fast/powerful brain*--can fall into, regardless of attitude towards other people.

That said, your brain can certainly get in the way of your interactions with others as well.

A common saying is that the best way to learn is to teach. I find a lot of truth to this, especially when someone asks me to explain something and I realize I don't have the firmest grasp of the subject myself. This leads to mutual learning, which is awesome. One problem I see smart people encounter at times is that they overestimate both their knowledge and their ability to explain things. If you're smart and you find that someone doesn't understand you, you're more likely to attribute it to their smaller brain than to your failure to teach. This results in a double failure---you haven't examined the holes in your own understanding, and your would-be student hasn't learned anything.

It goes the other way, too. An even worse mistake that smart people make is to confuse others' difficulty articulating their ideas with the ideas themselves being bad or misinformed. I've witnessed this a *lot*. The problem is that smart people's brains work too fast; so while a slower-thinking person is stumbling through proposing a (potentially good) idea, a faster-thinking person evaluates it quickly and makes a premature judgment on the evidence available. This is one reason why I believe some smart people are prone to interrupting. Give your poor teammates a chance to sort out their thoughts while they're talking! That's how some people work out their ideas: by talking through them. Though you may grow impatient, it's important to hear others out for this reason. Often I find that the real gem of a good idea comes right at the end of an otherwise inarticulate argument.

But the absolute *worst* mistake[^worst-mistake] smart people make, in my experience, is the "I already thought of that" fallacy. Smart people---by the very definition of "smart" that I laid out above---have brains that move quickly. This means that they tend to come up with more ideas at a faster rate than most of their peers. And if you have an idea, but you don't pursue it, then presumably you have *reasons* for not pursuing it. So when a smart person's colleague suggests an idea that the smart person already had, the smart person is very likely to dismiss it. **It could still be a good idea.** Just because you thought of something and then moved on does not mean it isn't worth revisiting. It pains me to think of all the good ideas that have been dismissed, each simply because a smart person thought of it first but never bothered to actually try it.

My purpose in writing this is actually to address you smart folks directly: you know who you are. I'm not saying that you're cocky, or arrogant, or anything like that. There are times[^when-i-am-guilty] when *I'm* the one guilty of all the crimes I've outlined here. I'm also not denying that your brain is absolutely an asset in many ways---but you already know that. The respect of your team, your online reputation, the constant flood of recruiting messages in your LinkedIn inbox: these things already attest to that. What I am suggesting is that you consider your brain as a *tool*, with some drawbacks that you should be aware of.

Naturally, all else being equal, I would like a good brain, just as I'd like good PC hardware. But really powerful hardware can mask some of the problems with crappy software. And crappy software needs to be fixed.

[^bill-schofield]: I should say this right off the bat: these ideas are (clearly) not my own. I would attribute the seed of an idea underlying this article to Bill Schofield, another former ThoughtWorks teammate. Bill was patient enough to work with me on a project during which I believe I was myself guilty of most of the issues I write about here.

[^carpenter-analogy]: I swear one of these days I'll think of another profession to constantly compare software development to other than carpentry.

[^worst-mistake]: I don't know why I'd make such an extreme claim like this; I guess I'm just in the mood for some hyperbole.

[^when-i-am-guilty]: This is generally not true at work, where I am quite possibly the dumbest person in the room.
