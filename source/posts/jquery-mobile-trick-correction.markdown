---
title: "About that jQuery Mobile trick: Correction"
date: 2011-07-26
published: true
---

Faithful readers. There was an **error** in my previous post about refreshing styles in a jQuery Mobile app!

*Ahhh!!!* I can hear you screaming. Calm down; **I have a fix!**

(Warning: I'm not 100% sure I *understand* this fix; but hey, it's JavaScript! *Nobody* really understands[^nobody-understands-javascript] it, right?)

A refresher: what I suggested was this:

~~~{: lang=javascript }
function refreshStyles( $element ) {
  var $wrapper = $element.wrap( "<div>" ); // This is a mistake!
  $wrapper.page();                         // This doesn't work!
  $element.unwrap();
}
~~~

The above code doesn't work because `wrap` returns the *wrapped* element (not the *wrapper* element).

Here's that fix I mentioned (incidentally, this is how it was coded in our code base at work all along... go figure):

~~~{: lang=javascript }
function refreshStyles( $element ) {
  $element.wrap( '<div id="refresh-styles-wrapper">' ); // Look Ma, no local!
  $("#refresh-styles-wrapper").page();                  // Egads! It works!
  $element.unwrap();
}
~~~

So yeah, somehow forcing jQuery to *re-find* the wrapper element makes everything honky dory. And if you don't believe me, check it out:

[Proof.](http://jsfiddle.net/tJwYs/1/)

[^nobody-understands-javascript]: I have this theory that JavaScript is the language with the greatest percentage of *hackers*, as opposed to actual developers. By which I mean, most of us just [fiddle around](http://jsfiddle.net/) with JS code until it works; but we don't entirely *get* what we're doing. At least that's the case with me. (Don't tell my employer.)
