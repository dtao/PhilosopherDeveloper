---
title: Code and jazz
date: 2014-03-11
published: false
---

Pete recently wrote about JavaScript without `this`, and I had mixed feelings about it. It got me
thinking: *Why am I ambivalent on this subject?* Here's what I've come up with.

On the one hand, I like Pete's advice. I worked on EMB with him and coding without `this` worked
really well for us.

On the other hand, I guess what rubs me the wrong way is nothing that Pete wrote, but rather the
takeaway that I imagine some readers getting from it. Pete's article is actually really good; I see
it as more of a "This is possible, and it actually has some nice benefits" point of view than a "You
should definitely adopt this style" view. And yet that's what I suspect some JavaScript devs---even
good ones---really believe.

Would they be wrong? I wouldn't go that far. I think it's a sensible approach, and one that can
work. And so if a team decides they want to use it---like we did on EMB---I think that's great.

But here's what I also believe. There are different *styles* in software development, and one-size-
fits-all advice doesn't work for all styles. I realize there are some who would disagree with me, or
would at least argue that certain so-called styles are inherently bad; and of course they're right.
Based on the values of their own style.

Think about musicians. Consider a classical musician and a jazz musician. These are very different
approaches to music. But of course we all acknolwedge that one is not "better" than the other. It is
purely a matter of taste.

Classical music is much more about composition than about individual performances. Of course there
are soloists; but still, the pieces are *composed* by authors, who are most concerned with the
overall beauty of the piece. This to me is like software developers who think of the "big picture",
of different subsystems and how they fit together, for whom the nitty gritty code itself isn't all
that interesting.

Of course this doesn't mean that these "big picture" devs could not be highly skilled coders.
Obviously there are many, many classical musicians who are truly virtuosic in their instrumental
abilities. But the overall focus of classical music remains on the composition.

In jazz music, there is a much greater focus on the individual players, the flourishes, the soul of
the performer. Some devs treat their code like art; they love to push the boundaries of their
languages and do crazy things. You can tell when you're reading this sort of code. I realize this
will sound preposterous to some, but I think it's more joyful. Some code you read and you can just
tell, the dev was having *fun* when he or she wrote it.

Of course, just like "big picture" devs can be great coders too, great coders can also be good at
"big picture" stuff. The two aren't mutually exclusive. But I do think there is a tendency for devs
to gravitate in one direction or the other in terms of passion. That is, I find that with a lot of
the "big picture" devs I work with, for example, even if their code is very elegant and skillfully
written it's still the overall system design, the "architecture" if you will, that gets them going.

So where am I going with this? I guess I raised this analogy to make the following observation:
advice that you could imagine being valuable for a classical musician might be useless to a jazz
musician, and vice versa. Likewise I think a lot of the rules you see advocated for in software
development are perhaps valuable for some devs, but not so applicable to others.

To me, *knowing* that you can write JavaScript without `this` is really useful. And I would argue
that any serious JavaScript dev should absolute *understand* how it can be done. But if you were to
tell me that it *should* be done this way, I would push back. I tend to disagree with most advice
that fundamentally says, "Don't use language feature X." To me it's essentially the same as saying,
"Don't ever play these notes together." If you tell me that, it just makes me *want* to play them
together, to see if I can make something interesting out of that sound. I guess I'm more like a jazz
musician that way (which is funny because, musically, I'm really not at all).

I remember working in C# and coming some official-ish guidelines that basically said to never have
`readonly` fields of mutable reference types. The reasoning was: "Some developers misunderstand what
`readonly` does and will think it implies deep immutability, so you're better off avoiding this
scenario." This bugged me like you wouldn't believe.

I've also worked on Ruby projects where (to be continued)
