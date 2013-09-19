---
title: The trick to good ballpark estimates
date: 2012-02-02
published: true
---

When I was younger my grandpa taught me and my sister a little trick. He said to me, "I can calculate how many hairs are on your sister's head." It seemed preposterous to my young mind; the number was surely so astronomical as to be beyond any intelligent guess. But I was curious.

What my grandpa did was to start with individual hairs. He counted 1, 2, up to ten, and held that many strands between two fingers. "This is ten," he said. Then, using roughly that many strands now as a unit, he counted out 9 more units of similar size, collecting them between the same two fingers. He now held roughly ten times the number of hairs from before. "This," he said, very seriously as he wanted to make sure we were paying attention, "is about a hundred."

I may have been a kid, but I immediately saw where he was going. Next, he counted by approximate hundreds, covering more and more area on my sister's head. He didn't have to keep holding it all between his fingers; it became reasonable at a certain point (maybe 100, maybe 1000) to eyeball it.

Of course, I have no memory of what the actual end result was. And obviously, it was not a precisely accurate number. But there's no doubt in my mind that it was an **accurate ballpark** estimate. My grandpa never studied human anatomy, but he figured out within an order of magnitude how many hairs were on my head with <strike>a minimal</strike> an *optimal* amount of effort.

Often, in software, ballpark estimates are exactly what we want. Particularly in your stereotypical "agile" project, where the client understands that absolute estimates are tough to produce but relative estimates are easy and that's why we use story points, *yada yada yada*, there are still very practical reasons to require some kind of time-based estimates. But the goal is not--it *can't* be--to pinpoint an exact date when a product will ship[^ship-date]. The goal is generally:

1. To get a sense of how much the project will cost, to see if it makes financial sense to pursue it
2. To get a sense of what other teams' schedules (e.g., sales and marketing) should look like
3. To satisfy the curiosity of those who will ultimately be the project's stakeholders

That last point may sound facetious, but it's really not. It's only human to want to know when you can expect something you're looking forward to. But that's the subject of another post entirely (which I doubt I'll ever write).

In not necessarily *all* but certainly *many* cases, the **first** point is the one that really matters. A project's *schedule* to an executive is often really just a proxy for its *cost* and the amount of *risk* it entails. And in this scenario, what is needed is not a *precise* number, like 173.6 days. Accuracy within a range (e.g., 5–7 months) is really just as good as pinpoint precision. Realistically, it's actually *better*, as it is more truthful.

I think people in the software world (and probably in general) fall into a trap when it comes to estimation. This trap is to attempt to count hairs in small groups without ever changing the unit size. That is, they take an additive approach without ever employing the multiplicative trick my grandpa used.

Imagine if, in order to count the hairs on someone's head, you counted up to ten hairs and then continued counting in units of ten until you'd covered the entire head. Not only would this take an unreasonable amount of time and effort, it seems doubtful that it would afford great accuracy. Yet this is what is commonly done on software projects: we create a huge list of *features* or *stories* and then we estimate every single one, sometimes in one big go. The result is some number that everyone agrees is very rough and likely not accurate; *so why did we put so much effort into the estimation*?

I propose that if a ballpark estimate is what we need, we'd be better off grouping our stories into groups of roughly similar size, estimating the individual stories in one or two of those groups, and then multiplying the average by the total number of groups. Would it be precise? No, but it doesn't need to be. Would it be accurate? Surely within an order of magnitude. And honestly, probably about as accurate (assuming the output of the estimation process is some reasonable range) as the more time-consuming method most teams use.

Obviously, as a project progresses, estimates are revisited. Stories that had been bundled up as a group get estimated individually as they come off the backlog. Some groups of stories end up being substantially larger than average, but others turn out to be smaller; the net effect on the original estimate is thus relatively controlled. Perhaps most importantly, one critical factor that was originally *very* uncertain at the project's outset--**velocity**[^velocity]--becomes significantly more measurable later on. And since this factor is literally indispensable in producing a projected schedule based on estimated effort (if we don't know how many story points we generally complete in a given unit of time how can we possibly guess how much time a project will take based on points alone?), it doesn't make sense to invest so much time into estimating effort before its value is at least *hazily* known.

Thus far in my career I have had a few opportunities to observe and contribute to projects where I felt an unreasonable amount of time was invested in up-front estimation processes. Given the relatively small sample size of these observations, I understand that there may be something I'm missing. But this is an area where I currently feel a great deal of skepticism, and I suspect I will continue to feel that way until some tremendously different experiences convince me otherwise.

[^ship-date]: To be fair, there *is* in fact quite often an exact date when the product must ship to coincide with some high-publicity opportunity; but in this case the target date is *independent* of any time-based estimates, which only serve to inform the organization whether the desired feature set is feasible within the allotted timeframe.

[^velocity]: Or whatever you want to call it.
