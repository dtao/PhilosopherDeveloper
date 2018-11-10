---
title: The business goal
date: 2018-09-30
published: false
---

The team met up on Monday morning, as they always did to discuss the items in
their backlog.

"Let's talk about Alice's ticket," said Bob, the product owner. "Alice, the
summary here says _Configure auto-scaling_. That sounds like a technical
solution. Remind me, what's the actual business goal there?"

Alice fidgeted in her seat, as all engineers do under the light of a business
person's attention. "Well, I guess it's to make sure the system stays healthy
under production load," she managed to say. "If we don't have enough workers to
keep up with the queues, message processing could be delayed and eventually our
servers might run out of memory and crash."

Bob thought for a moment. "All right, so it sounds like if we don't set up
auto-scaling, we might not be able to handle peak traffic; is that right?"
Alice nodded. "Then let's update the summary on this ticket to _Prepare the
servers for peak traffic_. I think that better captures the outcome we actually
care about without being too prescriptive about a solution. Think of it like
this: we don't actually care about auto-scaling *per se*, as long as our
servers can handle production load. Does that sound right?"

Alice shrugged. "I suppose you're right. It's less specific, but I guess that's
fine as long as the final solution meets our needs."

The next day, Bob met with his supervisor, Carol. While they went over the
state of Bob's project, Carol pointed to an item in the backlog that caught her
interest. "This one here," she said, pointing to Alice's ticket. "It says
_Prepare the servers for peak traffic_. That sounds like a technical concern.
What's the business goal there?"

Bob cleared his throat. "Well, we don't want the system to crash while our
users are trying to use it," he said. "That could cause our customers to lose
faith in us and hurt our brand."

Carol nodded. "If I may," she said, taking Bob's laptop and editing the field,
"perhaps we change this to: _Mitigate risk to customers from a production
outage_." She handed the laptop back to Bob. "Think of it this way: if our
servers were to crash, that in itself wouldn't matter as long as our customers
weren't negatively impacted."

Bob shrugged. "I suppose so. It's a bit less specific, and thus harder to act
on; but we can keep that in mind."

The following day, Carol was chatting with the VP of the department when Bob's
project came up. She mentioned that one of Bob's devs was doing some work to
mitigate the risks of customers being impacted by an outage. "Hmm," the VP
said. "But I wonder, is customer impact itself really what matters to us here?
What's the actual _business_ goal?"

Carol considered the question. After a pause, she replied, "I suppose it isn't
really impact to our existing customers that matters, _per se_, as long as we
continue to acquire customers at a rate that exceeds churn."

The VP smiled. "That's right. And just to drive the point home: if there were
some project that completely screwed over existing customers and caused a PR
nightmare, but it somehow magically secured us a steady stream of _new_ paying
customers indefinitely? That would be perfectly acceptable, from a business
perspective."

Carol left the conversation in deep thought. When she got back to her desk, she
e-mailed Bob. _Thinking we might still want to tweak that ticket about
preventing an outage_, she wrote. _Real goal is to keep customer acquisition
healthy. How about "Protect customer acquisition against increased exposure"?_

The next day was Thursday, the day of the VP's weekly debrief with the CEO. The
VP mentioned that there were some concerns about possible disruptions to
customer acquisition from Carol's unit and that efforts were underway to
protect against those potential disruptions. "Who actually cares about
customer acquisition?" the CEO said. "Tell me, what is the real business goal?"

The VP looked surprised at first, but then his eyes lit up with a realization.
"Profit," he said, "that's what really matters."

"Exactly right," the CEO replied. "Think of it this way: even if we never
acquired another paying customer for the products in Carol's unit, if we could
continue to increase profit by other means, that would be just fine."

On Friday the CEO was at a meeting with investors, talking about some of the
challenges facing the business. She expressed concern that the company's
profitability could take a hit in the near future.

After the meeting one of the investors pulled her aside. "Listen," he said,
"profitability is a means to an end. At the end of the day, what we all really
care about is the return on our investment. Profit is great and all, but
honestly just get that valuation up and sell. Make us that return and we'll all
be happy."

Over the weekend the investor met with his spiritual advisor, where he
recounted his conversation with the CEO the day before. His advisor gave him a
worried look. "You work so hard, always chasing that return on investment," she
said. "But what is it you're really after? Why do you need so much money? What
is the real _goal_?"

The investor ruminated the question. "I suppose if I'm honest," he said at
last, "I'm exhausted, and I just want to retire. I don't actually care about
the money. I just want to get to a point where I can _stop_ working so much,
without having to stress about supporting my family and living comfortably."

The spiritual advisor reported to the enclave later that evening. As she
approached the table in the center of a dimly-lit room, she removed her human
mask to reveal her true lizard form. "My asset is growing weak," she hissed.
"It may be that the time has come to replace him."

One of the elder members of the enclave spoke up. "Remind us," he said softly,
"why have you been guiding this human? What is it we are hoping to accomplish
here?"

The agent answered without hesitation. "Sir, the objective of this mission was
to ultimately leverage this man's firm and its portfolio of technology
companies to disrupt global markets and weaken the human economy so that we
might take over."

"That's right," the elder said. "So what truly matters is that we can dominate
humankind, whether or not we use this man's company as a means to do so." The
other members of the enclave all expressed their agreement.

The elder later reported to the chamber of The Great One, who awaited him from
her towering throne. "Your majesty," he said, prostrating himself. "Our mission
to enslave the human race is progressing as hoped."

The Great One sighed and looked into the distance. "I grow tired of this
mission to enslave humanity. We have already conquered so many worlds. And for
what? Only to trap another billion souls to add to our crystal collection?" The
Great One gestured lethargically to a glass display housing several glowing
trinkets in a corner of the chamber.

At that moment, a lizard technician ran into the room. "Your majesty!" he
cried, "our mothership's computers are being overloaded! Something is causing
all our processing units to overheat. If we don't do something soon, the result
will be total system failure."

The Great One glowered at the technician, then at the elder, who stood there
paralyzed. "This is outrageous!" roared The Great One. "Has no one on your
incompetent team configured auto-scaling?"
