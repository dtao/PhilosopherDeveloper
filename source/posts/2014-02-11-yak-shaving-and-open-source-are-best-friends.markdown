---
title: Yak shaving and open source are best friends
date: 2014-02-11
published: false
---

There's this term in software development: **yak shaving**. The best definition I've come across[^best-definition-of-yak-shaving] is on [Seth Godin's blog](http://sethgodin.typepad.com/seths_blog/2005/03/dont_shave_that.html); I don't know if it's original to him or not, but here it is regardless:

> [...Y]ou find something you need to do. "I want to wax the car today."
> 
> "Oops, the hose is still broken from the winter. I'll need to buy a new one at Home Depot."
> 
> "But Home Depot is on the other side of the Tappan Zee bridge and getting there without my EZPass is miserable because of the tolls."
> 
> "But, wait! I could borrow my neighbor's EZPass..."
> 
> "Bob won't lend me his EZPass until I return the mooshi pillow my son borrowed, though."
> 
> "And we haven't returned it because some of the stuffing fell out and we need to get some yak hair to restuff it."
> 
> And the next thing you know, you're at the zoo, shaving a yak, all so you can wax your car.

So the basic idea is that it's when you find yourself doing something far removed from your primary goal, as a necessary step in a long chain of prerequisites.

How did I get here?
-------------------

Yak shaving is viewed in a pretty negative light most of the time, and understandably so. Often it's a sign that you've totally lost track of what you're really trying to accomplish.

I used to be guilty of this all the time on my first job as a software developer. I remember writing all kinds of internal libraries to help myself do this or that: string helpers, collection helpers, number helpers, etc. It can be good to do that, but I would get really sidetracked and end up polishing the libraries more than I actually worked on the application. The result was a plethora of over-engineered, overly generic code that was capable of doing much more than anybody needed it to do.

Experience tells me that pair programminsg is a very good weapon against yak shaving. *You* might easily get sidetracked following a long chain of loosely related goals; but your partner has no time for that nonsense. It's easy for another person to spot the signs of yak shaving early on.

[^best-definition-of-yak-shaving]: I particularly like this definition because it actually involves *shaving a yak*, which most definitions don't. I reali

[^technology-x]: Which, 9 times out of 10, is regular expressions.
