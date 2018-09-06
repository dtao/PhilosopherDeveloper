---
title: Should we write our own tests?
date: 2014-05-13 08:55:00 -0700
published: true
---

I have a feeling anyone reading this is likely to feel that the answer to the question *Should we write our own tests?* is obvious. But obviously what? Yes or no?

Let me first make a confession, which will probably (and understandably) be offensive to anyone reading this who identifies as a QA, test engineer, or something along those lines.[^being-a-jerk] For some time now I've held the belief that we as software developers should definitely be writing our own tests, and so the role of software QA is one that shouldn't have to exist.

To be clear, I have met plenty of very smart and capable QAs and I have never questioned the value of their work. I guess you could say I thought of software QA teams as sort of a necessary evil, a hack to provide better quality assurance given that many devs simply *don't* write tests, or write crappy tests. But if devs would just do their job right, I thought, QAs wouldn't be necessary.

I also thought of QA folks in the context of big waterfall environments where software projects would go through a development phase, then a QA phase. This is in contrast to the more "agile" style of *iterative* development, where the code is built and tested, continuously, either in parallel (two teams) or as one in the same process (devs writing their own tests).

So until recently, if you had put a gun to my head and shouted, *"What do you think of the state of software quality assurance today?!"* I would have blurted, *"I think maybe it's a symptom of a flawed and outdated methodology!"*

## Testing and unconscious bias

Now I'm not so sure. In particular I was moved to think about this question recently as it nicely parallels the issue of validating scientific research.[^slate-star-codex] If a group of scientists comes up with a hypothesis, and they conduct an experiment to test that hypothesis, and their experiment shows positive results, great. But they're not going to persuade the scientific community of their findings until that research is peer-reviewed, validated by other groups of researchers *without any bias* as to the correctness of the original hypothesis.

Part of the reason peer reviews are so important in science is simply that we can be more confident that empirical data is reliable when we have larger data samples. There's always the possibility that a set of experimental results was a fluke, or (probably more likely) was affected by some external factor that the researchers didn't think of.

Another part, though, is that when you have a vested interest in something it can be hard if not impossible to make an objective judgment about it. You might *really* want your hypothesis to be true because it would bring you a lot of prestige to have discovered it; it might provide support for a political or religious belief you hold; or it might simply be your baby and you've spent so many years on it that it would crush you if it turned out to be wrong. Under these conditions even rigorous scientists are likely to make subconscious errors in evaluating their findings: interpreting results generously, giving undue attention to supportive data while prematurely dismissing unsupportive data, etc.

I think this second reason provides a pretty strong argument in favor of having someone write tests *other than* the dev who wrote the code being tested. Whether that person is a QA or another dev or an SET[^qa-dev-or-set] and whether this happens as part of an iterative process or during a more waterfall-style QA phase are separate questions. The key point is that there should be someone writing tests who is unbiased, who does not have a vested interest in the code passing (or failing) tests, and for whom the code has no sentimental value. (If you're not a programmer you probably find that last clause to be ridiculous; if you are a programmer I bet you find it to be perfectly reasonable.)

## Preemptive counterarguments

I don't want to spend *too* much time speculating what arguments or observations others might make to what I'm saying---if you want to say something, go ahead and comment!---but there are a handful of responses I can already anticipate, which I might as well address just to save time.

### The person who wrote the code is in the best position to test it

This is absolutely true. I'm not saying that developers shouldn't *also* write tests for their code, any more than that researchers shouldn't (obviously) test their own hypotheses. I guess it's more a question of where we should set the bar for deeming some developer's work to be acceptable, or of how much confidence we should have in our code when we're the only ones who have written tests for it.

### Pair programming already provides a second pair of eyes

Yes, but this doesn't really address the fundamental issue, which is that tests should be written by someone without bias. Whether one developer wrote some code alone or two devs wrote it working together, the people who wrote the code will have difficulty testing it without any bias.

### A programmer wants his/her tests to fail as much as anyone when the alternative is buggy software!

This is a good point: maybe it's inaccurate to say that a dev has a *vested interest* in seeing tests pass. I mean, I've never worked in an environment where developers were rewarded simply for having passing tests. But that doesn't mean we're capable of objectivity.

Sure, we all know we're fallible and so we expect to sometimes catch mistakes and off-by-one errors and such things in our tests. But what if I write some code with a specific case in mind, and I completely neglect some other equally valid case? It's a classic I-don't-know-what-I-don't-know scenario: my design is fundamentally based on assumptions that I'm not writing tests for because I don't realize I'm making those assumptions!

So I maintain that developers are biased in favor of their own tests passing, not in the sense that we really *want* them to pass for our own pride, but in that we're predisposed to thinking our code is correct and writing only the tests that reinforce the assumptions we made in writing it.

## So what am I proposing, exactly?

I still hold the opinion that if a dev doesn't write tests *at all*, that is a pretty bad sign, just as it would be a bad sign if a researcher promoted a hypothesis they themselves never bothered to test. But it doesn't follow that *only* devs should write tests, or that the tests developers write are enough.

I'm really just thinking out loud here. Notably I haven't gone into much detail about what third-party tests should look like (though I have clearly said "write tests"---implying *automated* tests---and not "execute test scripts"), because I myself haven't put enough thought into that question to answer it. I just find myself much more sympathetic to an idea I used to be unfairly dismissive of,[^unfairly-dismissive] and---as always seems to happen!---I'm finding there's more to the story than I originally thought.

[^being-a-jerk]: As a weak self-defense against potential accusations of being a jerk, I should point out that my first job out of college was as a software QA.

[^slate-star-codex]: If you're *really* interested, I've just started reading the blog [*Slate Star Codex*](http://slatestarcodex.com/), and I am enjoying it quite a bit.

[^qa-dev-or-set]: *Software Engineer in Test*: an official role at Google, as opposed to say a SWE (software engineer) or an SRE (site reliability engineer).

[^unfairly-dismissive]: *Hopefully*, I'm preaching to the choir here, and I was actually alone in having these reprehensible misconceptions about testing in the first place!