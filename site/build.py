"""Very basic module for building the entire site."""

import datetime
import itertools
import os
import pathlib
import re
import shutil

import bs4
import excerpt_html
import jinja2
import markdown
import yaml

BASE_DIR = os.path.dirname(__file__)


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

        pretty_date = date.strftime('%B %d, %Y')
        excerpt = excerpt_html.excerpt_html(html, cut_mark=None)
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
        'date': date,
        'published': date_iso,
        'updated': updated_iso,
        'subtitle': metadata.get('subtitle', pretty_date),
        'html': html,
        'excerpt': excerpt
    }


def render_post(post_data):
    """Render the full HTML file for the given post data."""
    html = render_from_template('post.html', post_data)

    # Replace all <img> elements w/ <figure> markup
    doc = bs4.BeautifulSoup(html, 'html.parser')
    images = [image for image in doc.find_all('img')
              if 'buymeacoffee.com' not in image['src']]

    for img in images:
        figure = doc.new_tag('figure')
        img.parent.replace_with(figure)
        figure.append(img)
        caption = doc.new_tag('figcaption')
        caption.string = img['alt']
        figure.append(caption)

    return str(doc)


def render_from_template(template_name, data):
    """Render the full HTML from the given template for the given data."""
    template_path = os.path.join(BASE_DIR, 'templates', template_name)
    with open(template_path) as f:
        template = jinja2.Template(f.read())

    return template.render(data)


if __name__ == '__main__':
    import sys

    args = sys.argv
    if len(args) < 3:
        print('Usage: python {} <source_dir> <dest_dir>'.format(__file__))
        sys.exit(1)

    src_dir = sys.argv[-2]
    dest_dir = sys.argv[-1]
    posts_dir = os.path.join(dest_dir, 'posts')

    print('Initializing directory...')
    shutil.rmtree(dest_dir, ignore_errors=True)
    os.makedirs(posts_dir, exist_ok=True)

    posts = list(get_all_posts(os.path.join(src_dir, 'posts')))

    print('Rendering individual posts...')
    for post_data in posts:
        dest_path = os.path.join(posts_dir,
                                 '{}.html'.format(post_data['slug']))
        post_html = render_post(post_data)
        with open(dest_path, 'w') as f:
            f.write(post_html)
        print('Wrote post "{}" to {}'.format(post_data['title'], dest_path))

    print('Rendering index page...')
    published_posts = sorted([post for post in posts
                              if post['metadata'].get('published', True)],
                             key=lambda post: post['date'], reverse=True)
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
    about_html = render_post(about_data)
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
