I never actually worked in an environment like this, but I've read enough articles on [The Daily WTF](http://thedailywtf.com/) to have an image in my head of the old, dusty, temperamental server that companies used to have back in the 90s and early 2000s.

![Ye olde server](/images/ye-olde-server.jpg)

Those were dark days, from what I hear--when your business was victimized at the whim of an unpredictable piece of hardware. If the power went out, or the hard drive failed (and they all do), your site went down. It was as simple as that.

We live in a different era now, with PaaS and IaaS and all that cloudy good stuff. Your average tech-savvy business owner is going to know there's no particularly good reason to run your own server anymore if you're a small company. And if you're one of the large companes providing these services like Amazon or Google, you have been on top of the hardware problem for a long time, with data centers distributed around the country (or the world) connected in a controllable and reliable way. It's not an issue anymore.

This is a dream come true, in many ways, for executives and architects and everyone else at or near the top of the corporate food chain. The last thing you want in a high-up role is to be embarrassed by a problem at the bottom, far below eye level. The infrastructures that exist now for tech companies abstract servers into basically a sea of computing potential, which can be drawn from predictably as needed. (And on those rare occasions when outages *do* occur, it's still nothing to lose sleep over. It's Amazon's problem; they'll deal with it and apologize profusely in the morning.)

The lever system
----------------

Essentially hardware is now a **lever system**, where increased scalability demands call for sliding a lever up, at which point additional hardware is automatically provisioned and dedicated to storing your data, hosting your applications, etc. This is evident on sites like [Heroku](https://www.heroku.com/pricing) and [AppHarbor](https://appharbor.com/pricing), which literally give you levers to adjust how much computing power you want.

![Heroku's sliders for "web dynos" and "worker dynos"](/images/heroku-levers.png)
{: .full-size}

![AppHarbor's sliders for "web workers" and "background workers"](/images/appharbor-levers.png)
{: .full-size}

I think there's a similar dream a-brewin' in the industry when it comes to people. I also think it's dead wrong. But let me explain.

A couple of weeks ago, I read in the news that Apple [was assigning some OS X engineers to work on iOS](http://www.techspot.com/news/52134-rumor-ios-7-behind-schedule-os-x-109-engineers-moved-to-help.html) to help get the next version of the operating system back on schedule. It reminded me of a famous essay by Fred Brooks called [The Mythical Man Month](www.amazon.com/The-Mythical-Man-Month-Engineering-Anniversary/dp/0201835959), which is essentially a direct rebuttal of the notion that adding people to a software project speeds it up. Written in 1975 from experience on the development of [OS/360 at IBM](http://en.wikipedia.org/wiki/OS/360), the essay provides a compelling argument that adding bodies to a delayed software project *actually delays it further*. This is now known as **Brooks's Law**:

> Adding manpower to a late software project makes it later.

It has amazed me, ever since reading Brooks's essay, how almost universally it seems companies ignore this principle[^bible-of-software-engineering]. They want *so badly* to be able to speed up software projects by adding engineers--to have greater control over their outcomes--that they'd rather believe Brooks's Law is wrong, or pretend to have never heard of it, than take it seriously.

![I can't hear you!](/images/lalala.jpg)

Because that's the dream: **companies want a lever system when it comes to people**. Software project running behind schedule? Got cash to burn? No problem! Just push the *manpower* lever up another 50% or so, and the project will zip right along up to your desired velocity.

A lot of what larger companies do (including Google) is meant to facilitate this dream. Companies employ software architects to design systems for engineers to build, like construction workers assembling a building according to a (real) architect's vision. They set well-defined processes for software development. They choose approved tools and technologies. The goal of all this being to establish a baseline that applies to every engineer, so that anyone who understands this baseline can be easily allocated to any project within the company with minimal ramp-up costs. (I am reminded of tools like [Chef](http://www.opscode.com/chef/) and [Puppet](https://puppetlabs.com/) that serve a similar function with respect to servers: establishing a baseline configuration so that machines can be seamlessly allocated to provide greater capacity for a hosted application.)

Remember that "sea of computing potential" I described with hardware? This is what many companies want with people, too. It's why the terms "human resources" or "human capital" exist: the more human resources I stockpile, the more manpower I have to throw at any project that I want done quickly.

The problem with viewing people as resources
--------------------------------------------

I recognize that to a certain extent, the strategies I just described make some sense for large companies with hundreds or thousands of employees. If you *know* developers are going to come and go, you want to minimize the cost you pay each time that happens. It's also good to give people as much mobility between projects as possible, not just for the company's good but for theirs as well: no one wants to feel *stuck* on a project.

But I still think there's a pretty big problem with this people-as-resources fantasy, and it impacts smaller teams most of all. Let me know if this sounds right to you: ambitious young entrepreneur has a great idea for a product, bends over backwards to recruit some of the best engineers she can find, then outlines her vision and asks the engineers to execute.

Or how about this one: young engineer catches the attention of a few tech companies, gets recruited, goes through interviews, then finally gets to negotiating salary and ends up with lower pay than he'd like.



[^bible-of-software-engineering]: For this reason Brooks has lovingly referred to *The Mythical Man Month* as "the Bible of software engineering": "everybody quotes it, some people read it, and a few people go by it."
