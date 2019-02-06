---
title: Thoughts on dependencies
date: 2019-02-02
published: false
---

In my time as an engineer I've had lots of conversations about software
dependencies. I've been meaning to put my thoughts in writing for a while
now---specifically about how I feel most teams, and in fact the industry at
large, don't put enough thought into how they manage dependencies---but it's
such a big topic that I've never found the energy to sit down and capture all
of my opinions in writing, as doing so would likely take up an entire book.

With that in mind, I gave myself [60 minutes][1] to just write down everything
I could, and I used that as a first draft[^first-draft]. I've since made some
revisions, but what follows is a bit rough. It's best to think of it as more a
stream of consciousness than a buttoned-up treatise.

## The biggest problem

Probably the biggest oversight that I see being made time and time again is
that developers don't appreciate the huge rule that **trust** plays in their
dependency strategy. We assume that the ecosystems we depend on are full of
good, competent actors who are consistently making their software better. This
is sort of the premise of [semantic versioning][2], commonly known as _semver_,
which is intended as a decision framework by which authors can clearly indicate
how their software is changing between versions and consumers can make informed
decisions about how their dependencies are changing.

We are just starting to see cracks in the foundation of the "good actors"
assumption. Take for example the [event-stream debacle on npm][3], where a
malicious party was able to exploit the widespread trust in the JavaScript
community and get a huge number of applications to install a harmful dependency
without realizing it. This all happened, basically, because the maintainer was
[understandably tired][4].

Which brings me to the "competent actors" assumption. Or maybe I should call it
the assumption of _perfectly competent, tireless_ actors. Even if everyone who
contributes to an ecosystem is _basically_ competent and hard-working, they
make mistakes, and they burn out. (Not to mentioned that we all have limited
time on this earth, and most people don't want to spend every waking moment of
their lives maintaining the dependency tree of a library they're most likely
giving away for free.) I don't think I've ever seen an application of semantic
versioning that didn't ultimately boil down to a human making a call (e.g. _Is
this a major or minor version bump?_ and _Should I keep supporting this older
version?_), and humans tend not to do things perfectly.

## The party analogy

I think of it like this. Suppose you're throwing a party. You invite a bunch of
friends, all of whom you personally trust. Then one of your friends asks if he
can invite some of _his_ friends. That seems fairly harmless, so you say okay.
Then his friends invite _their_ friends, and those people invite _their_
friends; and at some point you start to feel uncomfortable because you realize
there are people at this party whom you don't know or trust at all. They're
friends of friends of friends. And much like when you make a copy of a copy (at
least back in the days of analog!), fidelity is lost at each link in the chain.

To state this more quantitatively: our trust level naturally diminishes with
each degree of separation. Let's call the rate at which it declines the "trust
drop-off rate", and imagine the rate for an average person is, say, 0.1 (or
10%). That means if you trust your close friends 100%, maybe you trust _their_
friends 90%, and _their_ friends 81%, etc. Eventually, if your policy is
"Anyone can invite anyone", then you're likely to end up having people at the
party you don't trust very much.

With libraries, what often happens is that software teams will apply some fuzzy
trust criteria to their direct dependencies---for example, when looking for a
library that does X, you'll check to see how many stars on GitHub each option
has, or how many downloads on npm or RubyGems, or how many associated questions
on StackOverflow---but we won't apply those same criteria to indirect
dependencies. We _act_ as though the trust drop-off rate is 0%.

## In defense of `--no-deps`

In one of the many repositories we maintain, the Bitbucket team uses
`--no-deps` to install Python dependencies. This is an option that prevents pip
(the de facto package manager for the Python ecosystem) from installing a
library's stated dependencies when installing the library. Other package
managers have similar options (though npm, notably, [does not][5]).

This is often met with skepticism from new devs on the team. Installing
dependencies with `--no-deps` is seen by many as a pretty radical thing to do.
Personally I think that's because relying on package managers for dependency
resolution is a golden calf in the software world, but I digress. My position
is that using `--no-deps` is, especially for a production application with real
users, the _most_ sensible policy. It's certainly the most conservative, at
least.

Using `--no-deps` is like saying, "The only people allowed at this party are
people I personally invite." Guests are not allowed to invite their friends
without your involvement; they can tell you which friends they'd _like_ to
invite, and you'll add them to the guest list if you choose to.

I believe that most objections to using `--no-deps` and its ilk, i.e. to take
matters into one's own hands when it comes to managing dependencies, fall into
one of two buckets:

1. **Correctness**: Our software is going to be broken if we do this, because
   we're going to install incompatible dependencies, which will cause errors or
   bugs.
2. **Maintenance**: We're taking on too great a burden by hand-managing all of
   our dependencies like this; we should just use a lock file and let our
   package manager do the work for us.

### The problem with the correctness argument

The argument that `--no-deps` leads to incompatible dependencies leans heavily
on the assumption I mentioned earlier of perfectly competent actors.

The default system for resolving dependencies entails library authors specify
what works and what doesn't. This is equivalent to vouching for one another.
Time for another analogy!

Imagine you're hiring a contractor to do a job, and we had this system: every
contractor has a "compatibility card", and on each card there's a list of the
other contractors they need to accomplish their part of the job, or else they
can't do it. Your package manager is like an assistant who checks every
contractor's card and ensures that all the right people are all hired for the
job.

Note that the list of names on every person's card is hand-written; i.e., they
get to write whatever they want on there. In theory, these lists define who is
_necessary_ to do the job; in reality, you might not need all those people. One
person's list might tell you, "I can't do this work without Tony"; but then you
bring them in without hiring Tony, and what do you know? They still get the job
done.

Similarly, a library might say, "I can't work without version 3 of this other
library"; but maybe that's only true for a small set of functionality you
aren't using. Or maybe it isn't true _at all_; maybe the library works just
fine with version 2, but the author removed test coverage for version 2 from
their test suite to ease their maintenance load, or to silence some deprecation
warnings from their build. Or maybe it _used_ to use that other library, and it
doesn't anymore, and the author just never removed the stated dependency.

When you _always_ install _all_ stated dependencies of _all_ your direct
dependencies, you are saying, "I trust that everyone I hired for this job has
an accurate list on their card; and all of _those_ people have accurate lists
on _their_ ID cards; and..."

I feel like the best way to tell if your software has bugs is to test your
software. If you've installed incompatible versions of dependencies, and this
causes bugs or raises errors, that's something you should catch in your
testing.

### The problem with the maintenance argument

I can almost hear you, reader, asking, "So what are we supposed to do? Manually
*hand-edit* our requirements file whenever we want to upgrade a dependency, to
make sure we have all the right versions of any upstream requirements?"

I know that sounds absurd, by why? I'll tell you why: because we've become
desensitized to _massive_ changes to our dependency trees, as just a normal
thing that happens. It's so normal that we don't even look at the contents
of lock files anymore (if any of us ever did in the first place). In fact, we
actively exclude lock files from diffs when reviewing code because we don't
think it's reasonable to expect a human to review them.

Here's the problem lock files (like package-lock.json, Gemfile.lock, or
Pipfile.lock) are meant to solve. Say you just have a file that specifies all
of your direct dependencies, and you rely on a package manager to identify your
indirect dependencies; i.e. you _aren't_ using `--no-deps`. If your deployments
involve a step to install these dependencies, e.g. `npm install` or `pip
install -r requirements.txt`, you may end up unwittingly installing new
versions of upstream dependencies from one deployment to the next. A lock file
ensures you're always installing exactly the same version of every direct and
indirect (upstream) dependency.

In other words a lock file provides deterministic builds. It is _not_ a
conservative approach to managing dependencies in the same way that `--no-deps`
is. The problem with trust remains. In fact, when a team uses package-lock.json
and never reviews changes to that file because they're often far too numerous
to review... _those are exactly the conditions that allowed the event-stream
disaster to happen_.

In other words, using a lock file together with a package manager does not
simply automate a mundane task and reduce maintenance cost. It _trades_
maintenance cost for safety. What's more, by automating that task and thereby
largely removing human decision-making from the process, it desensitizes teams
to the sizes of their dependency trees. This is similar to the economic
phenomenon where, if you subsidize an industry with no corresponding mechanism
to control costs, costs will simply rise to consume available
subsidies[^i-am-no-economist].

As a side note, this is why in Bitbucket we have _not_ defaulted to excluding
this file, or other lock files like yarn.lock and Gemfile.lock, from pull
request diffs. If teams want that behavior, they [must explicitly enable
it][6].

## Closing thoughts

I honestly can't think of an elegant way to wrap this up, so I'll just say: I
know that I'm in the minority on this one. And I don't dispute the value that
automated dependency management solutions have provided to the software world.
If this post seems a little one-sided, it's because sometimes I feel like I'm
the only person who has these concerns (though surely that isn't true); so I've
leaned in pretty hard on the risks and downsides of using these tools while
perhaps downplaying the benefits. (If you want to read about why package
managers are a _good_ thing, there is no shortage of literature out there for
you to find.)

There are benefits to package managers, no question. I'm not saying that
software teams are foolish or irresponsible for using them. I'm not even saying
you should use `--no-deps` (or equivalent) all the time (the Bitbucket team
doesn't); in many cases, I understand that would be impractical. That said, I
believe too many devs haven't really put much thought into this; and so if
anything I suppose my goal in writing this was to get you to do just that: put
some thought into it, and at least know your reasons for managing your
dependencies the way you are (hopefully they're better than "that's just how
it's done").

[1]: /posts/published-in-60-minutes.html
[2]: https://semver.org/
[3]: https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident
[4]: https://gist.github.com/dominictarr/9fd9c1024c94592bc7268d36b8d83b3a
[5]: https://github.com/npm/npm/issues/340
[6]: https://bitbucket.org/blog/exclude-files-from-the-new-pull-request-experience

[^first-draft]: To be honest, I wasn't too thrilled with what I had at the end of 60 minutes, so this post ended up probably taking closer to 2 hours.
[^i-am-no-economist]: Or maybe it's not like that. I'm no economist!
