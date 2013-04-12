A few years ago my parents gave me and my wife this knife as a Christmas present:

![The Shun Classic Utility Knife](/images/shun-utility-knife.jpg)

We weren't quite sure what to make of it at first, but it wasn't long before we both loved it. It is a *very* sharp knife, which makes it a breeze to cut through just about anything. Unfortunately, that *anything* includes human flesh; I know this because a few months after receiving the knife I was cutting an avocado and the knife slipped in my hand. It was quite a bad cut.

Obviously--if you know me, you know I still have all ten fingers--my wound healed eventually. But naturally I still have a pretty clear memory of the incident, and so I definitely don't want to repeat it. Here are two ways I could protect myself from future self-inflicted injury:

1. Decide **the knife is too sharp**. Maybe I should just get rid of the knife and replace it with a duller one, so that if my hand ever slips while cutting again the injury won't be so bad.
2. Decide **I was too careless** using the knife. In the future I should cut more slowly and be very careful whenever I'm using the knife.

I believe these are the same two options many developers choose between when building software.

In the first camp, you have the mentality that our tools must be safe and protect us from harm. This is a classic reason to prefer statically typed languages like Java or C#: the compiler can tell when I've done something wrong! A significant number of potential bugs are eliminated before human consideration even enters the picture. This makes it nearly impossible to actually ship code with boneheaded mistakes like typos, syntax errors, etc.

In the second camp, there's the philosophy that we must practice restraint in our development efforts. Teams with this attitude may use dynamic languages, for example, but might enforce strict guidelines as to how code should be written, reviewed, and deployed. They might require code reviews before every push. Maybe they'll even write their own static analysis tools to gain back some of the safety (and performance) of statically typed languages.

I propose that **there is another way**.

!(/images/better-way.gif)

**What if I just continue to use the knife as before?** Sure, I cut myself, and it hurt; but in the end, I healed. It was a pretty minor wound. And in software, except in some rare cases, we're not talking life or death. Even at large companies with a great deal on the line I'd argue this applies in most everyday cases; but it's *especially* true at smaller companies, where remaining nimble--and responding quickly to change--is so much more important than avoiding risk.

Put another way: I could spend the rest of my life cutting very slowly to reduce the risk of cutting myself; or I could 

<iframe src="http://charter.herokuapp.com/embed/YH35RN6J" style="height: 450px; width: 600px;" />
