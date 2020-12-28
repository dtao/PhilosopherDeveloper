"""Very basic module for building the entire site."""

import os
import re

import jinja2
import markdown
import yaml


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
    except AttributeError as e:
        raise ValueError('Invalid frontmatter for {}: {}'.format(path, e))

    return {
        'metadata': metadata,
        'title': title,
        'filename': os.path.basename(path),
        'slug': slug,
        'date': date,
        'pretty_date': pretty_date,
        'html': html
    }


def render_post(post_data):
    """Render the full HTML file for the given post data."""
    template_path = os.path.join(os.path.dirname(__file__), 'templates',
                                 'post.html')
    with open(template_path) as f:
        template = jinja2.Template(f.read())

    return template.render(post_data)


if __name__ == '__main__':
    import sys

    args = sys.argv
    if len(args) < 3:
        print('Usage: python {} <source_file> <dest_dir>'.format(__file__))
        sys.exit(1)

    src_path = sys.argv[-2]
    dest_path = os.path.join(sys.argv[-1],
                             '{}.html'.format(os.path.basename(src_path)))
    post_data = get_post_data(src_path)
    post_html = render_post(post_data)
    with open(dest_path, 'w') as f:
        f.write(post_html)
    print('Wrote post "{}" to {}'.format(post_data['title'], dest_path))
