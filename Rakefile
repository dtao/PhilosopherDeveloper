require 'middleman-gh-pages'

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
