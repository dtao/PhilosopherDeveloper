---
title: Working on Bitbucket is awesome
date: 2017-12-02
published: true
---

I'm writing this for a couple of reasons. For starters, I don't think I talk about this often enough with my own team. We are typically so focused on our day-to-day work that it can be all too easy to lose sight of just what a special opportunity we all have.

More generally: maybe it's just me, but it seems there's a lot of negativity in the software world. For some reason many in our profession [actually seem to hate what they do][1], which is hard for me to relate to. I'd like to see more articles by people who love their jobs, especially those of us lucky enough to work at great companies, on terrific products, with incredible teams.

So basically this is me making a conscious effort to put some positivity out there, in a space where I feel a lot more positivity is warranted.

# A brief history

Working at [ThoughtWorks][2] as a consultant, I was privileged with a relentless string of learning opportunities from working at different clients, following different processes, and playing with different technologies on every project. To this day I strongly recommend consulting to anyone who's early in his or her career and willing to prioritize education over financial gain (a wise investment). After a couple years consulting, though, I started to notice I didn't feel much personal ownership in the work I was doing[^personal-ownership]. I wanted to know what that would feel like.

I started looking at startups, and before long I found myself at [Cardpool][3]. I was the fourth engineer on the team. The role came with tons of responsibility, and it was honestly pretty thrilling. I remember the first time I had to SSH into a production server and fix a problem. We were out to a team dinner, and my boss noticed on his phone that the website was down. One of the other engineers took me outside and we worked on a laptop on the sidewalk, piggybacking off some free Starbucks WiFi nearby to fix a production issue. I don't remember what the problem *was*, but I remember the rush of adrenaline. My teammate jumped up and down when the website came back up.

That's part of what's so great--and so scary--about being on a small engineering team at a startup. You're the first and last line of defense for all production issues. On the other hand, Cardpool had well under a million customers when I worked there. No matter how much I liked it, I knew I was having only a modest impact[^modest-impact] on a relatively small number of people.

Working at Google was very much the opposite experience. As the group responsible for the ads quality pipeline, everything my team touched potentially impacted tens if not hundreds of millions of people. On the other hand, while leaving the keys to your infrastructure with software engineers is a reality of life at startups, at Google things could not have been more locked down. I was so removed from the infrastructure running the services I worked on, I couldn't tell you how many servers were running the application, how many databases were storing the data, or even *where they were*. If some hackers were to kidnap me to try to get information about Google's systems, I would have been pretty worthless.

# Enter Bitbucket

When I left Google to join Atlassian and work on Bitbucket, I remember having the thought: this could be the biggest product I would ever work on, while still being able to describe the overall architecture and having access to the infrastructure running it. That thought alone was exciting, and I'm happy to report the prediction has proven to be mostly[^mostly-accurate] accurate. But honestly, working on Bitbucket has exceeded my expectations. Nothing lasts forever, but I'm confident that by the time I retire my time at Bitbucket will have been one of the highlights of my career.

The truth is, every job I described thus far--ThoughtWorks, Cardpool, Google--was actually an amazing job in its own right. Yet working on Bitbucket combines the best of all of them.

For starters, there's the ownership, that thing that I felt was missing as a consultant. The Austin team built one of the product's core services as our very first project, and to this day every time one of its imperfections rears its head I curse the disruption. But under my breath, I thank my lucky stars that we get to truly *own* something that provides real value to tons of software teams all over the world. And this has remained true for each of the projects my team has worked on since.

Then there's the impact. This isn't a site where people share cat photos or rate each other like on Black Mirror. This is a truly useful product that real professional teams use every single day, a tool that lets software developers share and review one another's code and legitimately makes them productive in ways they couldn't be without it. Does it have its flaws? Of course, but that only adds to the impact each of us is able to have, by addressing those flaws and making an already-great product better.

Lastly, it might not be Google, but the scale is humbling. At Cardpool I remember running A/B tests for *weeks* just to collect enough data to be able to talk about statistical significance. On Bitbucket, we flip feature flags with trepidation, our eyes glued to graphs waiting to see an unexpected spike[^unexpected-spike] or drop that could mean we just impacted 10,000 or even 100,000 people. Hopefully we made things better, but it's sometimes impossible to know without tossing new code straight into the deep end of production traffic[^production-traffic].

And all this happens under the umbrella of [Atlassian][4], a company that's doing extremely well, offers great benefits, and encourages a genuinely healthy work/life balance (heck, it's one of [the company's core values][5]). The company may not have quite as many billions in the bank as Google, but it feels every bit as stable. On top of everything I've said about how awesome it is to be a part of the Bitbucket team, I'd be remiss to leave out how great it is to be part of a company where life is about more than work, where people push themselves but don't kill themselves.

# What was the point of saying any of this?

Look, I don't have a neat conclusion for you. Like I said at the start, the main reason I felt compelled to write this was actually for my team; so maybe I should address you all directly.

I know we're not perfect. But I really believe this is one of the best opportunities out there for software developers. We're a great team and we work on a great product that provides a ton of value to countless teams just like (and including) us. We own the work we do; each of us makes a significant impact that touches a huge number of people; and for better or worse, we have the keys to the castle, and all the responsibility that goes along with that.

Programming does not suck. Certainly not for us.

[1]: https://www.stilldrinking.org/programming-sucks
[2]: https://www.thoughtworks.com/
[3]: https://www.cardpool.com/
[4]: https://www.atlassian.com/
[5]: https://www.atlassian.com/company/values

[^personal-ownership]: It can be frustrating when you aren't allowed to tell people what you've worked on, especially when you've worked on products they actually use!
[^modest-impact]: I've noticed that startups tend to focus heavily on the *potential* impact they *might* have one day (e.g., disrupting an X-billion-dollar industry), effectively distracting candidates from the reality that their current impact is quite limited.
[^mostly-accurate]: To be fair, I don't have quite as much direct access to the infrastructure as I used to, which is probably a good thing.
[^unexpected-spike]: ...and on occasion, finding [bugs in widely-used open source projects](https://github.com/jsocol/django-waffle/pull/249) in the process.
[^production-traffic]: Probably every engineer on the team has had the experience at least once of testing a change locally, sometimes extensively, and then being taken completely by surprise by the performance impact in production.
