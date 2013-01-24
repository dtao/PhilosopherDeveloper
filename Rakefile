require File.join(File.dirname(__FILE__), "config", "boot")

require "haml"
require "maruku"

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
  Dir.glob(File.join(File.dirname(__FILE__), "app", "views", "posts", "*.markdown")).each do |file|
    markdown = File.read(file)
    html = Maruku.new(markdown).to_html

    html_file_name = "#{File.basename(file, '.markdown')}.html"
    File.open(File.join(File.dirname(__FILE__), "public", "posts", html_file_name), "w") do |io|
      io.write(html)
    end
  end
end
