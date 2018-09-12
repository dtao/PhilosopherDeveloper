page "/feedburner.xml", :layout => false

Dir.glob(File.join(File.dirname(__FILE__), 'lib/**/*.rb')).each(&method(:require))

activate :blog do |blog|
  blog.paginate  = true
  blog.permalink = "posts/:title.html"
  blog.sources   = "posts/:year-:month-:day-:title.html"
  blog.layout    = "post"
end

activate :bourbon
activate :neat
activate :syntax

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

set :markdown_engine, :redcarpet

set :markdown, {
  :fenced_code_blocks => true,
  :footnotes          => true,
  :tables             => true
}

# Build-specific configuration
configure :build do
  activate :minify_css if environment == :development
  activate :minify_javascript if environment == :development
end
