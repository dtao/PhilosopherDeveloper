- global state has bad rap
  - code has consequences far from view
  - dependencies on the "unseen" proliferate, so code is not reusable
- quote scott
  - typically problem w/ "global" is "global variables"
  - "constants" are another beast
- the line between these two is fuzzier than you think
  - decision of what to make "global" can have impact on code comprehensibility
  - how much to consider at one time?
  - quote hofstadter:
    > We build up our mental representation of a situation layer by layer. The lowest
    > layer establishes the deepest aspect of the context-sometimes being so low that it cannot
    > vary at all. For instance, the three-dimensionality of our world is so ingrained that most
    > of us never would imagine letting it slip mentally. It is a constant constant. Then there are
    > layers which establish temporarily, though not permanently, fixed aspects of situations,
    > which could be called background assumptions-things which, in the back of your mind,
    > you know can vary, but which most of the time you unquestioningly accept as
    > unchanging aspects. These could still be called "constants". For instance, when you go to
    > a football game, the rules of the game are constants of that sort. Then there are
    > "parameters": you think of them as more variable, but you temporarily hold them
    > constant. At a football game, parameters might include the weather, the opposing team,
    > and so forth. There could be-and probably are-several layers of parameters. Finally, we
    > reach the "shakiest" aspects of your mental representation of the situation-the variables.
    > These are things such as Palindromi's stepping out of bounds, which are mentally "loose"
    > and which you don't mind letting slip away from their real values, for a short moment.
  - the best convention-based frameworks use read-only global variables
- lots of devs (e.g. Java anyone?) dislike this "magic", prefer everything explicit
  - understandable as reaction to big-ball-of-mud pattern emerging from horrible global state
  - but leads to serious YAGNI violations, everything configurable
  - all dependencies injected for testability, configurability
- probable objection: "difference between being global and being explicit!"
  - true, but the more global something is, the less explicit it should need to be
  - learning curve, of course -- lesser of two evils
    - consider learning a new (spoken) language, getting frustrated that dictionary does not contain all idioms, puns, shades of meaning
    - we accept that best way to learn natural language is through immersion; frameworks are this way too
- let's take a step back and consider alternative in life
  - everything is ambiguous, require explicit all the time!
  - my wife is named Kathryn; what if someone asked "how's Kathryn?" and I said "which Kathryn?"
  - in California, what if someone asked "what time is it?" and you said "in which time zone?"
  - what if the doctor asked "how much do you weigh?" and a patient responded "on which planet?"
- holding some things constant makes for manageable cognitive load
- we've all been burned by global state as well as magic; but now let's not go so far w/ explicit, configurable everything that it holds us back
