site: python -m http.server --directory build 8080
builder: python site/build.py source build && watchmedo shell-command --recursive --ignore-directories --wait -c 'python site/build.py source build' source site
