---
title: Hero culture vs. Borg culture
date: 2013-06-14 08:30:00 -0700
published: true
---

Most of us in software (and probably in other fields) know about **hero culture**. It's a concept everybody loves to hate. The term refers to an environment where individuals work in isolation and thrive on receiving sole credit for their work. This is generally perceived as leading to inflated egos and poor cooperation among developers. It's the same phenomenon you see in professional sports, when star athletes are sometimes accused of not being good "team players" and getting greedy with the ball, wanting to be the center of attention.

So there are social reasons to dislike hero culture. There are plenty of practical reasons, too. One involves a principle known as the [bus factor](http://en.wikipedia.org/wiki/Bus_factor): the more you rely on a hero, the more vulnerable you are in the event of losing him or her---e.g., if he or she is hit by a bus, or leaves for another company.

But you guys know me. If everybody else is going left, I'm going to go right (a highly predictable trait that [my friend Sameer](http://www.skalb.com/) frequently reminds me of).

If you turn away from hero culture and sprint in the opposite direction, you'll eventually start getting into what I'll call **Borg culture**.

Borg culture is the antithesis of hero culture, where every individual is functionally equivalent. In a Borg culture, there is no place for glory or arrogance. There's also no pride and no personal ownership. I would argue that this isn't really better.

A while back I wrote about [software engineering versus software craftsmanship](/posts/am-i-an-engineer.html). In general, I think most of us would associate my description of "engineering" with what is typically done at larger corporations---less personal, more mechanical. That sounds like Borg culture. Actually, I think it's just the opposite. Big companies are notoriously conducive to hero culture, because they have a tendency to become large and bloated, teeming with mediocrity. This encourages better-than-average individuals to rise above the fray and get a lot of recognition for not being mediocre.

I suspect many of us have been in that situation at least once or twice. It can be a nice feeling, to have everyone impressed with you for something that really wasn't so hard. It's a dangerous place to be in, though, because after a while you get comfortable and stop improving. Without data to back it up, I nonetheless feel confident in saying that this happens all the time to "engineers" at big companies.

Counterintuitively, I see those who fall much closer to the "craftsman" end of the spectrum often succumb to the allure of Borg culture. On first glance that doesn't seem like it would be right. But it is, in my experience, for at least two reasons:

1. A craftsman (in my personal, egregiously over-generalized opinion) is more humble. He is likely to reject labels like "hero" or "rock star" (ugh!) and downplay his own talents.
2. Craftsmen put a lot of stock in practices that de-emphasize *personal* awesomeness: pair programming, TDD, CI, etc. These so-called agile methods embrace the inevitability of mistakes and focus on solving problems iteratively. There is a humility to this mindset as well.

Some of the outcomes of Borg culture are commonly viewed in a positive light, but I believe it would be wise to consider them more critically. One example is **collective code ownership**. Agile teams often sing the praises of this idea that we're all responsible for all of the code. That can be a great thing, inasmuch as it encourages each of us to follow the [Boy Scout Rule](http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule) and happily fix one another's bugs. It can also be problematic.

A Borg culture anecdote
-----------------------

On my last project at ThoughtWorks, I was pairing with our team's tech lead on a pretty important piece of our project's overall architecture. We set out to lay the groundwork for what would eventually become a public API. One of the decisions we made early on as a team was to be very disciplined about dogfooding our own API, building a front end that would operate as an ordinary client, with no special privileges. We didn't want to go the standard website approach where your logic ends up being tightly coupled to your views. Everybody was more or less on board with this plan.

We did a bit of work, but didn't get all that much done before it was time to rotate pairs. (Another decision we had made as a team was to regularly rotate pairs, to maximize knowledge transfer among devs and get everybody exposed to everything. The project was an iPad app, with a Ruby back end as well as a mobile web UI. So we were all writing Objective-C, Ruby, and CoffeeScript---a great learning experience for most of us\![^exclamation-points])

One of us---I can't remember who---stayed on the same story and worked alongside another dev. Some time later, the pairs rotated again. It turned out that this work took place over the course of several rotations. By the end, the two developers working on the story were quite far removed from the conversations we originally had about it. Context was lost, and it was a bit of a mess: the coupling we had hoped to avoid was quite strong, and the API was not shaping up at all.

This wasn't supposed to happen! The whole point of rotating pairs and having everybody work on everything was to ensure that context *not* be lost. What went wrong?

In retrospect, recognizing that things had been going badly, the team acknowledged that we should have bent the rules with respect to pair rotation on this particular story. Looking back on the situation now, though, I think what happened is not so surprising. It comes back to what I said earlier about Borg culture: taken too far, it can cause a team to be deficient in personal pride and individual ownership. Then [broken window theory](http://en.wikipedia.org/wiki/Broken_windows_theory) sets in: since the code is *everyone's* responsibility, everybody thinks "surely someone else is keeping an eye on this." It might as well be *no one's* responsibility.

Specialization is inevitable
----------------------------

Collective ownership is a great idea, but it has its limits. On large projects, it can be unrealistic. Imagine a small community where everyone knows each other and there's a neighborhood watch. That sounds about right. If you tried to apply the same idea to a larger city it wouldn't hold. A person can't deeply, personally care about every street corner in a metropolis. So specialization needs to happen.

I actually left ThoughtWorks before the project was completed. Around that time, the team was discussing the idea of splitting into specialized groups: one for the iOS app, one for the back end, one for the mobile web UI---or anyway, something like that. We had been tossing the idea around for a while, but none of us really *wanted* to do that. Over time, however, it was becoming clear that it was probably the right thing to do. We needed ourselves to take more ownership in what we were doing; and if it that wasn't happening on its own, we needed to [program ourselves](/posts/automating-yourself.html) to *make* it happen.

When you make people responsible for something, they tend to rise to the occasion. This is the real reason I think we need to shake up our biases, just a little bit, when it comes to hero culture. Of course, if we were to head back in that direction we wouldn't want to call it "hero culture" but something less self-congratulatory. No one wants to foster a team filled with arrogance. But we also don't want a scenario where there's no coherent vision and nobody takes personal responsibility for anything, right?

So as it seems I'm always saying, aim for the middle. Hero culture has its fair share of problems, but so does Borg culture. Let's not throw the baby out with the bathwater; personal ownership and accountability are actually *good* aspects of hero culture. And collaboration and humility are terrific aspects of Borg culture. Take the good from each, and try to avoid becoming so proud or so dogmatic that you start inheriting the bad.

[^exclamation-points]: FYI, you might start seeing more exclamation points from me in the immediate future. I just finished reading [*Surely you're joking, Mr. Feynman!*](http://www.amazon.com/Surely-Feynman-Adventures-Curious-Character/dp/0393316041) and loved it! (Feynman makes liberal use of exclamation points. My high school English teacher would not have approved.)
