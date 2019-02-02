---
title: Thoughts on dependencies
date: 2019-02-02
published: false
---

In my time on the Bitbucket team I've had lots of conversations about
software dependencies. I've been meaning to put my thoughts in writing for a
long time---specifically around how I feel most teams, and in fact the
industry at large, do dependencies wrong---but it's such a big topic that I've
never found the energy to sit down and capture all of my opinions in writing,
as doing so would likely take up an entire book. What I'm going to do now,
instead, is take [60 minutes][1] to just write down everything I can think of;
and if I feel I still have more to say at the end... well, I guess it'll be
time to get started on that book.

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
malicious actor was able to exploit the widespread trust in the npm community
and get a huge number of applications to install a harmful dependency without
realizing it. I'll come back to that.

The assumption of competent actors is just as serious. Or maybe I should say
_perfectly competent_ actors. Even if everyone who contributes to an ecosystem
is _basically_ competent, they make mistakes. I don't think I've ever seen an
application of semantic versioning that weren't ultimately decided by a human,
and humans screw things up. Fortunately there is at least conventional wisdom
at this point that applications---i.e. software that runs in a real
environment, as opposed to libraries which are more abstract and meant to be
reused in multiple applications---should pin their dependencies. Of course we
tend not to think about the fact that, since libraries _shouldn't_, new
versions of libraries often come with new dependencies, which often aren't
really vetted except to the extent that some unit tests still pass.

I think of it like this. Suppose you're throwing a party. You invite a bunch
of friends, all of whom you personally trust. That's not unreasonable. One of
your friends asks if he can invite some of _his_ friends, whom you don't know.
That seems pretty reasonable too. But then his friends invite _their_ friends,
and those people invite _their_ friends... and at some point you start to feel
uncomfortable because you realize there are people at this party whom you don't
kmow or trust at all. They're friends of friends of friends of... and, much
like when you made a copy of a copy (back in the days of analog), fidelity is
lost at each link in the chain.

To put this in numerical terms: if you trust your close friends 99%, maybe you
trust _their_ friends 97%, and _their_ friends 93%, etc. Eventually, if your
policy is "Anyone can invite anyone", then you're all but guaranteed to have
people at the party where your trust level is 50%, 25%, 0%.

## In defense of --no-deps

Without giving too much away, I'll say that I've worked on teams that use
`--no-deps` to install Python dependencies. This is an option that prevents
pip (the de facto package manager for the Python ecosystem) from installing
a library's stated dependencies when installing the library.

This is inevitably met with anywhere from skepticism to downright disdain from
new devs on the team. For some reason, installing dependencies with `--no-deps`
is seen by many as a pretty radical thing to do. I suspect that's because
package managers are a golden calf in the software world. My opinion is that
using `--no-deps` is, especially for a production application with real users,
the _most_ sensible policy.

Using `--no-deps` is like saying, "The only people allowed to this party are
people whom I personally invite." Guests are not allowed to invite their
friends without your involvement; they can tell you which friends they'd _like_
to invite, and you'll add them to the guest list if you choose to. This is the
most conservative possible option.

I believe the two biggest objections to using `--no-deps` tend to fall under
two categories:

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
is hand-written; i.e., every person gets to write _whatever they want_ on
there.

In theory, these lists provide a picture of who needs to go to the party
together; but in reality, they are just lists.

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

There is some overlap between the problems solved by `--no-deps` and lock
files. In theory, they both prevent accidentally changing dependencies. But
lock files have the ostensible advantage of automating much of the manual work
that would go into maintaining an explicit guest list on your own. For example,
if you need to upgrade a dependency, e.g. to address a security vulnerability
or use some new functionality, and the new dependency requires a newer version
of an upstream library, the `--no-deps` approach requires you to update both
dependencies in your requirements file. A lock file would handle this for you.

The problem with the ID cards doesn't go away, though. A lock file is
equivalent to telling the bouncer outside your party, "This is the list of
people I've invited. I trust them, and I trust whoever else is listed on their
ID cards _right now_. _You_ go ahead and make a list of all of those names, and
don't let anybody in who isn't on that list."

Then one day, you need to change the list. So you go to the bouncer and you
say, "All right, I need to make a change to the original list. Take my list,
go through all the ID cards, and make a new master list." The bouncer does as
you asked, and then comes to you with the new master list, which has a ton of
new names on it. "Yeah yeah, whatever," you say; "I don't have time to read
all that. I'm sure it's right."

This is pretty much what devs are saying when they say, "Who wants to review
package-lock.json?" (As a side note, this is why in Bitbucket we have _not_
defaulted to excluding this file, or other lock files like yarn.lock and
Gemfile.lock, from pull request diffs. If teams want that behavior, they must
explicitly enable it.)

## Closing thoughts

All right, so I've _just_ gone past the 60-minute limit I set for myself
(literally, my timer went off).

I honestly can't think of an elegant way to wrap this up, so I'll just say: I
know that I'm in the minority on this one. And I don't dispute the tremendous
value that package managers have provided to the software world. If this post
seems a little one-sided, that's just because sometimes I feel like I'm the
only person who has these concerns; and I've leaned in pretty hard on the risks
and downsides of using these tools, while perhaps downplaying the benefits.

I know there are benefits. And I don't think that dev teams are foolish or
irresponsible for going against me on this one. That said, I believe a lot of
devs haven't really put much thought into this; and so if anything I suppose
my goal in writing this was to get you to do just that: put some thought into
it, and at least know your reasons for managing your dependencies the way you
are (hopefully they're better than "that's just how it's done").

[1]: /posts/published-in-60-minutes.html
[2]: https://semver.org/
[3]: https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident
