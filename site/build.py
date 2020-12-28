"""Very basic module for building the entire site."""

import os
import re

import excerpt_html
import jinja2
import markdown
import yaml


def get_all_posts(path):
    """Iterate all posts located in the given directory.

    This function returns a generator and internally calls `get_post_data` on
    each post as it's iterated.
    """
    for filename in os.listdir(path):
        if filename.endswith('.markdown') or filename.endswith('.md'):
            yield get_post_data(os.path.join(path, filename))


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
    with open(path) as f:
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
        html = markdown.markdown(content)
    except ValueError as e:
        raise ValueError('Error parsing Markdown for {}: {}'.format(path, e))

    try:
        slug = re.sub(r'[^a-z]', '-', title.lower())
        pretty_date = date.strftime('%B %d, %Y')
        excerpt = excerpt_html.excerpt_html(html, cut_mark=None)
    except AttributeError as e:
        raise ValueError('Invalid frontmatter for {}: {}'.format(path, e))

    return {
        'metadata': metadata,
        'title': title,
        'filename': os.path.basename(path),
        'slug': slug,
        'date': date,
        'pretty_date': pretty_date,
        'html': html,
        'excerpt': excerpt
    }


def render_post(post_data):
    """Render the full HTML file for the given post data."""
    return render_from_template('post.html', post_data)


def render_from_template(template_name, data):
    """Render the full HTML from the given template for the given data."""
    template_path = os.path.join(os.path.dirname(__file__), 'templates',
                                 template_name)
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
    posts = list(get_all_posts(src_dir))

    print('Rendering individual posts...')
    for post_data in posts:
        dest_path = os.path.join(
            sys.argv[-1], 'posts', '{}.html'.format(post_data['filename']))
        post_html = render_post(post_data)
        with open(dest_path, 'w') as f:
            f.write(post_html)
        print('Wrote post "{}" to {}'.format(post_data['title'], dest_path))

    print('Rendering index page...')
    index_html = render_from_template('index.html', {
        'posts': sorted(posts, key=lambda post: post['date'], reverse=True)
    })
    index_path = os.path.join(sys.argv[-1], 'index.html')
    with open(index_path, 'w') as f:
        f.write(index_html)
    print('Wrote index to {}'.format(index_path))
