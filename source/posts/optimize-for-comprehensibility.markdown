---
title: Optimize for comprehensibility
date: 2012-12-29
published: true
---

Starting with an outline
========================

More than one of my high school English teachers taught us that when you're writing a paper, you should start by making an outline of your high-level points. This way, they told us, you would have a "skeleton" paper already written, which you could then "flesh out" by filling in appropriate details here and there.

I never much internalized this process of starting off with an outline. I wish I had.

To design or assemble
=====================

My first project at [ThoughtWorks](http://www.thoughtworks.com/) was in Dallas, TX. During a car ride back to the office after lunch one day, I was having a conversation with Billy, one of the client company's developers; and he mentioned that he had recently been to a Google conference to learn about [Google Web Toolkit](https://developers.google.com/web-toolkit/) (one of the technologies we were using on the project), among other things. I can't recall everything we talked about, but something that Billy said during that conversation has stuck with me ever since:

> Companies like Google, Microsoft, Apple---they are the LEGO makers. We are just the assemblers.

At the time, I strongly disagreed with Billy on this point. Part of me wanted to blurt out, "Speak for yourself!" I didn't say that, of course; in fact I wasn't even sure why I felt so strongly in opposition to this statement. Probably more than any other reason, I was just feeling defensive against what I felt was a belittling thing to say about being a software developer.

What I *did* say was something to the effect that we are all LEGO makers in the sense that we should strive to write clean code, to design clear interfaces, to build reusable components, etc. Billy smiled but clearly didn't agree with me. In retrospect, he probably thought I was being naïve.

A lesson on refactoring
=======================

On that same project, I became friends with a fellow ThoughtWorks developer, [Yujun Liang](http://seleniumcapsules.blogspot.com). I really enjoyed [pairing](http://en.wikipedia.org/wiki/Pair_programming) with Yujun; he and I both understood each other fairly quickly[^communication-in-pairing], and we got along quite well.

One habit of Yujun's that bugged me, though, was that he *loved* to refactor code. In contrast, I had a tendency (at the time) to prefer moving more quickly and building more features. I did understand the value of refactoring in many cases, such as to reduce code duplication. However, Yujun consistently engaged in a particular type of refactoring that I, at the time, found somewhat maddening.

Since a code snippet will probably better illustrate this type of refactoring than I could with words, here's an example. Suppose we came across this (completely fabricated) code on our project:

```java
public void sendNotifications() {
    Iterable<Notification> pendingNotifications = getPendingNotifications();

    // Group notifications by recipient.
    Map<String, List<Notification>> notificationsByRecipient = new HashMap<String, List<Notification>>();
    for (Notification n : pendingNotifications) {
        String recipient = n.getRecipient();
        if (!notificationsByRecipient.containsKey(recipient)) {
            notificationsByRecipient.put(recipient, new ArrayList<Notification>());
        }
        notificationsByRecipient.get(recipient).add(n);
    }

    // For each recipient, create a new notification task to be executed by the scheduler.
    Set<String> recipients = notificationsByRecipient.keySet();
    for (String recipient : recipients) {
        List<Notification> notificationsForRecipient = notificationsByRecipient.get(recipient);
        NotificationTask task = new NotificationTask(recipient);
        for (Notification n : notificationsForRecipient) {
          task.addNotification(n);
        }
        task.scheduleForDelivery();
    }
}
```

Yujun would refactor the above into something like this:

```java
public void sendNotifications() {
    Map<String, List<Notification>> notificationGroups = groupNotificationsByRecipient(getPendingNotifications());
    Iterable<NotificationTask> tasks = createNotificationTasksFromGroups(notificationGroups);
    scheduleNotificationTasksForDelivery(tasks);
}

// same implementation as above, just broken up into methods
```

Here's what bothered me about this kind of refactoring at the time: *there was still functionality to build.* While I would have conceded that Yujun's refactoring arguably made the code more *readable*, it did not get us any closer to completing the [stories](http://en.wikipedia.org/wiki/User_stories) we needed to finish that iteration. For me, that meant it was not an appropriate use of our time as (expensive) consultants. It was not even reducing code duplication, as the code in question only appeared in one place. I felt this sort of thing belonged at the bottom of a prioritized list of work.

The limited value of locality
=============================

You have probably picked up from my careful use of past-tense verbs that my stance on this has changed in the time since that project with Yujun. It has---but not in such a simplistic way that I'd say, "I was wrong, he was right, end of story." I now think there's a more nuanced way of looking at how code should read and the value of this style of refactoring. To explain what I mean, let me fast forward to my more recent experience at [Cardpool](http://www.cardpool.com/).

When I first joined the company, every commit I made was code reviewed by a fellow engineer. Very early on---probably within my first couple of weeks---my teammate commented to me that he noticed I tend to write lots of short methods whereas the rest of the engineers on the team generally wrote longer methods. It wasn't a criticism, just an observation. We agreed that we all have different styles and that there's an argument that can be made either way: a higher number of shorter methods can lead to more reusable code that's easier to unit test; whereas favoring fewer, longer methods offers the advantage of greater **locality**: you can see everything the code is doing in one place, without having to navigate back and forth between multiple places in a file (or between multiple files).

I would still say this is true to some extent. But curiously, the longer I've been at Cardpool, working in a codebase where this *fewer-longer-methods* style is the prevailing one, the more I've started to doubt one of the supposedly greatest benefits of locality: that it makes code easier to understand. I've found that long methods can have the opposite effect: when you have to scroll multiple times the height of your screen to read the entirety of a method's code, locality falls apart. There's so much to hold in your brain at once, it becomes difficult to reason about what the code is doing, where changes should be made, and what impact they'll have.

I think there's certainly some point at which you can go too far in the opposite direction; i.e., to make the *reductio ad absurdum* argument, suppose you committed to never writing methods longer than a single line. Reading such code would be like trekking through a treacherous jungle, a veritable nightmare. So, as with most things in life, there's a balance to be reached. I just happen to believe that the optimal balance is pretty far down towards the "shorter" end of the spectrum.

Details are irrelevant yet responsible
======================================

I just started reading the book *I am a Strange Loop* by Douglas Hofstadter (easily one of my favorite authors after reading [*Gödel, Escher, Bach*](http://en.wikipedia.org/wiki/Godel_escher_bach)); and in one of the earlier chapters he discusses the notion that **the low-level details of a system are simultaneously *responsible* for the system functioning yet *irrelevant* to how the system works**. I think it was while reading this passage that the idea I'm working towards truly started to crystallize for me:

> \[L\]et us think for a moment about \[...\] a gas in a cylinder with a movable piston. If the gas suddenly heats up (as occurs in any cylinder in your car engine when its spark plug fires), then its pressure suddenly increases and *therefore* (note the causal word) the piston is suddenly shoved outwards. Thus combustion engines can be built.
>
> What I just told is the story at a gross (thermodynamic) level. Nobody who designs combustion engines worries about the fine-grained level---that of molecules. No engineer tries to figure out the exact trajectories of 1023 molecules banging into each other! The locations and velocities of individual molecules are simply irrelevant. All that matters is that they can be counted on to *collectively* push the piston out. Indeed, it doesn't matter whether they are molecules of type X or type Y or type Z---pressure is pressure, and that's all that matters. The explosion---a high-level event---will do its job in heating the gas, and the gas will do its job in pushing the piston. This high-level description of what happens is the *only* level of description that is relevant, because all the microdetails could be changed and exactly the same thing (at least from the human engineer's point of view) would still happen.

I love this, and I think it covers a concept that is extremely useful for us software engineers. Embrace the notion that the low-level *implementation* (details) of software, while indisputably *responsible* for how that software works, can be at the same time irrelevant, extraneous, unimportant---however you want to put it---to understanding the software at a higher level.

Elsewhere in the book, Hofstadter makes this more general point about how much of our understanding of the world actually relies on, essentially, *ignoring* lower-level details:

> To describe a gas's behavior by writing a gigantic piece of text having Avogadro's number of equations in it (assuming such a herculean feat were possible) would not lead to anyone's understanding of anything. But throwing away huge amounts of information and making a statistical summary could do a lot for comprehensibility. Just as I feel comfortable referring to "a pile of autumn leaves" without specifying the exact shape and orientation and color of each leaf, so I feel comfortable referring to a gas by specifying just its temperature, pressure, and volume, and nothing else.

The importance of a consistent abstraction
==========================================

Through experience, reading, and thinking a lot on my own I've come to appreciate Yujun's style of refactoring much more over time. I think I understand better now how important such work is to the sustained health of a codebase. But even though I appreciate the *intent*, there remains the question of what the end result should be.

A mantra that many of us have heard is that "good code should read like prose"--a quote I want to attribute to [Donald Knuth](http://en.wikipedia.org/wiki/Donald_Knuth), but I could be wrong---and I'm inclined to *sort of* agree with that. It's right in line with another mantra we've all heard: that when writing code, you should "optimize for readability" (as opposed to, e.g., performance). These are good guidelines, but in my opinion they only get us about halfway to where we should be.

I was fortunate enough to work with [Pete Hodgson](http://blog.thepete.net), another former ThoughtWorks teammate, on multiple projects. On our first project together, Pete took up the burden of teaching me a valuable lesson about how *not* to write code, in response---to my embarrassment---to a rather clumsy bit of work I had done.

Pete noticed that in one of my commits I had added a snippet of code in a place where, from an organizational standpoint, it simply didn't belong. *Functionally* the code did what I intended; but its placement was haphazard, something I hadn't put any reasonable amount of thought into. I would compare my process for picking its location to spinning a globe and landing your finger on a random spot and declaring: "That's where I'll build my house!"

The problem actually went beyond the poor placement of a code snippet within a larger codebase, though. I really can't recall what the actual code was, so I'll just write another little fabrication to illustrate the problem:

```javascript
// what was already there
updateListContents();
attachEventHandlers();
refreshStyles();

// what I added
for (var i = 0; i < pages.length; i++) {
  if (pageIsHidden(pages[i])) {
    hideDialogs(pages[i]);
  }
}
```

Again, that isn't the actual code I wrote; but I'm pretty confident it was something like that. In retrospect, I'm pretty ashamed to admit that I *ever* failed to see the problem there. But as Pete was kind enough to articulate for me, and as I quickly understood, there most certainly is a problem: the above code fails to maintain a **consistent abstraction level**.

It was as if Yujun had started to refactor the code, then got pulled away to work on something else. Or, to return to Hofstadter's point about irrelevant details, it was as though I started to tell you a story by describing some events that occurred and the actions different characters performed, then got to a scene where two characters play a game of chess and suddenly started listing every single move. This has a jarring, botched effect---in code *or* in prose. Such inconsistency pulls you out from a level of understanding and plunges you "into the weeds"--as apt a metaphor as I've heard to describe this sort of thing---by providing *detail that is irrelevant to a high-level understanding of what's important*.

What comprehensible code looks like
===================================

I mentioned that I only half-agree with the assertion that code should read like good prose. Actually, it might have made sense to say that at the time, whoever first said it. But I would argue that with the advent of [hypertext](http://en.wikipedia.org/wiki/Hypertext) we've gained an even better way to present information than prose, which is generally linear. The more I think on this idea, the more I like it: **unlike prose, good code should read like Wikipedia**.

Some of you probably instinctively know what I mean by this, but let me explain. When you read an article on Wikipedia (in hypertext), you get a high-level description of some subject---a historical event or figure, a technology, a scientific theory, etc. This description maintains what I'll call a consistent "altitude"--that is, let's say, a 10,000-foot view. A well-written article keeps this altitude without diving much deeper; that is left to the reader who wants to find out more about some subtopic of the current subject.

When you *do* find some part of an article on Wikipedia fascinating, what normally happens (at least with me) is you find yourself clicking on links which take you to more details or otherwise provide greater context on whatever you happen to be reading about. This is a great way to provide information, as it is easy to comprehend---thanks to a consistent altitude---while it also empowers the reader to explore ideas in a way that naturally follows his or her own curiosity. (Incidentally, this also makes Wikipedia a very dangerous place if you can't afford to waste a lot of time!)

And of course, I could replace the word "altitude" in the above paragraphs with "abstraction level" and suddenly we'd be talking about code. Good code is written like a good Wikipedia article---at a consistently high level of abstraction, so that it can be easily understood, but also in a way that invites *exploration* to the curious developer who wants to know how this method is implemented, or what dependencies that class has, or how these interfaces fit together.

(As a sort of unfortunate aside, I feel compelled to point out---or admit?--that what I'm saying does require a certain level of sophistication among developers' tools, just as hypertext requires web browsers offering more functionality than simple text viewers. I'm a huge fan of "lean" editors such as [Sublime Text](http://www.sublimetext.com/), or to a lesser extent [emacs](http://www.gnu.org/software/emacs/) or [vim](http://www.vim.org/); but with respect to the point I'm making about code reading like hypertext, I do think it's worth calling out the advantage of both statically typed languages and beefier IDEs such [Eclipse](http://www.eclipse.org/) and [Visual Studio](http://www.microsoft.com/visualstudio).)

To provide one more example: if someone asks you what you do professionally, do you start by going through every task you perform on a daily basis at your job and explaining each one in detail? No, you start with a high-level answer, like "I'm a software engineer" or "I'm an investment banker" or "I'm in sales." If this person asks you follow-up questions, *then* you provide more information. The more interest someone shows in what you have to say, the more you can go into detail with the confidence he or she actually cares to hear it. In this sense writing code is similar to telling a story or having a conversation.

Optimizing for the right thing
==============================

This has really all been a long-winded way of saying: *absolutely* prefer shorter methods. I'm willing to put a stake in the ground on this one now. The more I write software, and the more I think about it, the more I become convinced that this is a crucial part of writing good code that others can understand. Start with the 10,000-foot view, maintain that altitude, and let the reader (i.e., your teammates) decide when to drill deeper for more detail. In this way your code will be *discoverable*, like a Wikipedia article, and not just *linear*, like standard prose.

I should be clear about something at this point. I don't think that writing long methods makes you a bad engineer, or that writing short methods makes you a good one. I do think I'm right on this issue; but I also know there are other engineers (including some of my current teammates) who would likely disagree with me, yet from whom I still have plenty to learn. Probably more importantly, I can't even claim to be particularly effective at practicing what I preach, at least at the moment. It's an opinion that has only recently solidified for me, and one that will require a lot of self-discipline for me to start applying consistently to my work.

But there's a reason I wrote all this, and it all comes back to what Billy said about being assemblers. I think this is at least partially wrong, because even if we are assemblers in some ways, we are also *designers*; and any system that is designed well must be comprehensible. That's why I don't think it's enough to just write code that gets the job done, nor do I think that "readability" is the right word to describe how we make code accessible to others. Optimizing for *comprehensibility* is all about abstraction, or as Hofstadter put it: "throwing away huge amounts of information." It's about *hiding* detail, not revealing it all in one place.

[^communication-in-pairing]: As anyone who's seriously worked in a pair programming environment before knows, the importance of clear communication between developers is absolutely critical to their ability to work effectively. I've sadly had the experience more than once of working with otherwise talented developers with whom I struggled to communicate; and our productivity inevitably suffered as a result.
