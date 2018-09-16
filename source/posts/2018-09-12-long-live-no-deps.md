---
title: Long live --no-deps
date: 2018-09-12
published: true
---

*Note: this post was [published in 60 minutes][1], probably[^probably].*

The somewhat inflammatory[^inflammatory] title of this post is admittedly
shameless clickbait. Or is it?

I've been the voice of dissent on my team for a while when it comes to
dependency management. On Bitbucket we have a homegrown system for managing our
dependencies, largely consisting of a rather verbose requirements.txt file and
a custom script to detect changes in the dependencies listed in that file. The
file is meant to be installed with:

```
pip install --no-deps -r requirements.txt
```

Most devs, when they first join the team, see this and think, "Really? How are
you OK with this?" It smells wrong. But just as beer tastes terrible when you
have your first sip, the `--no-deps` lifestyle can really grow on you after a
while. Or maybe it's just me.

I'm half kidding, but hear me out. This isn't actually a love letter to
`--no-deps` so much as my attempt to articulate how all of the tooling

[1]: /posts/published-in-60-minutes.html

[^probably]: I started before taking my daughter to the bus stop this morning and

[^inflammatory]: Well, if you're a Python dev, I guess.
