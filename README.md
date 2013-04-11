The following is the most recent post from my blog, **The Philosopher Developer**, written on April 11, 2013.

***

Risk aversion and software development
======================================

A few years ago my parents gave me and my wife this knife as a Christmas present:

![The Shun Classic Utility Knife](/images/shun-utility-knife.jpg)

We weren't quite sure what to make of it at first, but it wasn't long before we both loved it. It is a *very* sharp knife, which makes it a breeze to cut through just about anything. Unfortunately, that *anything* includes human flesh. I know this because a few months after receiving the knife I was cutting an avocado and the knife slipped in my hand. It was quite a bad cut.

Obviously--I still have all ten fingers--my wound healed eventually. But I still have a pretty clear memory of the incident, which makes me quite fearful of repeating it. Here are two ways I could protect myself from future self-inflicted injury:

1. Decide **the knife is too sharp**. I replace the Shun knife with a duller one, so that if my hand ever slips while cutting again the injury won't be so bad.
2. Decide **I was too careless**. In the future I could cut more slowly and be very cautious whenever I'm using it.

I believe these are the same two options many developers choose between when building software.

In the first camp, you have the mentality that our tools must be safe and protect us from harm. This is a classic reason to prefer statically typed languages like Java or C#: the compiler can tell when I've done something wrong! A significant number of potential bugs are eliminated before human consideration even enters the picture. This makes it nearly impossible to actually ship code with boneheaded mistakes like typos, syntax errors, etc.

In the second camp, there's the philosophy that we must practice restraint in our development efforts. Teams with this attitude may use dynamic languages like Ruby or JavaScript, for example, but still might enforce strict guidelines as to how code should be written, reviewed, and deployed. They might require code reviews before every push. Maybe they'll even write their own static analysis tools to gain back some of the safety (and performance) of statically typed languages. And they will almost certainly have a process in place that establishes *some* safeguards before code is deployed.

Besides these two approaches, I propose that there is a third option.

![Or at least, a *different* way](/images/better-way.gif)

**I could just continue to use the knife as before.** Sure, I cut myself, and it hurt; but in the end, I healed. It was a pretty minor wound[^minor-wound], in the grand scheme of things. And in software, except in some rare cases, we're not talking life or death. Even at large companies with a great deal on the line I'd argue this applies in most everyday cases; but it's *especially* true at smaller companies, where remaining nimble--and responding quickly to change--is so much more important than avoiding risk.

Put another way: I could spend the rest of my life cutting very slowly to reduce the risk of injuring myself; or I could let myself move quickly and live with the risk of sometimes drawing a little blood. Over time I believe the latter approach leads to greater total progress[^charter].

<iframe src="http://charter.herokuapp.com/embed/136BV6U4" style="height: 450px; width: 600px;" />

I recognize that my knife analogy starts to break down right about now, because the total amount of time we're talking about here over the course of my life is pretty insignificant. If I were a *professional chef*, on the other hand, I think the literal lesson would probably still apply. As it happens, I'm a professional software developer; and the *figurative* lesson applies as much to those in our field as to anybody, if not more so.

I'm not saying don't be careful. Of course you could easily take this argument too far. But I suspect that many companies have already gone too far down one of the first two paths I described; and I think it's important to always remember the third option exists.

[^minor-wound]: Don't get me wrong; it was actually a very bad cut that took nearly a month to heal. But the fact remains that it *did* heal. It isn't like I lost a limb. So I maintain that, relatively speaking, it was quite minor.

[^charter]: Hey by the way, that chart was made using a tool called [Charter](http://charter.herokuapp.com), *another* one of my open source projects! (And Charter itself uses [HighTables](http://dtao.github.io/HighTables/)--that's what they call dogfooding, my friends.)
