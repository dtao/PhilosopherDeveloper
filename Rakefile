require "date"

require File.join(File.dirname(__FILE__), "config", "boot")

def month_from_abbreviation(abbr)
  case abbr.downcase
  when "jan" then 1
  when "feb" then 2
  when "mar" then 3
  when "apr" then 4
  when "may" then 5
  when "jun" then 6
  when "jul" then 7
  when "aug" then 8
  when "sep" then 9
  when "oct" then 10
  when "nov" then 11
  when "dec" then 12
  end
end

def path_to(filename)
  File.join(File.dirname(__FILE__), filename)
end

namespace :db do
  desc "Clear the database out"
  task :clear do
    DataMapper.auto_migrate!
    puts "Database cleared."
  end

  desc "Update the database without deleting existing records"
  task :update do
    DataMapper.auto_upgrade!
    puts "Database updated."
  end

  desc "Take all the posts in the posts/ folder and add them to the database"
  task :import_posts do
    Dir.glob("posts/*.markdown").each do |filename|
      date_and_title = filename.match(/posts\/(\d{4})\-(\w{3})\-(\d{2})\s*(.*)/)
      if date_and_title
        year, month_abbr, day, name = date_and_title[1..4]

        created_at = Date.new(year.to_i, month_from_abbreviation(month_abbr), day.to_i)
        title = name.chomp(".markdown")
        permalink = title.downcase.gsub(/\s+/, "-")
        content = File.read(path_to(filename))

        post = Post.first(:permalink => permalink)
        if post.nil?
          post = Post.create({
            :created_at => created_at,
            :title => title,
            :permalink => permalink,
            :content => content
          })
          puts "Created post '#{title}' (#{post.id})"
        else
          puts "Skipped post '#{title}' because it already existed."
        end
      end
    end
  end
end
