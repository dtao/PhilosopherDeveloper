"""Archive Disqus comments for every post as static JSON.

The blog used Disqus for comments from 2013 until 2026. This script grabs each
post's comment thread from the public Disqus embed page (the same page a
browser loads when viewing a post) and saves the comments to
source/comments/<slug>.json, which the site build renders as static HTML.

Posts were identified to Disqus by their slug, so that's what we look up.
Posts with no comments get no file.

Usage:

    python scripts/fetch_disqus_comments.py
"""

import json
import os
import re
import subprocess
import sys
import time
import urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSTS_DIR = os.path.join(ROOT, 'source', 'posts')
COMMENTS_DIR = os.path.join(ROOT, 'source', 'comments')

EMBED_URL = 'https://disqus.com/embed/comments/?base=default&f=philosopherdeveloper&t_i={}'
THREAD_DATA = re.compile(
    r'<script type="text/json" id="disqus-threadData">(.*?)</script>', re.S)


def slug_for(filename):
    """Same slug logic as site/build.py."""
    slug = os.path.splitext(filename)[0]
    slug = re.sub(r'^\d{4}-\d{2}-\d{2}-', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    return re.sub(r'[^a-z0-9\-]', '', slug)


def fetch_thread(slug):
    url = EMBED_URL.format(urllib.parse.quote(slug))
    # Use curl rather than urllib so the system's trusted certificates apply
    # (e.g. behind a corporate TLS proxy).
    html = subprocess.run(['curl', '-sfL', '-A', 'Mozilla/5.0', url],
                          check=True, capture_output=True, text=True).stdout
    match = THREAD_DATA.search(html)
    if not match:
        raise ValueError(f'No thread data found for {slug}')
    return json.loads(match.group(1))


DISQUS_REDIRECT = re.compile(r'href="https?://disq\.us/url\?url=([^"&]+)[^"]*"')


def unwrap_links(html):
    """Replace disq.us redirect links with the URLs they point to.

    Disqus wraps every link as disq.us/url?url=<encoded url>:<hash>&cuid=...
    """
    def replace(match):
        url = urllib.parse.unquote(match.group(1)).rsplit(':', 1)[0]
        return 'href="{}"'.format(url.replace('"', '%22'))
    return DISQUS_REDIRECT.sub(replace, html)


def simplify(post):
    author = post['author']
    return {
        'id': post['id'],
        'parent': post['parent'],
        'created_at': post['createdAt'],
        'author': author.get('name') or author.get('username') or 'Anonymous',
        'author_url': author.get('url') or None,
        'message': unwrap_links(post['message']),
        'deleted': post.get('isDeleted', False),
    }


def main():
    os.makedirs(COMMENTS_DIR, exist_ok=True)
    truncated = []
    total = 0

    for filename in sorted(os.listdir(POSTS_DIR)):
        if not filename.endswith(('.md', '.markdown')):
            continue
        slug = slug_for(filename)
        data = fetch_thread(slug)
        response = data['response']
        if not isinstance(response, dict):
            # Disqus returns an error string (e.g. "Unable to find thread")
            # for posts that never had a thread.
            print(f'{slug}: skipped ({response})')
            continue
        posts = [simplify(p) for p in response['posts']]
        posts = [p for p in posts if not p['deleted']]
        if posts:
            posts.sort(key=lambda p: p['created_at'])
            path = os.path.join(COMMENTS_DIR, f'{slug}.json')
            with open(path, 'w') as f:
                json.dump(posts, f, indent=2, ensure_ascii=False)
                f.write('\n')
            total += len(posts)
            print(f'{slug}: {len(posts)} comments')
        if data.get('cursor', {}).get('hasNext'):
            truncated.append(slug)
        time.sleep(0.5)

    print(f'\nSaved {total} comments.')
    if truncated:
        print('These threads have more comments than the embed page returns:',
              ', '.join(truncated), file=sys.stderr)


if __name__ == '__main__':
    main()
