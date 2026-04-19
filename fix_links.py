import os
import glob
import re

base_dir = 'c:/Users/prave/TechPavitra/labs'
html_files = glob.glob(os.path.join(base_dir, '**/*.html'), recursive=True)

for filepath in html_files:
    # Calculate depth inside labs directory
    rel_path = os.path.relpath(filepath, base_dir)
    rel_dir = os.path.dirname(rel_path)
    
    if rel_dir == '':
        depth = 0
    else:
        depth = rel_dir.count(os.sep) + 1

    prefix = '../' * depth if depth > 0 else './'

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    def replacer(match):
        attr = match.group(1) # href or src
        path = match.group(2) # e.g. /assets/styles.css or /services/
        
        if path == '/':
            return f'{attr}="{prefix}index.html"'

        # Remove leading slash
        path = path[1:]
        
        if path.endswith('/'):
            # It's a directory link, append index.html
            return f'{attr}="{prefix}{path}index.html"'
        else:
            return f'{attr}="{prefix}{path}"'

    new_content = re.sub(r'(href|src)="(/.*?)"', replacer, content)
    
    # Let's also fix the ones with trailing slashes that don't start with / but end with / 
    # Actually wait, all links start with / based on my earlier checks.

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {rel_path}')
print('Done.')
