---
title: The never-ending rolling deployment
date: 2018-12-12
published: false
---

When we use the word "software" we're really talking about two things. First
there's the _code_, which is essentially a set of instructions, or routines.
But just as an instruction manual doesn't magically accomplish a task, code by
itself doesn't do anything. It needs to run in an _environment_. This term
encompasses all of the required pieces, both hardware and other software (e.g.
an operating system), for the code to be runnable.

A _deployment_ is when you take software that's running in an environment and
you update its code. In other words, you revise the instructions.

![Red is the old code. Blue is the new code.](/images/deployment.png)

Deployments can be tricky for a variety of reasons, and so like most tricky
things there are multiple strategies for doing them. One of those strategies is
called a _rolling_ deployment, where you update slices of the environment (for
example, groups of servers) in sequence, so that until the deployment is over
you have both old and new code running at the same time.

![A rolling deployment. For a time, both old and new code are running.](/images/rolling-deployment.png)

Rolling deployments tend to be good for reliability, but they come with risks.
Sometimes the new code is incompatible with the old code. For example, a field
is removed from an API, but some of the old code was referencing that field. In
a rolling deployment, this causes errors as the two incompatible versions of
the code coexist for a time: one server expects the field to exist, but the
server it interacts with fails to provide it.

![Green arrows represent healthy interactions. The red arrow indicates an error.](/images/rolling-deployment-incompatible.png)

The "right" way to do a rolling deployment, therefore, is to do so in stages.
To introduce backwards-incompatible changes (like removing a field from an
API), you must first deploy a version of the code that doesn't use the field
anymore. While this deployment is underway, servers running the new code are
compatible with both the old and the new. In the _next_ stage, after every
server has this backwards- and forwards-compatible code, you can safely remove
the field.

![Purple code is compatible with red and blue. The two stages prevent errors.](/images/rolling-deployment-compatible.png)

Culture is a bit like software. The traditions, values, and rules that we
collectively share are akin to the _code_, and our society---i.e., every one of
us---is the _environment_ in which it runs.

No two people have exactly the same version of the code since we don't all
share exactly the same values or traditions. But the values we generally all
do accept shift over time. For example, with only the most extreme exceptions,
almost everyone living in the United States today believes that slavery was
morally wrong; but 150 years ago the nation was much more divided on the
subject.

In this sense culture is experiencing an ongoing rolling deployment, to one of
the most complex environments imaginable. We're all running different versions
of the code, and new versions of it are constantly being deployed, through art,
pop culture, the news media, schools, politicians, books, and a million other
things. The new code that says slavery is wrong is fully deployed at this
point; but it took a while. Meanwhile, some new code is in the process of being
deployed right now, and the deployment may continue through our lifetimes.

Sometimes our code is incompatible. Maybe you have a relative who uses language
that most of society doesn't use anymore, or who doesn't "get" a particular
social movement. At the same time, maybe you and I have some of our own
outdated code running, and in a year (or two, or ten) we'll look back and
realize we were wrong. In any case, when the old and new code coexist, it
causes errors: misunderstanding, disagreement, conflict, and sometimes
violence.

![Red and blue don't get along. When they interact, there's conflict.](/images/rolling-cultural-deployment-incompatible.png)

As with software, the way to prevent these errors is to make changes in stages.
First you need to deploy a version of the new code that's still compatible with
the old. In culture we call this "tolerance". This means that rather than
refusing to talk to your relative, or disconnecting from them on social media,
you continue to engage with them. You understand that they are still running
old code. The deployment has not yet reached them.

![Purple gets along with both red and blue. This allows for a peaceful ideological shift.](/images/rolling-cultural-deployment.png)

Earlier I used the word "right" to describe the method for doing rolling
deployments. In software, this is the way to do it if you want to avoid errors.
However, there's a downside: it takes longer. Sometimes the old code is so
harmful that the value of getting the new code deployed as fast as possible
outweighs the cost of the errors.

For example, I already mentioned slavery in the United States. Abolition
actually began in a rolling fashion, starting in the north where slavery was
outlawed first. But the new code for "Slavery is morally wrong" and the old
code for "Slavery is integral to the economy" were fundamentally incompatible,
and soon enough this culminated in the American Civil War.

I'm not the one to say when a cultural change is sufficiently urgent that the
stages should be skipped. I just know that if you want to deploy incompatible
code without causing errors, you need to do so in stages. Likewise, those on
the forefront of cultural change will need to adopt backwards-compatible code,
and interact gracefully with those behind them, if we want to keep the peace.
