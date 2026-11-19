"""Very basic module for building the entire site."""

import datetime
import itertools
import json
import os
import pathlib
import re
import shutil

import bs4
import jinja2
import markdown
import yaml

BASE_DIR = os.path.dirname(__file__)

TEMPLATES = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.join(BASE_DIR, 'templates')))

WORDS_PER_MINUTE = 230
SUMMARY_LENGTH = 240


def summarize(html):
    """Return the plain text of the first real paragraph, truncated."""
    doc = bs4.BeautifulSoup(html, 'html.parser')
    for paragraph in doc.find_all('p'):
        text = ' '.join(paragraph.get_text().split())
        if text:
            break
    else:
        return ''

    if len(text) <= SUMMARY_LENGTH:
        return text
    return text[:SUMMARY_LENGTH].rsplit(' ', 1)[0].rstrip(',;:.') + '\u2026'


def reading_time(html):
    """Estimate the minutes needed to read the given HTML."""
    words = len(bs4.BeautifulSoup(html, 'html.parser').get_text().split())
    return max(1, round(words / WORDS_PER_MINUTE))


def get_all_posts(path):
    """Iterate all posts located in the given directory.

    This function returns a generator and internally calls `get_post_data` on
    each post as it's iterated.
    """
    for filename in os.listdir(path):
        if filename.endswith('.markdown') or filename.endswith('.md'):
            try:
                yield get_post_data(os.path.join(path, filename))
            except ValueError:
                print('File "{}" is not a valid post. Moving on...'.format(filename))
                continue


def get_post_data(path):
    """Parse a blog post at the given path and return a dict.

    The post should have the format:

    ```
    ---
    title: <title>
    date: <date in yyyy-mm-dd format>
    ---

    <Markdown content>
    ```

    The return value will be a dict whose 'metadata' property is the result of
    parsing the frontmatter as YAML, and whose 'html' property is the result of
    rendering the Markdown content to HTML.
    """
    fname = pathlib.Path(path)
    with fname.open() as f:
        source = f.read()

    try:
        _, frontmatter, content = source.split('---\n', maxsplit=2)
    except ValueError as e:
        raise ValueError('Error parsing {}: {}'.format(path, e))

    try:
        metadata = yaml.load(frontmatter, Loader=yaml.SafeLoader)
    except ValueError as e:
        raise ValueError(
            'Error parsing frontmatter for {}: {}'.format(path, e))

    try:
        title = metadata['title']
        date = metadata['date']
    except KeyError as e:
        raise ValueError(
            'Post {} missing required property: {}'.format(path, e))

    try:
        html = markdown.markdown(content, extensions=['codehilite',
                                                      'fenced_code',
                                                      'footnotes',
                                                      'mdx_emdash',
                                                      'smarty',
                                                      'tables'])
    except ValueError as e:
        raise ValueError('Error parsing Markdown for {}: {}'.format(path, e))

    try:
        # Start with the file name, removing the leading YYYY-MM-DD date
        filename, ext = os.path.splitext(fname.name)
        slug = re.sub(r'^\d{4}-\d{2}-\d{2}-', '', filename)

        # Replace spaces with dashes
        slug = re.sub(r'\s+', '-', slug)

        # Eliminate everything else that isn't alphanumeric or a dash
        slug = re.sub(r'[^a-z0-9\-]', '', slug)

        pretty_date = f'{date:%B} {date.day}, {date.year}'
        short_date = f'{date:%b} {date.day}'
    except AttributeError as e:
        raise ValueError('Invalid frontmatter for {}: {}'.format(path, e))

    # Render an RFC 3339 date for valid Atom content.
    date_iso = datetime.datetime(date.year, date.month, date.day).isoformat()

    # Use the modified time of the source file to infer last updated time.
    updated = datetime.datetime.fromtimestamp(fname.stat().st_mtime)

    # Strip away microsecond component and render in ISO 8601 format.
    updated_iso = updated.replace(microsecond=0).astimezone().isoformat()

    return {
        'metadata': metadata,
        'title': title,
        'slug': slug,
        'url_path': f'/posts/{slug}.html',
        'date': date,
        'published': date_iso,
        'updated': updated_iso,
        'pretty_date': pretty_date,
        'short_date': short_date,
        'subtitle': metadata.get('subtitle', pretty_date),
        'html': html,
        'summary': summarize(html),
        'reading_time': reading_time(html),
    }


def png_has_alpha(path):
    """Whether the PNG at `path` can contain transparency.

    Reads only the PNG header: an alpha channel (color types 4 and 6) or a
    tRNS chunk ahead of the image data. Missing or non-PNG files are False.
    """
    try:
        with open(path, 'rb') as f:
            if f.read(8) != b'\x89PNG\r\n\x1a\n':
                return False
            while True:
                header = f.read(8)
                if len(header) < 8:
                    return False
                length = int.from_bytes(header[:4], 'big')
                kind = header[4:]
                if kind == b'IHDR':
                    data = f.read(length)
                    if data[9] in (4, 6):
                        return True
                    f.seek(4, os.SEEK_CUR)
                elif kind == b'tRNS':
                    return True
                elif kind == b'IDAT':
                    return False
                else:
                    f.seek(length + 4, os.SEEK_CUR)
    except OSError:
        return False


def render_post(post_data, images_dir=None):
    """Render the full HTML file for the given post data.

    If `images_dir` is given, local PNGs with transparency get a
    `transparent` class so the stylesheet can back them in dark mode.
    """
    html = render_from_template('post.html', post_data)

    # Replace all <img> elements w/ <figure> markup
    doc = bs4.BeautifulSoup(html, 'html.parser')

    # Consecutive Markdown images share a paragraph. Use it as a layout row
    # when it contains only images and whitespace.
    for paragraph in doc.find_all('p'):
        contents = [node for node in paragraph.contents
                    if not isinstance(node, bs4.NavigableString) or node.strip()]
        if (len(contents) > 1 and
                all(getattr(node, 'name', None) == 'img' for node in contents)):
            paragraph.name = 'div'
            paragraph['class'] = ['image-row']

    images = doc.find_all('img')

    for img in images:
        src = img.get('src', '')
        if (images_dir and src.startswith('/images/') and
                png_has_alpha(os.path.join(images_dir, src[len('/images/'):]))):
            img['class'] = img.get('class', []) + ['transparent']

        figure = doc.new_tag('figure')
        # Remove a standalone image's paragraph, but preserve shared containers
        # such as image rows and table cells.
        parent = img.parent
        if (parent.name == 'p' and
                all(node is img or
                    (isinstance(node, bs4.NavigableString) and not node.strip())
                    for node in parent.contents)):
            parent.replace_with(figure)
        else:
            img.replace_with(figure)
        figure.append(img)
        if img.get('alt'):
            caption = doc.new_tag('figcaption')
            caption.string = img['alt']
            figure.append(caption)

    return str(doc)


def get_archived_comments(comments_dir, slug):
    """Load the archived Disqus comments for a post as a tree.

    Returns a list of top-level comments, each with a `replies` list, plus
    the total comment count. Comments were archived by
    scripts/fetch_disqus_comments.py.
    """
    path = os.path.join(comments_dir, f'{slug}.json')
    if not os.path.exists(path):
        return [], 0

    with open(path) as f:
        comments = json.load(f)

    by_id = {}
    for comment in comments:
        created = datetime.datetime.fromisoformat(comment['created_at'])
        by_id[comment['id']] = dict(comment,
                                    date_iso=created.date().isoformat(),
                                    pretty_date=f'{created:%B} {created.day}, {created.year}',
                                    replies=[])

    roots = []
    for comment in by_id.values():
        # Disqus gives `id` as a string but `parent` as a number.
        parent = by_id.get(str(comment['parent']))
        (parent['replies'] if parent else roots).append(comment)
    return roots, len(comments)


def render_from_template(template_name, data):
    """Render the full HTML from the given template for the given data."""
    return TEMPLATES.get_template(template_name).render(data)


if __name__ == '__main__':
    import sys

    args = sys.argv
    if len(args) < 3:
        print('Usage: python {} <source_dir> <dest_dir>'.format(__file__))
        sys.exit(1)

    src_dir = sys.argv[-2]
    dest_dir = sys.argv[-1]
    posts_dir = os.path.join(dest_dir, 'posts')
    images_dir = os.path.join(src_dir, 'images')

    print('Initializing directory...')
    shutil.rmtree(dest_dir, ignore_errors=True)
    os.makedirs(posts_dir, exist_ok=True)

    posts = list(get_all_posts(os.path.join(src_dir, 'posts')))
    for post in posts:
        post['archived_comments'], post['comment_count'] = get_archived_comments(
            os.path.join(src_dir, 'comments'), post['slug'])
    published_posts = sorted([post for post in posts
                              if post['metadata'].get('published', True)],
                             key=lambda post: post['date'], reverse=True)

    # Link each published post to its chronological neighbors.
    for newer, older in zip(published_posts, published_posts[1:]):
        newer['older'] = older
        older['newer'] = newer

    print('Rendering individual posts...')
    for post_data in posts:
        dest_path = os.path.join(posts_dir,
                                 '{}.html'.format(post_data['slug']))
        post_html = render_post(post_data, images_dir)
        with open(dest_path, 'w') as f:
            f.write(post_html)
        print('Wrote post "{}" to {}'.format(post_data['title'], dest_path))

    print('Rendering index page...')
    index_html = render_from_template('index.html', {'posts': published_posts})
    index_path = os.path.join(dest_dir, 'index.html')
    with open(index_path, 'w') as f:
        f.write(index_html)
    print('Wrote index to {}'.format(index_path))

    print('Rendering "All posts" page...')
    posts_by_year = itertools.groupby(published_posts,
                                      key=lambda post: post['date'].year)
    all_posts_html = render_from_template('posts.html', {
        'posts_by_year': posts_by_year
    })
    all_posts_path = os.path.join(dest_dir, 'posts.html')
    with open(all_posts_path, 'w') as f:
        f.write(all_posts_html)
    print('Wrote "All posts" page to {}'.format(all_posts_path))

    print('Rendering "About" page...')
    about_data = get_post_data(os.path.join(src_dir, 'about.markdown'))
    # Override URL path since this is using the sample template used for posts
    # but About doesn't follow the same URL pattern.
    about_data['url_path'] = '/about.html'
    about_html = render_post(about_data, images_dir)
    about_path = os.path.join(dest_dir, 'about.html')
    with open(about_path, 'w') as f:
        f.write(about_html)
    print('Wrote "About" page to {}'.format(about_path))

    print('Rendering RSS feed...')
    rss_xml = render_from_template('feedburner.xml', {
        'updated': published_posts[0]['updated'],
        'posts': published_posts[:10]
    })
    rss_path = os.path.join(dest_dir, 'feedburner.xml')
    with open(rss_path, 'w') as f:
        f.write(rss_xml)
    print('Wrote RSS feed to {}'.format(rss_path))

    print('Copying images and other assets...')
    shutil.copytree(os.path.join(src_dir, 'images'),
                    os.path.join(dest_dir, 'images'))
    shutil.copytree(os.path.join(BASE_DIR, 'stylesheets'),
                    os.path.join(dest_dir, 'stylesheets'))
    shutil.copy(os.path.join(src_dir, 'favicon.ico'), dest_dir)
    print('Copied images and assets')
