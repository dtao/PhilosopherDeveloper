# The Philosopher Developer

This is the repo for my blog, [The Philosopher Developer][1].

The site is hosted on [Netlify][3]. I use [Disqus][4] for comments and
[ShareThis][5] for the social sharing buttons (Twitter, etc.) on each post.
(Incidentally, if you know of a better sharing product, [let me know][6]! I'm
really not a huge fan of ShareThis, mainly because I feel like it slows down
page loads significantly. But I'm also too lazy to fiddle with those buttons
myself.)

The content of the posts themselves is all in **source/posts**. Each post is
written in [Markdown][7] and rendered using [Python Markdown][8], with
[Pygments][9] for syntax highlighting and [Jinja][10] for HTML templates.

Mostly, I keep the blog focused on higher-level discussions about software
and/or philosophy, though a lot of my earlier posts were much more technical. I
also have a website at [danieltao.com][11] with other random thoughts, ideas,
and opinions.

Follow [me on Twitter][12] or subscribe to [the RSS feed][13] if you want
updates whenever I write a new post.

I think that about covers it.

## Developing the site locally

```
pip install -r requirements.dev.txt
honcho start
```

[1]: https://philosopherdeveloper.com/
[3]: https://www.netlify.com/
[4]: https://disqus.com/
[5]: https://www.sharethis.com/
[6]: https://github.com/dtao/PhilosopherDeveloper/issues
[7]: https://daringfireball.net/projects/markdown/
[8]: https://python-markdown.github.io/
[9]: https://pygments.org/
[10]: https://jinja.palletsprojects.com/en/2.11.x/
[11]: https://danieltao.com/
[12]: https://twitter.com/dan_tao
[13]: https://feeds.feedburner.com/philosopherdeveloper
