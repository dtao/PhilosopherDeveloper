source 'https://rubygems.org'

ruby '2.0.0'

gem 'middleman', '~>3.1.5'

# Live-reloading plugin
gem 'middleman-livereload', '~> 3.1.0'

# Blogging plugin
gem 'middleman-blog'

# Hosting on GitHub Pages
gem 'middleman-gh-pages'

# Syntax highlighting
gem 'middleman-syntax', :github => 'middleman/middleman-syntax', :branch => 'master'

# Required for Ruby >= 2.2.0
gem 'eventmachine', '~> 1.0.4'

# Need this for RSS
gem 'builder'

# Bourbon & Neat for styling
gem 'middleman-bourbon'
gem 'middleman-neat'

# Redcarpet for Markdown
gem 'redcarpet', :github => 'vmg/redcarpet'

# Required for blog post summaries
gem 'nokogiri'

# Required for syntax highlighting
gem 'pygments.rb'

# For faster file watcher updates on Windows:
gem 'wdm', '~> 0.1.0', :platforms => [:mswin, :mingw]

# Cross-templating language block fix for Ruby 1.8
platforms :mri_18 do
  gem 'ruby18_source_location'
end
