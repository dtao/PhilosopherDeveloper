require 'find'
require 'redcarpet'

if ARGV.size < 1
  puts "Give me a date! E.g., #{__FILE__} 2012-Jan-27"
  exit 0
end

date = ARGV[0]
dir = Find.find(".").find { |f| File.basename(f).start_with?(date) }
file = File.join dir, "post.markdown"

File.open(File.join("dist", File.basename(dir) + ".html"), "w") do |io|
  io.write Redcarpet::Markdown.new(Redcarpet::Render::HTML).render(File.read(file))
end