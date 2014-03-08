---
title: I miss personal coding styles
date: 2014-03-07
published: true
---

Let me share some fond memories with you.

One of my first projects at ThoughtWorks[^always-thoughtworks] went by the codename **EMB**; it's one I remember quite fondly (despite it being for a big ol' boring corporate client) for at least a couple of reasons:

- It's where I first learned JavaScript, and got to dabble a bit in Ruby (now easily two of my favorite languages).
- It's where I met some good friends at ThoughtWorks, including [@ph1](https://twitter.com/ph1), [@sameerkalburgi](https://twitter.com/sameerkalburgi), and [@gga](https://twitter.com/gga).

Now, the codebase on EMB was a bit quirky, so it made for an interesting introduction to JavaScript. For one thing, the code made almost zero use of the `this` keyword; in fact, I'd been on the project for at least several weeks before I even realized that there *is* a `this` keyword in JavaScript.[^this-in-javascript] Pete (the tech lead on the project) covered this in [a recent article for O'Reilly](http://programming.oreilly.com/2014/03/javascript-without-the-this.html).

Fun with styles
---------------

I generally like the `this`-less approach, but I'll get back to that. There was something else quirky about the EMB codebase. Some files had code that looked like this:

```javascript
// sample 1
function foo( arg1, arg2 ) {
  bar( arg1 );
  baz( arg2 );
}
```

And some looked like this:

```javascript
// sample 2
function foo(arg1, arg2) {
  bar(arg1);
  baz(arg2);
}
```

That is, some had space padding the function arguments and some didn't. So what?

The reason some code looked like sample 1 above was that was *Pete's style*. (It was at the time, anyway.) Pete put the spaces there. I remember asking about it one time, and whoever I was pairing with just shrugged and said, "I don't know, Pete likes to put those spaces there."

The rule of thumb was that you just tried to keep files interally consistent. If you were working in a file with the spaces, then you put spaces in your code. If not, you left them out.

There was an element of fun to this, for me. Normally if you're reading some code and you want to know who wrote it, you use a tool like `git blame`. On EMB, sometimes it was just obvious. You'd be looking at a function, it'd have the spaces, and if you had a question about it you'd just ask Pete. And most of the time you'd be right.

After leaving ThoughtWorks I went to work at Cardpool, where I had a similar experience. My coworker Robby indented his hashes like this:

```ruby
options = {
  :foo => 1,
  :bar => 2
  }
```

He indented the closing brace along with the keys. It drove me *crazy* reading his code. Any time I came across a hash literal like that, I had to fight the urge to change it to my way:

```ruby
options = {
  :foo => 1,
  :bar => 2
}
```

And another coworker, George, loved writing `if`/`then` statements all on one line:

```ruby
if admin then return admin_view else end
```

This also bugged me a little bit. I would have preferred:

```ruby
return admin_view if admin
```

Of course, it doesn't matter. Of *course*. But despite my OCD annoyance, the fun was still there. I could generally tell from a quick glance at some code whether it was Robby's, or George's, or mine. In my mind[^in-my-mind] I'd say things like *Classic Robby!*

No more fun
-----------

(To be continued)

[^always-thoughtworks]: I know, I know---*all of your posts start off with some anecdote from ThoughtWorks*. Sue me.

[^this-in-javascript]: Bear in mind I was learning via pair programming, so what I surely would have discovered very quickly via Google if I were working on my own, I often didn't need to because I could just ask my pair.

[^in-my-mind]: Or maybe it was out loud. I honestly don't remember.
