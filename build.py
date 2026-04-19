import os
import shutil

src_dir = 'c:/Users/prave/TechPavitra/labs'
dist_dir = os.path.join(src_dir, 'dist')

print('Starting production build process...')

if os.path.exists(dist_dir):
    print(f'Cleaning previous build in {dist_dir}...')
    shutil.rmtree(dist_dir)
os.makedirs(dist_dir)

# Folders to copy
folders = ['assets', 'about', 'contact', 'pricing', 'process', 'services', 'work']
for folder in folders:
    src = os.path.join(src_dir, folder)
    dest = os.path.join(dist_dir, folder)
    if os.path.exists(src):
        shutil.copytree(src, dest)
        print(f'Copied /{folder}')

# Files to copy
files = ['index.html']
for file in files:
    src = os.path.join(src_dir, file)
    dest = os.path.join(dist_dir, file)
    if os.path.exists(src):
        shutil.copy(src, dest)
        print(f'Copied {file}')

# GitHub Pages requires .nojekyll to not process standard Jekyll features
with open(os.path.join(dist_dir, '.nojekyll'), 'w') as f:
    f.write('')
print('Created .nojekyll for GitHub Pages compatibility.')

# Cloudflare static caching headers
cloudflare_headers = """/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n"""
with open(os.path.join(dist_dir, '_headers'), 'w') as f:
    f.write(cloudflare_headers)
print('Created _headers for Cloudflare caching performance.')

print('Production build successfully generated in /dist directory.')
