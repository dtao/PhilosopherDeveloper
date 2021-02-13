site: python -m http.server --directory build 8080
builder: watchmedo shell-command -p 'source/**/*;site/**/*' -i 'README.md' -c 'python site/build.py source build'
