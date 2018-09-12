---
title: What's wrong with tech interviews
date: 2014-05-20
published: false
---

I've just started getting involved in interviewing engineer candidates at Google, and I wanted to get my thoughts down while they're fresh in my head and before I've been so influenced by Google's approach that I can't imagine other approaches.

My reason for writing this is that I want to propose some ideas for how interviews could be more effective, both at Google and in the tech industry as a whole. But before that I need to explain why I think interviews at most tech companies[^most-tech-companies] today aren't as effective as they should be. So this will be the first in a two-part post on the subject; the next part will present my ideas for improvement.

Here are a few of the problems I see with tech interviews today.

1. There's too much focus on algorithms
2. Too much time is spent on each problem
3. Interview environments are unrealistic

These aren't the only problems; but three is a nice round number, so let's start with these.

## Algorithms aren't everything

We at Google sure do love algorithms. My impression is that other tech companies with engineering roots[^engineering-roots] are the same way. It's only natural: when engineers lay the foundation, engineering will be in the company's blood. So it makes sense, from a cultural standpoint at the very least, to cover algorithms in interviews for engineering candidates.

But in my experience tech companies don't just *cover* algorithms in their interviews. It's basically *all they care about*.

![Algorithms everywhere!](/images/algorithms-everywhere.png)

I think this is a good analogy (I've [made a similar one before](https://twitter.com/dan_tao/status/347707313412534273)): think of basketball players. One trait that is probably loosely correlated with overall basketball ability is free throw percentage: how often a player can make a shot from the free throw line. Now imagine that a team hired players **exclusively based on their free throw percentages**. This team might have some great players---possibly even some of the best---but it's pretty obvious that it would have some mediocre players too, since you could be a great free throw shooter but a lousy basketball player overall.

I think hiring engineers based almost exclusively on their performance on algorithm-heavy interview questions is like hiring basketball players based almost exclusively on their free throw percentage.

## How long is this going to take?

The focus on algorithms is doubly harmful because algorithm question can take a lot of time. At Google it's pretty typical for an interview to comprise only a single algorithm problem with two parts: a simple case and a more complex case. On some level this may be valuable as it allows candidates with strong algorithm skills to really shine. But on the whole I feel it's not a great use of time.

### One problem is really one data point

Say you're visiting an unfamiliar community and you want to know what the people are like. So you ask one person on the street to fill out a questionnaire. It's one of those 40-question surveys that asks if you're comfortable in groups, how you like to spend your time---that sort of thing---and after your volunteer is done, you look at the results and think, *OK, looks like an extrovert*.

But just to be sure, you then ask to follow the person around and observe them for the rest of the day. For some mysterious reason, he agrees; and you spend the next several hours watching him interact with others. At the end it's obvious he's extroverted. So you conclude, *The people here are extroverts!*

Obviously this is an unjustified conclusion. Deeply examining one person's personality only tells you the personality of most people in a community if that person happens to be a representative member. Put another way, looking *really hard* at one data point does not give you the same information as looking at lots of data points.

But this is what I feel like we're doing when we spend 45 minutes working on a single problem with a candidate. We're just looking really hard at one data point.

![Value of an interview question over time](/images/value-of-interview-question-over-time.png)

Maybe taking some time to dig into a problem a little bit provides some valuable information. But the law of diminishing returns applies here. The more time an interview takes on a single problem, the more opportunity to gain a lot more by looking at other problems is sacrificed.

### Speed isn't everything

*Because* interviews are conducted in a finite amount of time, there is often a very strong bias in favor of candidates who can solve problems quickly. I've had many teammates over the years who, following an interview, will make comments like, "He took 30 minutes to solve that problem. Most good candidates can do it in 10."

I should admit here that I'm biased. I have always been somewhat "slow" as a thinker. I had friends in high school and college who could solve math problems much faster than I could. But with a little time, I could almost always solve the same problems. In fact, quite often, I could solve problems my faster friends *couldn't* solve. So I'm a bit like the proverbial tortoise: I move a little slower, but I can get to the finish line.

My own bias aside,[^bias-aside], I honestly feel it's silly to rank people based on whether they can solve a problem in 10, or 20, or 45 minutes. To me, if they can both solve it, they're on equal footing.

I *think* that when tech interviewers look at speed, they are interpreting it as an indicator of productivity. I'm skeptical.

Let's suppose that some people can consistently, all the time, solve algorithm problems faster. This does not mean one developer can do in a month what another developer would take two months to accomplish. The problem-solving part of being a software developer represents a tiny, tiny slice of his or her working hours. Most of our time is spent coding, debugging, writing tests, refactoring, and talking to people. Optimizing candidates for their *speed* in coming up with algorithms is like looking for a car with the best 0-60 time and expecting it to make a noticeable impact on your commute along a high-traffic freeway.

## Artificial code

It's perfectly reasonable to ask someone applying for a coding position to write some code. Naturally we want to avoid [FizzBuzz](http://blog.codinghorror.com/why-cant-programmers-program/) situations. I don't think doing it on a *whiteboard* is ideal,[^coding-on-whiteboard] but I also don't think it's a huge problem.

What I *do* think is a problem is having candidates write out *so much code* in such an unrealistic environment. If a testing framework were available, or the candidate had an IDE or even a terminal open where they could run some tests, that would be one thing. Instead they're generally expected to just write line after line, with no feedback loop, with the strange pressure of someone watching them.

To me the ability to write code is a bit like the ability to juggle: you can tell pretty quickly whether someone can actually do it. You don't need to watch them go for five minutes without dropping a ball to be certain.

Having candidates write *some* code is a reasonable litmus test; but once it's obvious the guy can juggle, move on.

[^most-tech-companies]: Naturally, I can't speak with authority on this---nor can just about anybody, I would imagine, since no one has interviewed at "most tech companies." I'm basing what I write on my own experience at several different companies, along with anecdotes I've heard and articles I've write about others.

[^engineering-roots]: I.e., the founders were engineers.

[^bias-aside]: Can I actually say "bias aside"? Probably not. But I've gone and done it anyway.

[^coding-on-whiteboard]: I will say it's a bit crazy to me that, even today, so many interviews for engineering candidates are conducted *without a computer*. It's the twenty-first century, people!
