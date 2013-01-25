require File.join(File.dirname(__FILE__), "config", "boot")

require "builder"
require "haml"
require "maruku"

def read_view_file(*args)
  File.read(File.join(File.dirname(__FILE__), "app", "views", *args))
end

def compile_post(post, filename=nil)
  post_haml   = read_view_file("post.haml")
  post_html   = Haml::Engine.new(post_haml).render(Object.new, :post => post)
  layout_haml = read_view_file("layouts", "application.haml")

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

def compile_index(posts)
  posts_haml  = read_view_file("posts.haml")
  posts_html  = Haml::Engine.new(posts_haml).render(Object.new, :posts => posts)
  layout_haml = read_view_file("layouts", "application.haml")

  # Render w/ final layout using HAML.
  final_html = Haml::Engine.new(layout_haml).render do
    posts_html
  end

  # Save that puppy to file!
  File.open(File.join(File.dirname(__FILE__), "public", "index.html"), "w") do |io|
    io.write(final_html)
  end
end

def compile_about
  about_post = Post.new("about", {
    "title" => "Dan Tao",
    "date"  => Date.parse("2013-01-24")
  })

  about_post.allow_comments = false

  compile_post(about_post, "about.html")
end

def compile_posts_index
  layout_haml = read_view_file("layouts", "application.haml")
  index_haml  = read_view_file("index.haml")
  index_html  = Haml::Engine.new(index_haml).render(Object.new, :posts => Post.all_by_period)
  final_html  = Haml::Engine.new(layout_haml).render { index_html }

  File.open(File.join(File.dirname(__FILE__), "public", "posts", "index.html"), "w") do |io|
    io.write(final_html)
  end
end

def build_xml
  builder = Builder::XmlMarkup.new
  yield builder
  builder.target!
end

namespace :compile do
  desc "Compile static website"
  task :html do
    Post.load_all(File.join(File.dirname(__FILE__), "config", "posts.yml"))
    Post.each { |post| compile_post(post) }
    compile_index(Post.all.take(5))
    compile_about()
    compile_posts_index()
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
          xml.link "http://www.philosopherdeveloper.com/"

          Post.each do |post|
            xml.item do
              xml.title post.title
              xml.link "http://www.philosopherdeveloper.com/posts/#{CGI.escape(post.identifier)}.html"
              xml.description { xml.cdata!(post.to_html) }
              xml.pubDate post.date.rfc822()
              xml.guid "http://www.philosopherdeveloper.com/posts/#{CGI.escape(post.identifier)}.html"
            end
          end
        end
      end
    end

    File.open(File.join(File.dirname(__FILE__), "public", "rss.xml"), "w") do |io|
      io.write(rss)
    end
  end
end
