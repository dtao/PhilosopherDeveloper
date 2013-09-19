---
title: Does jQuery turn programmers into babies?
date: 2011-07-29
published: false
---

Part of me kind of hates[^hating-jquery] [jQuery](http://jquery.com/). Let me tell you why.

The other day I was wondering if there's a good way to take an element and put another element around it at the same location in the DOM. For example:

```html
<div class="outer">
    <div class="inner">
    </div>
</div>
```

The goal would be to enclose `inner` within a `<div>` so that the resulting DOM looks like this:

```html
<div class="outer">
    <div class="middle">
        <div class="inner">
        </div>
    </div>
</div>
```

So I did a quick Google search and... guess what? There's already [a jQuery method to do exactly this](http://api.jquery.com/wrap/)!

```javascript
$(".inner").wrap( $('<div class="middle">') );
```

But [you guys already knew about that](/posts/little-jquery-mobile-trick.html), of course. (There's also, naturally, [a method to do the exact opposite](http://api.jquery.com/unwrap/).)

Some time later, I found myself writing code that I wanted to be executed the *first* time a page was shown (in jQuery Mobile—big surprise!); what I came up with looked something like this:

```javascript
function doSomethingWhenPageShows() {
  if ($page.is(":visible")) {
    doSomething($page);
  } else {
    $page.bind("pageshow", function() {
      doSomething($page);
      $page.unbind("pageshow");
    });
  }
}
```

Pretty clever, yeah? (And yeah, yeah, I *know* that's reckless as it unbinds all handlers attached to the `"pageshow"` event... **whatever**. It was fine in this context! Trust me! Now leave me alone.)

That is, it seemed clever **until I realized [there's already a jQuery method to do this too](http://api.jquery.com/one/)!**

```javascript
$page.one("pageshow", function() {
  doSomething($page);
});
```

OK, awesome, jQuery is magical and does everything I could ever possibly need. Here's why I *kinda* don't like that.

![The ol' silver spoon](/images/silver-spoon.jpg)

It's what I'll call a **Silver Spoon API**. It does *so much* for me, it's almost at the point where I'm *surprised* when I have to write something myself. And that just turns me into a **baby**.

Don't get me wrong; I've got nothing against the makers of jQuery. I think it's an outstanding library. My point is more of an observation about the inherent weakness in myself, other developers, and basically human beings in general: the more you get used to someone else doing something *for* you, the greater the risk that your skills may atrophy, eventually rendering you unable to do it yourself.

In some ways this is a necessary evil, not just for software but for all of human technological advancement. When we stand on the shoulders of those who came before us, we're doing just that: standing on their shoulders. We are leveraging their accomplishments in order to pave some new trails of our own. It would be foolhardy for us to try and accomplish everything our predecessors did *in addition* to our own goals.

This is why when I get started on a new software project, I don't think, *Okay, let's start by writing a new operating system!*

![How to make an apple pie](/images/apple-pie-universe.jpg)

Still, I think it's something to be mindful of. It's perfectly legitimate to ask, "Is there a jQuery method to do X?" (After all, however that question ends, the answer is most likely *yes*) But *if* the answer ends up being no, that doesn't mean it's time to throw in the towel. **We aren't babies. We can write our own code!**

(In the .NET world, I often find the same thing with LINQ: "Is there a LINQ method to do X?" This is a fine question, until the answer comes back as *no* and the developer then decides, *Ah, that's too bad, guess I can't do it then.*)

So beware of those silver spoon APIs. They're awfully nice, but they do have limits; and when we discover those limits we need to remember that we're actually perfectly capable of doing things ourselves.

[^hating-jquery]: OK, that was really just for shock value. I definitely do *not* hate jQuery; it's a really solid library.
