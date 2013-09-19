---
title: A little jQuery Mobile trick
date: 2011-07-25
published: true
---

I don't really have anything revolutionary to share with the world at the moment, but I **do** want to get back into writing regular posts; so I figured I'd share a little [jQuery Mobile](http://jquerymobile.com/) trick, since I've been using this library quite a bit lately for work.

Sometimes in JQM, you find that your page suddenly looks like garbage. Maybe you updated the data being displayed using a [jQuery template](http://api.jquery.com/category/plugins/templates/); or you rendered a form, navigated to a different page, then came back, and all of your JQM-provided styling mysteriously vanished.

You're [not alone](http://stackoverflow.com/questions/5249250); this problem seems to have affected quite a few web developers out there in the wild, giving jQuery Mobile the ol' college try.

Part of the problem here (which has driven more than a few of us to near-madness) is that the JQM team seem to have decided that calling `page()` on a jQuery object should... not actually *do* anything after the first time you call it. So maybe you tried adding a call to `page()` in your code, did your usual dance to reproduce the rendering problem, saw that everything was fine and thought, *Huzzah! All fixed!* And then the next day somehow you noticed the problem inexplicably resurface.

My *guess* is that JQM does this for optimization purposes, since JavaScript can be relatively expensive to run on mobile devices, especially those a generation or two back. So the developers figured, *Hey, if somebody calls `page()` multiple times, everything should already look fine after the first call; so we'll just do him/her a favor and ignore subsequent calls!* Which... I don't know. Honestly, I can imagine myself making the same (wrong, in my opinion) decision.

**Anyway**, here's the "trick" I promised: my coworkers and I found an **ingenious** solution to the "one `page()` call per DOM element" limitation: whatever item you want to re-render, to ensure all styles are applied properly by JQM, **do this**:

~~~{: lang=javascript }
function refreshStyles( $element ) {
  var $wrapper = $element.wrap( $( "<div>" ) );
  $wrapper.page();
  $element.unwrap();
}
~~~

**Edit 2011-Jul-29: [The above snippet is wrong!](/posts/jquery-mobile-trick-correction.html)** Use the following instead:

~~~{: lang=javascript }
function refreshStyles( $element ) {
  $element.wrap( '<div id="refresh-styles-wrapper">' );
  $("#refresh-styles-wrapper").page();
  $element.unwrap();
}
~~~

**(End edit.)**

In other words, **wrap** your element in a temporary DOM node that exists *only* for the purpose of calling `page()` and having it... you know, *do* something. Then just discard the wrapper completely.

Pretty clever, eh? (By the way, I have no idea what would happen if `$element` above comprised multiple jQuery objects. It's *really* only meant for the case where you're working with a single node. If you use it differently and get crazy results, don't blame me!)
