import os
import re

base_dir = 'source/posts'
date_pattern = re.compile(r'\d{4}-\d{2}-\d{2}')
date_header_pattern = re.compile(r'date: (%s)' % date_pattern.pattern)

for filename in os.listdir(base_dir):
    if date_pattern.match(filename):
        continue

    filepath = os.path.join(base_dir, filename)
    with open(filepath, 'r') as f:
        date_match = next((match for match in (date_header_pattern.match(line)
                                              for line in f.readlines())
                           if match is not None), None)

        if date_match is None:
            continue

        date = date_match.group(1)

    new_filename = '%s-%s' % (date, filename)
    os.rename(filepath, os.path.join(base_dir, new_filename))
    print('Renamed %s to %s' % (filename, new_filename))
