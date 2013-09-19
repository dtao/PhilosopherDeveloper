---
title: Paradoxes in the software world
date: 2013-04-15
published: false
---

There are a lot of things I find counterintuitive in the world of software[^first-sentence]. For no particular reason, I decided I'd make a short list of them.

Large, distributed teams use centralized version control and vice versa
-----------------------------------------------------------------------

*Version control* (or VC) is an umbrella term for a whole category of software tools that provide a history of a code base and allow teams to collaborate and keep their work synchronized more easily. Non-developers are used to some form of this with things like "Track Changes" in Microsoft Word, the revision history in Google Docs, or more recent products like Dropbox and Box.net. The tools developers use are significantly more sophisticated and even have entire services (e.g., [GitHub](https://github.com/), [BitBucket](https://bitbucket.org/)) built around them.

The original VC systems followed a client/server model, where a central server would host the entire history of a team's code base (repository) and individual team members download changes to their local clients, which are essentially up-to-date snapshots. [Subversion](http://subversion.apache.org/) is probably the most popular existing VC system within this lineage. A newer breed of systems is known as distributed version control, which---as the name implies---is based on a decentralized model where every contributor to a project maintains a full copy of the entire repository. The most popular distributed system is Git, though Mercurial and Bazaar are also popular options.

<iframe src="http://charter.herokuapp.com/embed/KBOKGNE6" style="height: 450px; width: 600px;" />

[^first-sentence]: After writing that sentence I felt very strongly that I was writing the introduction to a 5th grade essay.
