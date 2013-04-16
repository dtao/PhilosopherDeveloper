I never actually worked in an environment like this, but I've read enough articles on [The Daily WTF](http://thedailywtf.com/) to have an image in my head of the old, dusty, temperamental server that companies used to have back in the 90s and early 2000s. Those were dark days, from what I hear--when your business was victimized at the whim of an unpredictable piece of hardware. If the power went out, or the hard drive failed (and they all do), your site went down. It was as simple as that.

We live in a different era now, with PaaS and IaaS and all that cloudy good stuff. Your average tech-savvy business owner is going to know there's no particularly good reason to run your own server anymore if you're a small company. And if you're one of the large companes providing these services like Amazon or Google, you have been on top of the hardware problem for a long time, with data centers distributed around the country (or the world) connected in a controllable and reliable way. It's not an issue anymore.

This is a dream come true, in many ways, for executives and architects and everyone else at or near the top of the corporate food chain. The last thing you want in a top-down role is to be brought to your knees by a problem at the bottom, far below eye level. The infrastructures that exist now for tech companies abstract servers into basically a sea of computing potential, which can be drawn from predictably as needed. (And on those rare occasions when outages *do* occur, it's still nothing to lose sleep over. It's Amazon's problem; they'll deal with it and apologize profusely in the morning.)

Essentially hardware is now a **lever system**, where increased scalability demands call for sliding a lever up, at which point additional hardware is automatically provisioned and dedicated to storing your data, hosting your applications, etc. This is evident on sites like [Heroku](https://www.heroku.com/pricing) and [AppHarbor](https://appharbor.com/pricing), which literally give you levers to adjust how much computing power you want for your application servers and background works.

![Heroku's sliders for "web dynos" and "worker dynos"](/images/heroku-levers.png)
{: .full-size}

![AppHarbor's sliders for "web workers" and "background workers"](/images/appharbor-levers.png)
{: .full-size}
