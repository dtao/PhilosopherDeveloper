---
title: Why working on Bitbucket is awesome
date: 2017-05-20
published: false
---

I'm writing this for a number of reasons. For starters, I don't think I talk about this often enough with my own team. We are typically so focused on our day-to-day work that we all lose sight of just what an amazing opportunity this is. More generally, I've been meaning for a while now to write something like this, as a pseudo-response of sorts to articles with titles like [Programming Sucks][1]. It seems that many in our profession feel compelled to lament everything that's less than perfect about being a software engineer. I wish I read more articles by people who love their jobs.

So to an extent this is just me making a conscious effort to put some positivity out there.

# A brief history

I used to work at [ThoughtWorks][2] as a consultant. It was a great gig, and to this day I believe I had some of the best teammates there that I'll have in my career. After a couple years consulting, though, I started to get curious about what it would be like to work at a company where I felt a true sense of ownership in the work I was doing.

I started looking at startups, and before long I found myself at [Cardpool][3]. I was the fourth engineer on the team. The role came with tons of responsibility, and it was honestly pretty thrilling. I remember the first time I had to SSH into a production server and fix a problem. We were out to a team dinner, and my boss noticed on his phone that the website was down. One of the other engineers took me outside and we worked on a laptop on the sidewalk, piggybacking off some free Starbucks WiFi nearby to fix a production issue. I don't remember what the problem *was*, but I remember the rush of adrenaline. My coworker jumped up and down when the website came back up.

That's part of what's so great--and so scary--about being on a small engineering team at a startup. You're the first and last line of defense for all production issues. On the other hand, Cardpool had well under a million customers when I worked there. No matter how much I liked it, I knew I was only having a modest impact on a relatively small number of people.

I left Cardpool to work at Google, for two reasons. The first was scale: I wanted some experience working at a company making a big impact. Whether you like Google or not, the company's presence on the internet is pretty indisputable. The other reason I left for a bigger company was that my wife was pregnant with our first child, and I wanted to work at a "safe" company with good perks and the stability to ensure I could leave work at work and prioritize family.

It became clear to me at Google that the company's massive scale--taken together, Google's services handle literally *millions* of queries per *second*--was incompatible with the way we worked at Cardpool. Leaving the keys to your infrastructure with software engineers is a reality of life at startups, where the famous Facebook mantra "move fast and break things" really describes the only way to survive; but the bigger they are, the harder they fall, and a large company will never expose itself to that much risk. So as an engineer at Google, I was always removed from the infrastructure running the services I worked on, sometimes by several layers.

# Enter Bitbucket

When I decided to leave Google to work on Bitbucket, I remember having a distinct thought: that this could very well be the biggest product I would ever work on, while still being able to describe the entire system's architecture and having access to the infrastructure running it. That thought alone was exciting, and I'm happy to report the prediction has proven to be *mostly* accurate (who can ever describe an *entire* system's architecture?). But honestly, working on Bitbucket has exceeded my expectations. Nothing lasts forever, but I have no doubt that when I'm an old man my time at Bitbucket will be one of the highlights of my career.

For starters, there's the ownership, that thing that I felt was missing at ThoughtWorks. Bitbucket has millions of users and a tiny engineering team. Every engineer on the team has a ton of responsibility, from feature work to scalability to insights to customer support. The Austin team built one of the product's core services as our very first project, and to this day every time one of its imperfections rears its head I simultaneously curse our past selves for the mistakes we made and count my lucky stars to get to truly *own* something so big and important.

Then there's the impact. I already mentioned the millions of users. But this isn't a site where people share cat photos or rate each other like on Black Mirror. This is a powerful product that real professional teams use every single day, a tool that lets software developers share and review one another's code and legitimately makes them productive in ways they couldn't be without it. Does it have its flaws? Of course, but that only adds to the impact each of us is able to have, by addressing those flaws and making an already-great product better.

The scale is humbling. At Cardpool I remember running A/B tests for weeks just to collect enough data to draw any conclusions with statistical significance. On Bitbucket, we flip feature flags with trepidation, our eyes glued to graphs waiting to see an unexpected spike or drop that could mean we just impacted 10,000 or even 100,000 people. Hopefully we made things better, but it's sometimes impossible to know without tossing new code straight into the deep end of production traffic. (Probably every engineer on the team has had the experience at least once of testing a change locally, sometimes extensively, and then being taken completely by surprise by the performance impact in production.)

And all this happens under the umbrella of [Atlassian][4], a company that's doing extremely well, offers great benefits, and encourages a genuinely healthy work/life balance (heck, it's one of [the company's core values][5]). The company may not have quite as many billions in the bank as Google, but it feels every bit as stable. On top of everything I've said about Bitbucket being an awesome team to work on, I cannot emphasize enough how great it is to work with people who take for granted that family comes first.

[1]: https://www.stilldrinking.org/programming-sucks
[2]: https://www.thoughtworks.com/
[3]: https://www.cardpool.com/
[4]: https://www.atlassian.com/
[5]: https://www.atlassian.com/company/values
