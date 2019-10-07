---
title: Not solved here syndrome
date: 2011-07-24
published: true
---

I'm not even going to flatter myself with the whole *You must have been wondering where I was!* spiel this time. For those of you out there who actually haven't given up on me completely by now: thanks! As you might have suspected, I've been both busy (with work and school) *and* lazy (with this blog)—a pretty deadly combination.

This does not bode well for my goal of [posting every day in 2011](http://dailypost.wordpress.com/).

![Boo hoo!](/images/boo-hoo.jpg)

Oh well. There's no sense regretting the past; all I can do is move forward, right? Whether I'm able to get back to daily posts or not, I guess time will tell.

One thing that's been keeping me occupied lately (and trust me, this is a *totally* legitimate reason not to be productive) is [logic puzzles](http://wiki.xkcd.com/irc/Puzzles). I used to love these things when I was younger, and then I don't know what happened. It's like I forgot they existed. But then [a friend](http://evservations.blogspot.com/) recently texted me this out of the blue:

> 25 racehorses, no stopwatch, 5 tracks.  
> Figure out the 3 fastest horses in the fewest number of races.

Oh man, I was immediately fixated on that problem. I think he got it from a magazine article about common interview questions or something ([not that anyone actually believes in the value of such questions these days](http://blogs.msdn.com/b/ericlippert/archive/2011/02/14/what-would-feynman-do.aspx)). Sadly, I tricked myself into thinking I had the right answer when I actually didn't. Here's what I thought:

1. Race all 25 horses in 5 groups of 5. (5 races)
2. Race all the first-place horses together. (+1 = 6 races)
3. Race all the second-place horses together. (7 races)
4. Race all the third-place horses together. (8 races)
5. Race the top three horses from #2, and the top horse from each of #3 and #4, all in one final race. (9 races)
6. The top three horses from #5 are the three fastest horses.

In case you can't figure out why the above strategy would work, feel free to leave a comment asking for an explanation (I will respond).

But as I said, this actually isn't the right answer to the question, because **it takes 9 races when the optimal answer only takes 8**. Can *you* figure out the optimal solution? (No cheating!)

And to clarify: a track accommodates up to 5 horses at once. And all the horses run at perfectly consistent speeds (i.e., a given horse will always run at the same speed in every race).

***

Several days later...
---------------------

I shared this problem with a coworker, and it got us talking about other logic puzzles we knew about. He told me about the [Blue Eyes](http://xkcd.com/blue_eyes.html) problem, or the "hardest logic puzzle in the world" according to [XKCD](http://xkcd.com/)'s Randall Munroe. Naturally I was instantly motivated to do nothing but think about the puzzle until I could figure out the solution (which I finally did). Meanwhile we continued to exchange logic puzzles back and forth.

Finally my coworker and I reached a point where we had apparently exhausted our supply of logic puzzles. I couldn't think of any more that I knew, and neither could he.

Naturally, we took to the internet looking for more[^internet-cats].

![I can haz logic puzzls?](/images/cat-surfing-the-web.jpg)

What we managed to stumble upon—and I'm really not sure how we came across this—was a logic puzzle originally attributed to [Raymond Smullyen](http://en.wikipedia.org/wiki/Raymond_Smullyan), a world-famous logician. Not only that, but the problem was described by another famous logician ([George Boolos](http://en.wikipedia.org/wiki/George_Boolos)) as <a href="http://en.wikipedia.org/wiki/The_hardest_logic_puzzle_ever">the hardest logic puzzle ever</a>.

> Three gods A, B, and C are called, in no particular order, True, False, and Random. True always speaks truly, False always speaks falsely, but whether Random speaks truly or falsely is a completely random matter. Your task is to determine the identities of A, B, and C by asking three yes-no questions; each question must be put to exactly one god. The gods understand English, but will answer all questions in their own language, in which the words for yes and no are *da* and *ja*, in some order. You do not know which word means which.

Needless to say, I was occupied for quite some time. It might have been days or more than a week; I can't remember clearly. But I would guess that it was at least a couple of *weeks* I was thinking about this problem, on and off.

I did eventually figure out an answer (I wouldn't exactly call it the "right" answer, since I imagine there are multiple possible solutions; but it is definitely correct... either that or I'm crazy). And naturally, I texted my wife immediately to tell her I'd solved it (she'd had to put up with me staring off blankly every now and then for, again, probably something like two weeks). And then I e-mailed my colleague to tell him I had an answer. I really felt quite triumphant.

Meanwhile, *another* coworker had looked up the answer online, and occasionally liked to joke (while I agonized over the problem) that he had figured it out already, with very little effort: by reading someone else's solution!

This would get a chuckle from everybody; but the funny part is that all along, I knew I was being ridiculous. Spending weeks thinking about a logic problem (with basically no relation to the world we live in) accomplishes nothing. More importantly, it is **redundant** as the problem has already been solved! For me to have spent so much time thinking about it was a matter of pride and stubbornness: that's really it. (Of course, I can *say* this; but do I *regret* solving it myself? Nope!)

And now for the sad commentary: this is actually a major problem in the software industry. Software is, at its heart, a form of invention; and yet so little of the work software developers do involves solving new problems. A significant percentage of it is doing something that's already been done—by a competitor, or for a different client, or in a different language, or on a different platform, etc. And sometimes that's unavoidable, but sometimes it's not.

All too often, software already exists to solve a certain problem, but we as engineers are motivated by a variety of reasons (pride and stubbornness typically among them) to disregard such software and build our own. Obviously, given my little story about logic puzzles, I can sympathize. Sometimes you just want the satisfaction of doing something yourself. Or you feel that whatever's out there doesn't *quite* meet your needs, and you'd rather start from scratch than contribute to what's already been done (presumably you think you could do it better).

I don't know how well we can realistically expect to move away from this phenomenon; but it does make me sad to think of how much further along we could be in the world of software if we were better at reusing one another's work and building on top of it. It seems to me we ought to have built a skyscraper by now, and all we have is a vast scattering of fat little buildings.

[^internet-cats]: You know, I'm not generally a cat person; but for some reason [internet cats](http://www.youtube.com/watch?v=z_AbfPXTKms) are awesome to me.
