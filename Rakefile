require File.join(File.dirname(__FILE__), "config", "boot")

require "haml"
require "maruku"
require "nokogiri"
require "pygments"

def read_view_file(*args)
  File.read(File.join(File.dirname(__FILE__), "app", "views", *args))
end

def compile_post(post, filename=nil)
  layout_haml = read_view_file("layouts", "application.haml")
  post_haml   = read_view_file("post.haml")

  # Get raw post in MMD format.
  markdown = read_view_file("posts", "#{post.identifier}.markdown").gsub(/\b\-\-\b/, "&mdash;")

  # Translate to HTML w/ Maruku.
  post_body_html = Maruku.new(markdown).to_html

  # Parse and do syntax highlighting of code blocks w/ Pygments.
  document = Nokogiri::HTML.parse(post_body_html)
  document.css("code").each do |node|
    node = node.parent
    language_attr = node.attribute("lang")
    if language_attr
      language = language_attr.value
      replacement = Nokogiri::HTML::fragment(Pygments.highlight(node.content, :lexer => language))
      node.replace(replacement)
    end
  end

  # The HAML library's got a weird-ass interface.
  post_html = Haml::Engine.new(post_haml).render(Object.new, :post => post) do
    document.to_html
  end

  # Render w/ final layout using HAML.
  final_html = Haml::Engine.new(layout_haml).render do
    post_html
  end

  # Save that puppy to file!
  filename ||= File.join("posts", "#{post.identifier}.html")
  File.open(File.join(File.dirname(__FILE__), "public", filename), "w") do |io|
    io.write(final_html)
  end
end

def compile_index
  layout_haml = read_view_file("layouts", "application.haml")
  index_haml  = read_view_file("index.haml")
  index_html  = Haml::Engine.new(index_haml).render(Object.new, :posts => Post.all_by_period)
  final_html  = Haml::Engine.new(layout_haml).render { index_html }

  File.open(File.join(File.dirname(__FILE__), "public", "posts", "index.html"), "w") do |io|
    io.write(final_html)
  end
end

namespace :db do
  desc "Reset the database out"
  task :reset do
    DataMapper.auto_migrate!
    puts "Database reset."
  end

  desc "Update the database without deleting existing records"
  task :update do
    DataMapper.auto_upgrade!
    puts "Database updated."
  end
end

desc "Compile static website"
task :compile do
  Post.each { |post| compile_post(post) }
  compile_post(Post.latest, "index.html")
  compile_index()
end
