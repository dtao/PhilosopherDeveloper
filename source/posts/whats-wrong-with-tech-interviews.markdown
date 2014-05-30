---
title: What's wrong with tech interviews
date: 2014-05-20 17:02:00 -0700
published: false
---

I've just started getting involved in interviewing engineer candidates at Google, and I wanted to get my thoughts down while they're fresh in my head and before I've been so influenced by Google's approach that I can't imagine other approaches.

My reason for writing this is that I want to propose some ideas for how interviews could be more effective, both at Google and in the tech industry as a whole. But before that I need to explain why I think interviews at most tech companies[^most-tech-companies] today aren't as effective as they should be. So this will be the first in a two-part post on the subject; the next part will present my ideas for improvement.

So, here are a few of the problems I see with tech interviews today.

1. There's too much focus on algorithms
2. There's too much focus on speed
3. Interviews go into too much depth per problem
4. Problems are too theoretical
5. Problems are unnecessarily difficult

## Algorithms aren't everything

We at Google sure do love algorithms. My impression is that other tech companies with engineering roots[^engineering-roots] are the same way. It's only natural: when engineers lay the foundation, engineering will be in the company's blood. So it makes sense, from a cultural standpoint at the very least, to cover algorithms in interviews for engineering candidates.

But in my experience tech companies don't just *cover* algorithms in their interviews. It's basically *all they care about*.

![Algorithms everywhere!](/images/algorithms-everywhere.png)

I think this is a good analogy (I've [made a similar one before](https://twitter.com/dan_tao/status/347707313412534273)): think of basketball players. One trait that is probably loosely correlated with overall basketball ability is free throw percentage: how often a player can make a shot from the free throw line without anyone blocking the basket or interfering. Now imagine that a team hired players **exclusively based on their free throw percentages**. This team might have an extremely impressive average free throw percentage---probably the best in the world---but it's pretty obvious that wouldn't mean it had all the best players.

I think hiring engineers based almost exclusively on their performance on algorithm-heavy interview questions is like hiring basketball players based almost exclusively on their free throw percentage.

## Problem-solving speed != developer productivity

Because interviews are conducted in a finite amount of time, there is often this very strong bias in favor of candidates who can solve problems quickly. I've had many teammates over the years who, following an interview, will make comments like, "He took 20 minutes to solve that problem. It should have only taken 10."

I should admit here that I'm biased. I have always been somewhat "slow" as a thinker. I had friends in high school and college who could solve math problems much faster than I could. But with a little time, I could almost always solve the same problems. In fact, quite often, I could solve problems my faster friends *couldn't* solve. So I've always been a bit like the proverbial tortoise: I move a little slower, but I can get to the finish line.

My own bias aside,[^bias-aside], I honestly feel it's silly to rank people based on whether they can solve a problem in 10, or 20, or 45 minutes. To me, if they can both solve it, they're on equal footing.

The reason I say this is that I don't believe speed at solving interview problems measures anything really useful. I think it's *supposed* to provide an indicator of productivity. But I'm highly skeptical that it does that.

Let's suppose that some people can consistently, all the time, solve algorithm problems faster. This does not mean one developer can do in a month what another developer would take two months to accomplish. The problem-solving part of being a software developer represents a tiny, tiny slice of his or her working hours. Most of our time is spent coding, debugging, writing tests, refactoring, and talking to people. Optimizing candidates for their *speed* in coming up with algorithms is like looking for a car with the best 0-60 time and expecting it to make a noticeable impact on your commute along a high-traffic freeway.

## Breadth over depth

It's perfectly reasonable to ask someone applying for a coding position to write some code. Naturally we want to avoid [FizzBuzz](http://blog.codinghorror.com/why-cant-programmers-program/) situations. I don't think doing it on a *whiteboard* is ideal,[^coding-on-whiteboard] but I also don't think it's a huge problem.

What I *do* think is a problem is having candidates write out *so much code* in such an unrealistic environment. If a testing framework were available, or the candidate had an IDE or even a terminal open where they could run some tests, that would be one thing. Instead they're generally expected to just write line after line, with no feedback loop, with the strange pressure of someone watching them.

And what do we gain from this? Remember that time is scarce, so every minute spent on one thing is a minute *not* spent on something else. This means the write-lots-of-code interview format trades breadth for depth, sacrificing shallow information about potentially a variety of things for presumably deeper information about a candidate's ability to write code.

![Dude, you're so deep](/images/dude-so-deep.png)

I don't buy it. To me the ability to write code is a bit like the ability to juggle: you can tell pretty quickly whether someone can actually do it. You don't need to watch them go for five minutes without dropping a ball to be certain.

Sure, you could watch a *little* longer to get a sense of just how developed a juggler's skill is. But I think the law of diminishing returns applies here. The longer you observe, the less meaningful information you gain each minute.

![Value of an interview question over time](/images/value-of-interview-question-over-time.png)

So writing lots of code---or for that matter diving deep in *any* sense into a single problem---isn't worth the time. Having candidates write *some* code is a reasonable litmus test; but once it's obvious the guy can juggle, move on.

## Theoretical problems are great in theory

I *love* theoretical problems. Seriously. If I sit in on an interview and the interviewer asks some theoretical question I haven't heard before, it will likely occupy my mind until I can figure it out---potentially long after the interview is over. They're a lot of fun, and I'm sure they do tell you *something* about a candidate's ability.

But they're edge cases. Sure, there will be points in your career when it makes sense to implement a custom data structure for some reason, or to write a specialized algorithm. But these are tiny blips compared to the day-to-day work of understanding and implementing business requirements, reading other developers' code, and writing your code to be as readable as possible.

When I interviewed at Google, I actually took the time at the end of the interview to ask one of my interviewers, "In all honesty, how relevant do you feel these kinds of problems are to the work you do here?" (I seem to recall the question involved implementing a [trie](http://en.wikipedia.org/wiki/Trie).) She sort of nodded, acknowledging my skepticism, but said that the goal was to identify candidates with strong fundamentals.

In a later conversation with some of my friends from ThoughtWorks, my friend [Damon](https://twitter.com/damaneice) made what I think is an excellent comparison. He said (and I'm paraphrasing of course):

> It's like saying, "Can you dribble halfway down the court, spin around,
> do a double back flip, then make a 180 and do a layup? You know, just the
> fundamentals."

Just because most devs learned a bunch of theoretical stuff in college doesn't mean that stuff forms the foundation of what we do as professionals.

## Tougher questions, better hires?

I've probably mentioned a dozen times on this blog that there's a concept in software called *premature optimization*. Normally it's applied to the issue of software performance, i.e., how quickly an algorithm can run, or how many requests per second an application can handle---that sort of thing.

The idea is really more general, though. It's simply a fact that we sometimes focus our time and energy on tweaking things, making them a *little bit* better, when we could be getting more "bang for our buck" working on other things.

I feel this principle applies to really hard questions in interviews.

To return to my earlier car analogy: imagine you are building up a fleet of trucks for your shipping company. What do you want to optimize? Really, you should probably be optimizing something like number of packages shipped over time in transit per package.[^optimizing-shipping] So, all else being equal, trucks that can carry more are better; and, all else being equal, faster trucks are better.

But you see, even in this simple analogy we've already got two factors to consider. If you were to go out of your way to find only the fastest trucks, you'd be prematurely optimizing for a single factor: speed. You could end up with super-fast trucks that can barely carry any cargo.

To me this is what it feels like to ask these super-tough interview questions involving clever data structures and complex algorithms. It's prematurely optimizing for a certain type of mind---the mind that excels at these kinds of problems---very likely at the cost of other factors that are just as important. The end result is suboptimal overall.

[^most-tech-companies]: Naturally, I can't speak with authority on this---nor can just about anybody, I would imagine, since no one has interviewed at "most tech companies." I'm basing what I write on my own experience at several different companies, along with anecdotes I've heard and articles I've write about others.

[^engineering-roots]: I.e., the founders were engineers.

[^bias-aside]: Can I actually say "bias aside"? Probably not. But I've gone and done it anyway.

[^coding-on-whiteboard]: I will say it's a bit crazy to me that, even today, so many interviews for engineering candidates are conducted *without a computer*. It's the twenty-first century, people!

[^optimizing-shipping]: Well, really, that divided by dollar cost. But let's pretend money is no object for the moment, to keep things simple. (Besides, that's not really all that far from the truth for a company like Google.)
