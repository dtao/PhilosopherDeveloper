# Site builder

The contents of this directory are a bare bones library for building the site
where the blog is hosted. The goal is to have as close to zero dependencies as
possible and to take a YAGNI approach.

Features:

- [x] Render all posts
- [x] Render index page
- [x] Render "All posts" page
- [x] Render "About" page
- [x] Render images as figures
- [x] Ensure syntax highlighting is working
- [x] Ensure custom CSS & JS are working
- [x] Ensure footnotes are working
- [x] Ensure tables are working
- [x] Ensure "Subscribe" form is working
- [x] Enable social sharing
- [x] Enable Disqus comments

## Side-by-side images

Put two or more images on consecutive lines, with no blank line between them:

```markdown
![Caption for the first image](/images/first.png)
![Caption for the second image](/images/second.png)
```

The paragraph must contain only images. They render in an equal-width,
borderless row, with each caption below its image, and stack vertically on
screens 600px wide or narrower. Images shrink to fit their column, preserve
their aspect ratio, and display at no more than 500px wide.
Empty alt text (`![](...)`) omits the caption.
Separate images with a blank line to keep them in separate rows.
- [x] Ensure RSS feed is working
