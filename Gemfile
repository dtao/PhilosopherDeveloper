# If you have OpenSSL installed, we recommend updating
# the following line to use "https"
source 'http://rubygems.org'

gem "middleman", "~>3.1.5"

# Live-reloading plugin
gem "middleman-livereload", "~> 3.1.0"

# Blogging plugin
gem "middleman-blog"

# Bourbon & Neat for styling
gem "middleman-bourbon"
gem "middleman-neat"

# Redcarpet for Markdown
gem "redcarpet", ">= 3.0.0"

# Required for blog post summaries
gem "nokogiri"

# For faster file watcher updates on Windows:
gem "wdm", "~> 0.1.0", :platforms => [:mswin, :mingw]

# Cross-templating language block fix for Ruby 1.8
platforms :mri_18 do
  gem "ruby18_source_location"
end
