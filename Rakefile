require "builder"
require "benchmark"

def measure(description, &block)
  puts "#{description}..."
  measurement = Benchmark.measure(&block)
  puts "    => took #{'%0.2f' % measurement.total} seconds"
end

def build_xml
  builder = Builder::XmlMarkup.new
  yield builder
  builder.target!
end

def report(message)
  before, after = message.split(/\=>\s*/, 2)

  begin
    print before; STDOUT.flush
    yield
    puts after || 'Done.'
  rescue Exception => e
    puts "Failed! #{e.message}"
  end
end

namespace :compile do
  desc "Compile RSS feed"
  task :rss do
    measure("Compiling RSS") do
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
end

desc "Update posts w/ frontmatter for Middleman"
task :update_posts do
  posts_data = YAML.load_file('config/posts.yml')

  posts_data.each do |permalink, post_data|
    post_path = "source/posts/#{permalink}.markdown"

    post_file = File.read(post_path)

    post_content = [

      '---',
      "title: #{post_data['title']}",
      "date: #{post_data['date']}",
      "published: #{post_data['published']}",
      '---',
      '',
      post_file

    ].join("\n")

    report "Updating #{post_path}... => Done." do
      File.open(post_path, 'w') do |f|
        f.write(post_content)
      end
    end
  end
end
