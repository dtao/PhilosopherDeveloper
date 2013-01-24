I noticed something funny about myself this morning while making coffee.

The kitchen in my wife's and my apartment is divided into a main area and a [scullery][1] (yep, we're old fashioned). The scullery holds our silverware, dishes, coffee, tea, and other things. But the coffee *maker* is in the main area, on a cart.

This morning I went into the kitchen, put a filter in the coffee maker, took the carafe and brought it with me into the scullery. In the scullery I filled the carafe with water, took the coffee and walked back to the cart in the kitchen. I filled the machine with enough water for two cups of coffee, collected an emptied sugar packet that was sitting on the cart, and tossed it into the trash on my way back to the scullery, where I poured out the excess water from the carafe and picked up a mug and a spoon before heading back to the cart.

What I noticed about this whole procedure (after having gone through it, of course) is that I had **optimized** my trips to and from the scullery--not perfectly, by any means, but to some extent. That is, rather than making a trip for one purpose (e.g., filling the carafe with water), I *combined* tasks so as to reduce the total number of trips back and forth. And what was particularly noteworthy to me was that I had done this *without really thinking about it*.

Recently I interviewed an engineer[^engineer] for ThoughtWorks. It was a technical phone interview, so much of the conversation was relatively high-level (I figured, save the whiteboard problems for in-office interviews). Even so, I did throw in a few problems, emphasizing to the candidate that the goal of the exercise was for her to share *what she was thinking*, and not necessarily to arrive at a "correct" answer. Obviously--or anyway, obviously to *me*--we can't always expect engineers to have an early *Eureka!* moment with every problem they face. On the other hand, I do think it's reasonable to expect a fairly clear, rational approach to problem solving at all times from good engineers. This is, after all, the skill that allows us to create good software.

To my pleasant surprise, the woman I interviewed came up with some really efficient solutions to the problems I posed over the phone. I say "pleasant surprise" because this is something I like very much: a mind that **naturally optimizes**. I guess it would be fair to say that I related with her obvious tendency to think in this way (which is hardly surprising given that her background was in C++). Some engineers hate this, because they feel it leads to bugs and confusing code. You'll often hear Knuth quoted on the subject:

> We should forget about small efficiencies, say about 97% of the time; premature optimization is the root of all evil.

I won't address this quote directly (or the way it's so commonly wielded inappropriately); others with more clout than I have [already weighed in on it](http://www.bluebytesoftware.com/blog/2010/09/06/ThePrematureOptimizationIsEvilMyth.aspx).

But I do want to point something out, which many of us often overlook (or are completely ignorant of): *we all have different ways of thinking*. I believe that some of us have a **compulsion to optimize**, whereas others have **optimizing minds**.

I should be clear that I am *not* talking about *ability*. By "optimizing minds" I don't mean to imply that some minds are inherently *better* than others at finding optimal solutions; rather that it is something they naturally *try* to do (whether successfully or not) by default, *while solving a problem* and not as an afterthought. In contrast, by "compulsion to optimize" I am referring to those who do not necessarily optimize at first, but who are unsatisfied with a solution until they've revisited it, potentially many times, and tweaked it until it is optimal in some way.

In general, I think that "premature optimization" is a phrase that describes the compulsion to optimize. That isn't to say that an optimizing mind is always (or even generally) a good thing. It is simply a characteristic. It can certainly be a curse, as it *can* lead to code that is less obvious and more difficult to understand, which is a serious liability for a team project.

But on the other hand, I feel that the real danger of *compulsive* optimization is that it *costs a lot of time*. In much the same way that [perfect is the enemy of good](http://en.wikipedia.org/wiki/Perfect_is_the_enemy_of_good), a compulsion to optimize can be the archnemesis of productivity. It causes us to redo our own work repeatedly, a process which like many others is great in moderation but problematic in excess.

I have a different opinion about the woman I interviewed, and about what I'm calling "optimizing minds" in general. If you already think in this way, then it would be *counterproductive* to alter your way of thinking by stripping out the optimizing part. Remember what I said about making coffee this morning: I did the optimizing without thinking about it. If I were developing software, of course I *could* think to myself, "Now, now, let's not combine tasks just for the purpose of optimization. One task per trip: that's easier to understand!" And surely there are many occassions when this would be the right choice. But the fact remains that it would go *against* my natural way of thinking; and so if I always took this approach then I would be guilty of **compulsive de-optimization** just as others can be guilty of the opposite.

More than anything else, I only bring this up as an observation, to hopefully get the idea on the collective table that we might avoid blindly enforcing dogmas about the correct way to develop software without taking into account the different kinds of brains we engineers have. Frankly, I'd dislike working in an industry where *all* developers were compulsive optimizers, just as I'd hate it if *none* were.

[^engineer]: And yes, I know there are those among you who object to the word "engineer" being used to describe a software developer. To me it's just a word. You all know what I'm talking about!

[1]: http://en.wikipedia.org/wiki/Scullery_(room)
