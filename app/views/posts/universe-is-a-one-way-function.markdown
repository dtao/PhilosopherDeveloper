Recently my friend Chuck reminded me of a conversation he and I had ages ago about a company called [Steorn](http://steorn.com/). This is a company that publicly claimed, back in 2007, to have developed an [overunity](http://en.wikipedia.org/wiki/Overunity) technology. Chuck chastised me for having persuaded him to take the company seriously; to this day, despite their refusal to back down, they have still not convincingly broken [the second law of thermodynamics](http://en.wikipedia.org/wiki/Second_law_of_thermodynamics).

<iframe width="480" height="360" src="http://www.youtube.com/embed/Xy0UBpagsu8" frameborder="0" allowfullscreen></iframe>

Most of my acquaintances with a modest amount of scientific knowledge, of course, dismissed Steorn from the very beginning. What they claim to do violates a known law of physics; therefore it is impossible; therefore they are lying (or confused). I never did--and probably never will--fully sympathize with this attitude. While I definitely *agree* that Steorn probably do not have what they thought they had (and I certainly have no intention of arguing with the laws of thermodynamics!), I *disagree* with the premise that we can be so sure of these things that we are justified in immediately rejecting opposing claims.

This is actually the same topic I covered in [my very first blog post](http://philosopherdeveloper.wordpress.com/2009/12/19/the-myth-of-the-myth-of-perpetual-motion/). But this time I want to write about it from a different angle, drawing a parallel between scientific inquiry and the mathematical concept of *one-way functions*, and touching on a fundamental aspect of human nature while I'm at it. To begin, I'll start with a deceptively simple problem.

Recognizing Patterns
--------------------

Back in the old K–12 days, I remember sometimes taking tests with *pattern recognition* questions. As a kid, I was always frustrated by these questions because I found them to be ambiguous. As an example, consider this simple sequence:

    1, 2, 4, ...

**What is the next element in the above sequence?** You are probably tempted to say *8*. Is that the only logical answer?

I would argue that no, it isn't. If you say *8*, you're most likely thinking that the "pattern" illustrated above involves every value in the sequence doubling the previous value:

    1, 2, 4, 8, 16, 32, ...

But there are other possible patterns. For example, we could start with 1, and then add linearly increasing values (+1, +2, +3, etc.):

    1, 2, 4, 7, 11, 16, ...

Or we could alternate between adding 1 and 2:

    1, 2, 4, 5, 7, 8, 10, ...

Heck, we could even just repeat the same three values over and over:

    1, 2, 4, 1, 2, 4, ...

The above suggestions may seem increasibly far-fetched. But they are all definitely patterns, and **they all start the same way**, which *means*—at least it did in my childhood brain—that there is no *right* answer to a question like this. There is, in fact, an infinite number of possible patterns I could imagine that would begin with *1, 2, 4*, and then proceed in an endless variety of ways.

Zendo, and the art of deduction
-------------------------------

If people's reaction to Steorn was an example of premature dismissal, let me give an example of what I'd consider the corollary: premature deduction.

There is a game that a friend and I like to play called *Zendo*.

![Zendo](/images/zendo.jpeg)

Zendo is a game of systematic deduction. One player--the Master--devises a rule involving the game pieces, which he then illustrates via two examples: one embodying the rule, and one not. These examples are designated True and False. The players then take turns assembling their own game pieces in different formations, asking the master whether or not these formations embody the master's rule. Eventually, one or more of the players will deduce the rule by observing patterns across the examples.

Now, there are parameters within Zendo itself restricting how rules may be formed, narrowing the space of possible patterns to look for. Even so, it is inescapable that when you play, there must be some understood "gentleman's rule" that restricts the complexity of any rule so that it is realistic for someone to eventually figure it out. Otherwise, rules could exist of arbitrarily enormous complexity, making it unlikely the game would ever finish.

To make this a bit more concrete, here's an example of a reasonable rule in Zendo:

    A formation is "true" if it has a blue piece on top of a red piece.

And here is an unreasonable rule:

    A formation is "true" if the number of blue pieces is equal to the first prime number greater than the number of red pieces minus the number of yellow pieces, not including yellow pieces that are either grounded or atop red pieces.

From these two examples hopefully my point is clear. Which is why I was recently baffled when, during a recent game, after the master had given his initial two examples--each comprising four pieces of all different colors--my friend announced, "I have it already."

To be fair, my friend believed that he knew the master *personally* so well that he had a strong intuition as to what sort of rules he would think of. Still, this declaration of having the answer so early in the game seemed absurd to me. And I think you can understand why, from my earlier thoughts on pattern recognition. There was no way my friend already *knew* the rule at this stage, given that there were many (in fact, *infinitely* many--but we'll get to that) possible rules that would be consistent with the examples given.

Put another way: my friend had not narrowed down the possibilities enough to justify his feeling of certainty (at least to my satisfaction). He was guilty of **premature deduction**.

<img alt="Premature deduction" src="/images/premature_deduction.jpg" style="border: 1px solid black; height: 384px; width: 512px;" />

But then, when you really think about it, there's no way you could **ever** *know* a rule in Zendo, if arbitrary complexity were allowed. Because there would *always* be infinitely many possible rules that would be consistent with all examples. To convince you of this, let me briefly revisit the topic pattern recognition.

Consider this sequence:

    1, 1, 1, ...

Is it going to repeat forever? It certainly might. Or it might be the start of the pattern:

    1, 1, 1, 2, 1, 1, 1, 2, ...

Or:

    1, 1, 1, 3, 1, 1, 1, 3, ...

And so on. You see what I'm saying. I can imagine an endless number of arbitrary variations on an endless variety of patterns that would all satisfy the initial evidence: *1, 1, 1*.

Fortunately in Zendo, there aren't really an infinite number of possibilities in *practice*, precisely because of the constraint I mentioned earlier. Assuming everyone playing has some expectation of the game actually being *fun*, there is a realistic cap on the complexity of a rule and thus on the number of possibilities.

But let's suppose the limit were much more flexible. Let's say we could devise rules of arbitrary *complexity*, but we were restricted to using only up to 10 pieces. That would definitely make the game hard to play! How hard? Well, by my calculations\* there would be 1.3&times;10<sup>22</sup> possible combinations of pieces in this case. That's over **ten thousand billion *billion* combinations**. (If you're interested in the math, see my footnote.)

I think it's fair to say this would make the game impossible by human standards. What about for a computer? Since we said that a rule could be arbitrarily complex, unless I'm mistaken, there would not be any deterministic way for a computer to figure out a rule other than by trying all combinations and mapping them to true or false. So let's suppose a computer could try a million combinations per second. Then it would take:

- 1.3&times;10<sup>16</sup> seconds
- &div; 60 = 216,666,666,666,667 minutes
- &div; 60 =~ 3,611,111,111,111 hours
- &div; 24 =~ 150,462,962,963 days
- &div; 365 =~ **412,227,296 years**

...to try every combination.

That's 412 *million years* for a *computer* (well, a modern computer). Not very practical, is it? And suddenly we've come to one of the fundamental concepts underlying modern cryptography.

One-way functions
-----------------

In mathematics, a (one-way function)[http://en.wikipedia.org/wiki/One-way_function] is one for which computing the *output* for a given *input* is easy; but performing the reverse is much harder.

Here's an example: **factorization**. Take the number 946,905,102,747. Can you tell me whether this is a (prime number)[http://en.wikipedia.org/wiki/Prime_number]? If not, what are its factors (i.e., what numbers divide it evenly)?

This is a very difficult problem to solve efficiently (for a human). The only obvious way to figure it out is to start with 3 (since this is an odd number) and start trying every possible factor. Finding an answer in this way would obviously take a **very long time**.

However, it is very *easy* to *verify* when I tell you that these are the factors:

    27, 101, 419, 857, 967

Even without a calculator, it would not take too long to multiply these numbers together and confirm that they are indeed all factors of 946,905,102,747.

This property of one-way functions--that they can be easy to verify yet difficult to reverse--makes them highly useful in certain software contexts. One example is the way passwords are stored for most systems.

If you store a password in my system, and I then save that password in my database, then a hacker who breaks into my system can easily read your password.

![Plaintext password](/images/plaintext_password.png)

But suppose instead of storing your *password*, I store the result of some cryptographic (one-way) function after providing your password as input.

![Encrypted password](/images/encrypted_password.png)

Now, even if a hacker breaks into my system and sees your *encrypted* password, it will be very difficult for him or her to figure out what your password actually is, much in the same way it would be difficult for you to factor the number 946,905,102,747. However, it's very easy for my system to authenticate *you* when you enter your *real* password, just as it is easy for you to verify the factors of that number once I tell them to you.

Black boxes: Irreversible one-way functions
-------------------------------------------

It might seem that I've veered off topic a bit. How are Zendo and one-way functions related?

Well, we can think of a *rule* in Zendo as its own kind of one-way function. The input to this function is a formation of game pieces, and the ouput is either true or false.

![Zendo as a one-way function](/images/zendo_function.png)

Clearly, this function is one-way. Given either *true* or *false*--even if you already *knew* the rule--how could you possibly deduce which formation led to that result?

But that isn't quite the challenge of Zendo. In Zendo, the players don't even know what the function *is*. This is why in the diagram above I've depicted the rule as a [**black box**](http://en.wikipedia.org/wiki/Black_box). Black boxes are a de facto special case of one-way functions: by convention, they only compute results in one direction; and since their internals are unknown, reversing this process--i.e., working out what the *input* must have been for a given *output*--is, in the best case scenario, really a challenge of deducing the inner workings of the box.

In the worst case, black boxes are *impossible* to reverse. Zendo is one example, as I've already mentioned. Another amusing example is the game of Jeopardy.

<img alt="Jeopardy!" src="/images/jeopardy.jpeg" style="height: 270px; width: 360px;" />

In Jeopardy, "questions" are really "answers", and contestants must provide their "answers" in the form of a question. An example might be:

> A: He was defeated at the Battle of Waterloo.
>
> Q: Who is Napoleon?

Now, maybe this sounds ridiculous (it is); but I've actually always been slightly bothered by the format of Jeopardy, for the same reason I was never a big fan of pattern recognition questions. *Who is Napoleon?* may be a perfectly valid "answer" to the above "question"; but is it the *only* such answer? That is, is it the only "question" to which the above answer would be a correct response?

In case you're not seeing where I'm going with this, how about this question:

> Q: Who was the leader of the French army when the Battle of Waterloo was fought?

Aside from being tautologous, this question fits the answer just as well as the "correct" one.

***

<sub>\*Every piece can be one of four colors, and either upright, flat, or "strange"; and if it's either flat or strange, it can be facing in one of four directions. So:</sub>

<sub>4 colors &times; 9 orientations (upright, flat[NSEW], strange[NSEW]) = 36 possibilities.</sub>

<sub>After the first piece, every piece can either stand on its own (grounded) or sit atop any of the *other* pieces that have been played thus far (ungrounded). This means there are 36 &times; 2 = 72 possibilities for the second piece, 36 &times; 3 = 108 possibilities for the third piece, etc.:</sub>

<sub>36 &times; (36 * 2) &times; (36 * 3) &times; ...</sub>
