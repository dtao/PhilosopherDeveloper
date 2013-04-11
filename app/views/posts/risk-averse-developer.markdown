- cut myself with Shun knife... possible responses:
  - wow, too sharp! must get duller knife
  - my fault -- must cut slower

- many developers react one of these two ways
  - first way:
    - classic reason to prefer statically typed languages
    - compiler can verify correctness!
  - second way:
    - maybe still use "dangerous" tool (e.g. dynamic language)
    - but enforce strict guidelines
    - maybe even develop static analysis tools
    - code reviews
  - (also, in many cases devs react in BOTH ways)

- proposal: continue using knife as normal
  - actually not a big deal -- except in few cases, software not life & death
  - better just shrug it off rather than live whole life cutting slowly

maybe leave the following section out!

- what about performance?
  - yes, current wisdom is you make a trade-off
  - developer productivity vs. software performance
  - startups prefer former while larger companies must lean towards latter for reasons of scale, etc.
  - but does it need to be this way?
    - dynamic/interpreted style of programming lends to faster feedback, faster development
    - compilation does not necessarily have to be part of this feedback loop
    - example: for this blog, I write w/ Markdown/SASS -- does not impact serve time
