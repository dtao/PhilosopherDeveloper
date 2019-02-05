---
title: Thoughts on dependencies
date: 2019-02-02
published: false
---

In my time on the Bitbucket team I've had lots of conversations about software
dependencies. I've been meaning to put my thoughts in writing for a while
now---specifically about how I feel most teams, and in fact the industry at
large, don't put enough thought into how they manage dependencies---but it's
such a big topic that I've never found the energy to sit down and capture all
of my opinions in writing, as doing so would likely take up an entire book.
What I'm going to do now, instead, is take [60 minutes][1] to just write down
everything I can think of.

## The biggest problem

Probably the biggest oversight that I see being made time and time again is
that developers are far more trusting than they realize. We assume that the
ecosystems we depend on are full of good, competent actors who are
consistently making their software better. This is sort of the premise of
[semantic versioning][2], commonly known as _semver_, which is intended as a
decision framework by which authors can clearly indicate how their software is
changing between versions and consumers can make informed decisions about how
their dependencies are changing.

We are just starting to see cracks in the foundational assumption of good
actors. Take for example the [event-stream debacle on npm][3], where a
malicious actor was able to exploit the widespread trust in the JavaScript
community and get a huge number of applications to install a harmful dependency
without realizing it. This all happened, basically, because the maintainer was
[understandably tired][4].

The assumption of competent actors is just as serious. Or maybe I should say
_perfectly competent_ actors. Even if everyone who contributes to an ecosystem
is _basically_ competent, they make mistakes. I don't think I've ever seen an
application of semantic versioning that didn't ultimately boil down to a human
making a call (e.g. _Is this a major or minor version bump?_), and humans screw
things up.

## The party analogy

I think of it like this. Suppose you're throwing a party. You invite a bunch
of friends, all of whom you personally trust. That's not unreasonable. One of
your friends asks if he can invite some of _his_ friends, whom you don't know.
That seems fairly harmless, so you say okay. Then his friends invite _their_
friends, and those people invite _their_ friends... and at some point you start
to feel uncomfortable because you realize there are people at this party whom
you don't know or trust at all. They're friends of friends of friends. And much
like when you make a copy of a copy (at least back in the days of analog!),
fidelity is lost at each link in the chain.

To put this in numerical terms: if you trust your close friends 99%, maybe you
trust _their_ friends 97%, and _their_ friends 93%, etc. Eventually, if your
policy is "Anyone can invite anyone", then you're all but guaranteed to have
people at the party where your trust level is quite low.

## In defense of `--no-deps`

In one of the many repositories we maintain, the Bitbucket team uses
`--no-deps` to install Python dependencies. This is an option that prevents pip
(the de facto package manager for the Python ecosystem) from installing a
library's stated dependencies when installing the library. Other package
managers have similar options (though npm, notably, [does not][5]).

This is often met with skepticism from new devs on the team. Installing
dependencies with `--no-deps` is seen by many as a pretty radical thing to do.
Personally I think that's because relying on package managers for dependency
resolution is a golden calf in the software world. My opinion is that using
`--no-deps` is, especially for a production application with real users, the
_most_ sensible policy. It's certainly the most conservative.

Using `--no-deps` is like saying, "The only people allowed to this party are
people whom I personally invite." Guests are not allowed to invite their
friends without your involvement; they can tell you which friends they'd _like_
to invite, and you'll add them to the guest list if you choose to.

I believe the two biggest objections to using `--no-deps` fall under two
categories:

1. **Correctness**: Our software is going to be broken if we do this, because
   we're going to install incompatible dependencies, which will cause errors or
   bugs.
2. **Maintenance**: We're taking on too great a burden by hand-managing all of
   our dependencies like this; we should just use a lock file and let our
   package manager do the work for us.

### The problem with the correctness argument

The argument that `--no-deps` leads to incompatible dependencies leans on a
huge amount of trust in an arbitrarily large group of strangers. Back to my
party analogy.

When you use `--no-deps`, you are opting _out_ of a system for resolving
dependencies where library authors specify what works and what doesn't. This is
analogous to party guests vouching for one another.

Imagine you had this system: everyone coming to the party needs to present an
ID card, and on every person's ID card there's a list of the other people
they'd like to bring with them. Your package manager is like a bouncer outside
the party who checks everybody's ID card and ensures that the right people are
all at the party based on their cards.

Now, if these cards were issued by some sort of agency that you trust, that
might be one thing. But in reality, the list of names on every person's ID card
is hand-written; i.e., every person gets to write whatever they want on there.
In theory, these lists define who needs to go to the party together; in
reality, they might not.

A library might say, "I can't work without version X of this other library";
but maybe that's only true for a small set of functionality you aren't using.
Or maybe it isn't true _at all_; maybe the library works just fine with version
Y, or it doesn't even need the other library. Maybe it _used_ to use that other
library, and it doesn't anymore, and the author just never removed the stated
dependency.

When you _always_ install _all_ stated dependencies of all your direct
dependencies, you are saying, "I trust that everyone I invited to my party has
an accurate list on their ID card; and all of _those_ people have accurate
lists on _their_ ID cards; and..."

I feel like the best way to tell if your software has bugs is to run automated
tests on your software. If you've installed incompatible versions of
dependencies, such that it causes bugs or raises errors, that's something you
should catch in your tests.

### The problem with the maintenance argument

I can almost hear you, reader, asking, "So what are we supposed to do? Manually
*hand-edit* our requirements file whenever we want to upgrade a dependency, to
make sure we have all the right versions of any upstream requirements?"

Why does that sound so absurd? I'll tell you why: because we've become
desensitized to _massive_ changes to our dependency trees, as just a normal
thing that happens. It's so normal that we don't even look at the contents
of lock files anymore (if any of us ever did in the first place). In fact, we
actively exclude lock files from diffs when reviewing code because we don't
think it's reasonable to expect a human to review them.

Here's the problem lock files (like package-lock.json, Gemfile.lock, or
Pipfile.lock) are meant to solve. Say you just have a file that specifies all
of your direct dependencies; i.e. you _aren't_ using `--no-deps`. If your
deployments involve a step to install these dependencies, e.g. `npm install` or
`pip install -r requirements.txt`, you may end up unwittingly installing new
versions of upstream dependencies from one deployment to the other. A lock file
ensures you're always installing exactly the same version of every direct and
indirect (upstream) dependency.

In other words a lock file provides deterministic builds. It is _not_ a
conservative approach to managing dependencies in the same way that `--no-deps`
is. The problem with trust remains. In fact, when a team uses package-lock.json
and never reviews changes to that file because they're often far too numerous
to review... _those are exactly the conditions that allowed the event-stream
disaster to happen_.

As a side note, this is why in Bitbucket we have _not_ defaulted to excluding
this file, or other lock files like yarn.lock and Gemfile.lock, from pull
request diffs. If teams want that behavior, they must explicitly enable it.

## Closing thoughts

I honestly can't think of an elegant way to wrap this up, so I'll just say: I
know that I'm in the minority on this one. And I don't dispute the tremendous
value that automated dependency management solutions have provided to the
software world. If this post seems a little one-sided, it's because sometimes I
feel like I'm the only person who has these concerns (though surely that isn't
true); so I've leaned in pretty hard on the risks and downsides of using these
tools, while perhaps downplaying the benefits. (If you want to read about why
package managers are a _good_ thing, there is no shortage of literature out
there for you.)

There are benefits to package managers, no question. And I'm not saying that
software teams are foolish or irresponsible for using them. That said, I
believe a lot of devs haven't really put much thought into this; and so if
anything I suppose my goal in writing this was to get you to do just that: put
some thought into it, and at least know your reasons for managing your
dependencies the way you are (hopefully they're better than "that's just how
it's done").

[1]: /posts/published-in-60-minutes.html
[2]: https://semver.org/
[3]: https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident
[4]: https://gist.github.com/dominictarr/9fd9c1024c94592bc7268d36b8d83b3a
[5]: https://github.com/npm/npm/issues/340
