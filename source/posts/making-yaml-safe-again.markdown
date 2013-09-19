---
title: Making YAML safe again
date: 2013-01-24
published: true
---

TL;DR: Check out my new gem, [SafeYAML](http://dtao.github.com/safe_yaml). It lets you parse YAML without exposing your app to security exploits via arbitrary object deserialization.

***

There was [quite a stir in the Rails community recently](http://news.ycombinator.com/item?id=5028218) about a serious security vulnerability in Rails. To be more specific: [*every version of Rails*](https://groups.google.com/forum/#!topic/rubyonrails-security/61bkgvnSGTQ/discussion). We found out about this right away at [Cardpool](http://www.cardpool.com/), in part because Cardpool is a YC company and Paul Graham forwarded an e-mail from Thomas Ptacek to all YC alums warning of the vulnerability pretty much as soon as it was discovered.

Without getting too caught up in the weeds, I will just say the vulnerability was ultimately a consequence of the fact that Ruby's [YAML](http://www.yaml.org/) library by default permits the deserialization of arbitrary Ruby objects. This is a problem for Rails--as well as many other Ruby frameworks, to be fair--because, until patches were released to address this problem, any Rails app could be "tricked" into parsing malicious YAML by basically anybody, without any special credentials. The key weakness in Rails, specifically, was that Rails would automatically parse the parameters of any XML request, including parameters like this:

~~~{: lang=xml }
<data type="yaml">--- !ruby/object {}</data>
~~~

I'm not giving anything away here; exploits [have already been made public](https://community.rapid7.com/community/metasploit/blog/2013/01/09/serialization-mischief-in-ruby-land-cve-2013-0156). The important takeaway is pretty simple: never parse YAML from untrusted user input. Not in an application, and *definitely* not in a framework. Which means, in the case of Rails, don't automatically parse params as YAML. The patches that were released (and which we quickly deployed, obviously) addressed this issue by disabling XML parameter parsing by default. (Less aggressive patches were also made available for sites that needed to parse XML params by simply removing YAML from the list of types that could be embedded in an XML request.)

While this is probably fine for 9 out of 10 websites, and probably more than that since so few sites actually have any sort of API that accepts YAML--including Cardpool, I should add--it still felt a little frustrating to me, for a couple of reasons.

1. YAML is, to me at least, a really sweet data format[^yaml-sweet-format].
2. This whole vulnerability nonsense **could have been avoided in the first place** if we were willing to give up one teensy weensy little feature of Ruby's YAML library: the ability to deserialize arbitrary objects.

Don't get me wrong; I realize this can be a very useful feature, especially for tools that aim to hide away the details of sharing objects between processes (or entirely different machines). But in the context of a web service or an API, where you have an application and you want to send some information to my service, there's no reason for you to even know what types *exist* within my application's domain, let alone serialize or deserialize them. Strings, numbers, lists and maps are all we really need.

And so with this in mind--and after discovering that [Python's YAML module has a `safe_load` method](http://pyyaml.org/wiki/PyYAMLDocumentation#Loader)--I [asked on StackOverflow](http://stackoverflow.com/questions/14348538/is-there-an-equivalent-to-yaml-safe-load-in-ruby) if there's any way in Ruby to parse YAML without deserializing arbitrary objects. The answer I got led me to write a library that does precisely that: [SafeYAML](http://dtao.github.com/safe_yaml)[^projects].

Basically what SafeYAML does is override Ruby's built-in `YAML.load` method with an implementation that only deserializes a safe set of types: strings, numbers, arrays, hashes, and a few others. The beauty (in my humble opinion) of this approach is that it makes SafeYAML a great drop-in enhancement to any website that directly or indirectly parses user-supplied YAML. Simply by adding a dependency on the [gem](http://rubygems.org/gems/safe_yaml), without any additional code changes, you can have your cake and eat it too: re-enable YAML parsing in your application, without exposing yourself to a well-known exploit.

Check it out and let me know what you think! Bug reports, pull requests, etc. all welcome [on GitHub](https://github.com/dtao/safe_yaml).

[^yaml-sweet-format]: Even while I typed that sentence, I felt *sure* there are articles I could find pretty quickly on Google about why YAML sucks. I choose not to seek out these articles (yet).

[^projects]: As a side note, one of my goals for 2013 (a little late to call it a resolution I suppose) is to actually maintain and publicize the growing number of mostly-open-source projects I've started and, in most cases, abandoned over the years. Some are pretty far along; others are still little seedlings; still others exist nowhere but in my brain. But I think a worthwhile aim for this year is to go back through all of these projects and either get back to work on them or scrap them for good. SafeYAML is just the first of many.
