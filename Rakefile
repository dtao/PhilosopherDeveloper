require File.join(File.dirname(__FILE__), "config", "boot")

require "post"
require "builder"
require "haml"
require "html_truncator"
require "sass"
require "yui/compressor"

# This is for updating all URLs in case the entire site is hosted within a
# subfolder, e.g. for GitHub Pages.
SITE_ROOT = ""

# Get that guy into SASS.
module Sass::Script::Functions
  def site_root
    Sass::Script::String.new(SITE_ROOT)
  end
  declare :site_root, :args => []
end

def read_file(*args)
  File.read(File.join(File.dirname(__FILE__), *args))
end

def read_view_file(*args)
  read_file("app", "views", *args)
end

def read_stylesheet_file(*args)
  read_file("app", "stylesheets", *args)
end

def write_file(*args)
  File.open(File.join(File.dirname(__FILE__), *args), "w") do |io|
    io.write(yield)
  end
end

def compile_post(post, filename=nil)
  post_haml   = read_view_file("post.haml")
  post_html   = Haml::Engine.new(post_haml).render(Object.new, :post => post)
  layout_haml = read_view_file("layouts", "application.haml")

  extra_javascript = if post.has_custom_javascript?
    haml = read_file(*post.local_javascript_path)
    Haml::Engine.new(haml).render(Object.new)
  else
    ""
  end

  # Render w/ final layout using HAML.
  final_html = Haml::Engine.new(layout_haml).render(Object.new, :title => post.title, :post => post, :extra_javascript => extra_javascript) do
    post_html
  end

  # Save that puppy to file!
  filename ||= File.join("posts", "#{post.identifier}.html")
  write_file("public", filename) { final_html }

  # Also compile any custom stylesheets that are only for this post.
  if post.has_custom_stylesheet?
    compile_stylesheet_from_sass(read_file(*post.local_stylesheet_path), post.identifier)
  end
end

def compile_index(posts, page_number, next_page_number=nil)
  posts_haml  = read_view_file("posts.haml")
  posts_html  = Haml::Engine.new(posts_haml).render(Object.new, :posts => posts, :next_page => next_page_number)
  layout_haml = read_view_file("layouts", "application.haml")

  extra_javascript = posts.select(&:has_custom_javascript?).inject("") do |s, p|
    haml = read_file(*p.local_javascript_path)
    s << Haml::Engine.new(haml).render(Object.new)
  end

  # Hack! Prepend jQuery to extra JS if it isn't already in there.
  unless extra_javascript.include?("jquery-1.9.1.min.js")
    extra_javascript = "<script type='text/javascript' src='#{SITE_ROOT}/javascripts/jquery-1.9.1.min.js'></script>" + extra_javascript
  end

  # Include posts.js in these pages.
  # BTW, seriously, WTF am I doing?
  extra_javascript = [
    extra_javascript,
    "<script type='text/javascript' src='#{SITE_ROOT}/javascripts/posts.js'></script>"
  ].join("\n")

  # Render w/ final layout using HAML.
  final_html = Haml::Engine.new(layout_haml).render(Object.new, :post => nil, :extra_javascript => extra_javascript) do
    posts_html
  end

  # Save that puppy to file!
  page_number = page_number > 0 ? page_number + 1 : nil
  write_file("public", "index#{page_number}.html") { final_html }
end

def compile_about
  about_post = Post.new("about", {
    "title" => "Dan Tao",
    "date"  => Date.parse("2013-01-24")
  })

  about_post.include_social_links = false
  about_post.allow_comments = false

  compile_post(about_post, "about.html")
end

def compile_posts_index
  layout_haml = read_view_file("layouts", "application.haml")
  index_haml  = read_view_file("index.haml")
  index_html  = Haml::Engine.new(index_haml).render(Object.new, :posts => Post.all_by_period)
  final_html  = Haml::Engine.new(layout_haml).render(Object.new, :title => "All Posts", :post => nil) { index_html }

  write_file("public", "posts", "index.html") { final_html }
end

def compile_stylesheets
  sass = [
    read_stylesheet_file("application.sass"),
    read_stylesheet_file("application.responsive.sass")
  ].join("\n")

  compile_stylesheet_from_sass(sass, "application")
end

def compile_stylesheet_from_sass(sass, filename)
  css = Sass.compile(sass, :syntax => :sass)
  css = YUI::CssCompressor.new.compress(css)
  write_file("public", "stylesheets", "#{filename}.css") { css }
end

# Set the README file to the most recent blog post (this is basically just for
# someone who takes a gander at the repo on GitHub.)
def update_readme
  post = Post.latest

  post_content = <<-EOS.unindent
    The following is the most recent post from my blog, **The Philosopher Developer**, written on #{post.friendly_date}.
    
    ***
    
    #{post.title}
    #{'=' * post.title.length}
  EOS

  write_file("README.md") { [post_content, read_file(*post.local_path)].join("\n") }
end

def build_xml
  builder = Builder::XmlMarkup.new
  yield builder
  builder.target!
end

namespace :compile do
  desc "Compile everything"
  task :all do
    Rake::Task["compile:html"].invoke()
    Rake::Task["compile:rss"].invoke()
  end

  desc "Compile static website"
  task :html do
    Post.load_all(File.join(File.dirname(__FILE__), "config", "posts.yml"))
    Post.each { |post| compile_post(post) }

    pages = Post.all.each_slice(5).to_a
    pages.each_with_index do |posts, i|
      compile_index(posts, i,  (i < pages.count - 1) ? i + 1 : nil)
    end

    compile_about()
    compile_posts_index()
    compile_stylesheets()
    update_readme()
  end

  desc "Compile RSS feed"
  task :rss do
    # Basically stolen from http://recipes.sinatrarb.com/p/views/rss
    rss = build_xml do |xml|
      xml.instruct! :xml, :version => "1.0"
      xml.rss :version => "2.0" do
        xml.channel do
          xml.title "The Philosopher Developer"
          xml.description "Dan Tao's blog, The Philosopher Developer"
          xml.link "http://philosopherdeveloper.com/"

          Post.all.take(10).each do |post|
            xml.item do
              xml.title post.title
              xml.link "http://philosopherdeveloper.com/posts/#{CGI.escape(post.identifier)}.html"
              xml.description { xml.cdata!(post.to_html(:feed => true)) }
              xml.pubDate post.date.rfc822()
              xml.guid "http://philosopherdeveloper.com/posts/#{CGI.escape(post.identifier)}.html"
            end
          end
        end
      end
    end

    write_file("public", "feedburner.xml") { rss }
  end
end
