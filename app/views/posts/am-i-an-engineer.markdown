Most people outside of the software development profession (and even many on the inside) may not realize that there is some disagreement within the community as to whether or not software development is a form of *engineering*.

Let's say you placed software developers along a spectrum, where at one end "engineering" might as well be a foreign word, and at the other end writing software is *obviously* a form of engineering, in much the same way that painting or sculpture is obviously a form of art.

![Is software development a form of engineering?](/images/engineering-spectrum.png)
{: .plain }

Personally, I have worked at various points along this spectrum. My first developer job was at a trading company in Philadelphia, which would have fallen pretty close to the extreme left end. At [ThoughtWorks](http://www.thoughtworks.com) I would say the culture was somewhere in the middle, with plenty of developers leaning in both directions (I definitely worked with self-professed "engineers" at ThoughtWorks, as well as individuals who vehemently rejected the label).

More recently I've worked in environments that fall much closer to the right side of the spectrum. The culture at [Cardpool](http://www.cardpool.com)--founded by two former Microsoft employees and with its first two hires from Google--was, not surprisingly, firmly in the software-as-engineering camp. I would expect no different from most large software companies (or developers with large company roots). And a couple of weeks ago I started at Google myself, which I'm guessing will be about as far to the right as I'll ever get in my career.

(By the way, it's probably not a coincidence that I chose to assign the left and right sides of the spectrum to the viewpoints that I did; read [Steve Yegge's argument](https://plus.google.com/110981030061712822816/posts/KaSKeg4vQtz) that software developers fall into "liberal" and "conservative" groups to get an interesting view on a related subject. And while you're at it, also read Richard Gabriel's [The Rise of *Worse is Better*](http://www.dreamsongs.com/RiseOfWorseIsBetter.html) for a much older but very similar perspective on two approaches to software, which he deems the *MIT approach* versus the *New Jersey approach*.)

A term that seems to have grown in popularity since I've been working is *software craftsman*. I don't know that this term is always intended to be in direct opposition to the idea of "software engineering"; but I think it is nonetheless a handy reference point to provide contrast to the perspective that software is definitely engineering.

Which brings me to a disclaimer I probably should have made earlier: I myself lean towards the left on this spectrum, so I am biased. That said, I don't consider either side to be the "correct" way of viewing software; and in fact, I believe the very attitude that holds one side to be superior to another is probably the most "incorrect" of all possible views on the topic. My primary reason for bringing this up is simply to point out that these different perspectives exist, and to do my best to highlight some important ways in which they are similar, despite their obvious differences.

But before I continue: **what am I even talking about?** I'm sure at least *someone* reading this has no idea what the terms "engineer" or "craftsman" are supposed to suggest. So let me provide a (relatively) quick, totally oversimplified characterization of each of these ideas.

What is an engineer?
--------------------

![An engineers at work](/images/engineer-at-work.jpg)

In **broad, overly general terms**, here's how I'd describe a software engineer.

Her **code is the product**. She takes pride in its quality and thinks through her designs carefully.

Of course, she wants her code to lead to useful software, which is why it is important that significant thought goes into writing requirements for it. Sometimes an engineer will take ownership of a project's requirements, but sometimes that will be someone else's job. If her code is written well and meets requirements, but those requirements turned out to be wrong or poorly defined, an engineer may still feel proud of her work. Her code could still be elegant, even if the product as a whole didn't turn out to be a success for other reasons.

To an engineer, **the practice of writing software is a discipline**. There is a right way to do it; and although it's naturally impossible to ever be 100% there, knowledge and experience equip good engineers to get closer and closer over time, as they learn from experience and apply what they've learned to their future work. For this reason an engineer will prefer to formalize her knowledge over time in the form of policies and conventions that can be applied at the team level.

If I may be abstract for a moment, I picture an engineer's development--not of code, but of herself--as being like the growth of a redwood: up and up, better and better.

![An engineer grows like a redwood.](/images/redwood-tree.jpg)

More experience &rarr; more knowledge.

What is a craftsman?
--------------------

![A craftsman at work](/images/craftsman-at-work.jpg)

Just a reminder: I am biased here. But this is how I'd describe a so-called "craftsman."

His **code is a tool**. A tool degrades and becomes blunt over time; this is unavoidable. But naturally, if a tool is useful then you sharpen it periodically to ensure that it continues to be useful. Tools that are seldom used and have worn out or rusted can be discarded or replaced.

A craftsman cares more that his code leads to useful software than that it is elegant or well designed. In fact, if he spent time making his code elegant but the requirements were poorly designed and the resulting software is not useful, a craftsman will be deeply upset because his time was wasted. For this reason he will almost always take at least partial ownership in ensuring that the requirements for a project make sense.

To a craftsman, **writing software is a craft**, based on creativity and technique. There is not a "right" way; there are many ways. Experience alone does not necessarily bring one closer to an ideal (because there is no single ideal). Instead, the more a craftsman learns, the more diverse his set of tools becomes; and his craft is more colorful as a result. A craftsman is less likely than an engineer to adopt formal rules or advocate team-wide policies, since to him code is a relatively personal thing.

I imagine a craftsman's growth as more like that of baobab tree: out and out, broader and broader.

![A craftsman grows like a baobab.](/images/baobab-tree.jpg)

More experience &rarr; more perspective.

Where the two shall meet
------------------------

As I said, I don't think either of these approaches is wrong. I think it's worth pointing out that both of these mentalities stem from the same underlying motivation: we all want to build high-quality software. It's also worth mentioning that even though I've painted a picture of contrast, it isn't like the things I said about engineers are completely untrue of craftsmen or vice versa, either. Most engineers certainly care that the software they build ends up doing something useful for someone, and craftsmen naturally enjoy (and even prefer) writing elegant code. The real difference between these types is more a matter of *relative weight* than stark acceptance or rejection of principles.

Unfortunately, even though we all may be cut from the same cloth deep down, I tend to feel that it is difficult, and probably inadvisable, to attempt to incorporate both cultures into a team. Either one or the other view of software development is likely to prevail in a group setting by sheer majority, and those on the other side of the spectrum will be alienated. Crafstmen in an engineering culture will inevitably feel stifled, while engineers in a craftsmen culture will become frustrated at what they perceive as a lack of discipine or consistency.

So if you're in the position of building a software team, it's worth reflecting for a moment on what the team's culture currently is (if you're adding to an existing team) or what you want it to be (if you're building one from scratch). I'm not saying that if you're assembling a craftsmanship-style team you should reject all resumes with the words "software engineer" on them; that would be absurd. But as part of the interview process I do think it would be worth your while to try and ascertain where any potential teammates lie on the software-as-engineering spectrum.

Naturally, people are adaptable. Part of the reason I decided to join Google was that I want to learn more about the software engineering culture, and to see what it's like at a company that has been so successful from it. Just recognize that *cultural fit* is about more than whether you would be glad to get a beer with someone. I would argue that the worst case scenario[^maybe-not-worst-case] for your team would be to bring someone very talented on board who ultimately cannot adjust to your culture. In that case you probably won't benefit from this person's potential nearly as much as you should, simply because we're all more productive when working in an environment we can identify with.

Does size matter?
-----------------

Among the myriad questions and objections you may find yourself thinking of in response to my position here, I suspect one of them might be: *what about for large projects?* It's an interesting question: surely you wouldn't put a team of *craftsmen* on a large-scale project, would you? Even if we accept that the two approaches to software that I've described are both valid in some sense, it would seem that the more structured and organized style of engineers would lend itself better to building large software systems.

![Would you trust a bunch of "craftsmen" with something like *this*?](/images/bridge-under-construction.jpg)

I tend to agree with the spirit of this question, but I think it's a bit misguided for two reasons.

1. As I said, people can adapt. This includes craftsman-style developers. Assigned to a large project with a sizable team, I'm confident that any good team--on either side of the spectrum--would adopt a fairly disciplined approach to building the software, with much more structure than perhaps they would on a smaller project.
2. However, the question implies (at least in tone, the way I hear it in my head) a certain inevitability to the need for a team to work on a large-scale project. I would challenge this assumption, and return to my earlier point about requirements. I suspect that in many cases, software projects that end up becoming large have little justification for getting that way. Sometimes the size and complexity of a piece of software inflates with the size of the team, forming a harmful feedback loop that leads to bloat. But that's a topic for another post.

In any case, it is probably true that sometimes large software projects are justifiable[^justifiable-large-software-projects]; and these require a great deal of organization and collaboration to run smoothly. And so an engineering culture is likely to emerge on these projects, regardless of the sort of software developers working on them. That said, it may sometimes also be possible to break a large project down into smaller projects, in which case semi-autonomous teams might still flourish with a craftsmanship culture.

Closing thoughts
----------------

I've said that it can be difficult for these two kinds of software developers to work together. Regardless, I still believe we have a lot to learn from one another by crossing from one side of the spectrum to the other on a regular basis, at least socially if not professionally. So think about whether you're more like a "craftsman" or more like an "engineer" as I've described them[^more-like-not-same-as], and seek out people that you think are different from you.

The fact that Richard Gabriel wrote about the MIT approach and the New Jersey approach *decades* ago--and it still applies today--says something. I really love it.

[^maybe-not-worst-case]: OK, maybe not *worst* case scenario. But it would still be unfortunate.

[^justifiable-large-software-projects]: It seems pretty clear to me that Google is a perfect example of this.

[^more-like-not-same-as]: I almost worded this, "whether you *are* a craftsman or an engineer"; but let's not get caught up in the idea that these terms actually define individuals. It is a convenient mental grouping, for me; but we are all obviously different and how you define yourself may not jive with the division I've drawn here at all--in which case, let me know! Leave a comment, or write an e-mail, or just come talk to me some time if we work together.
