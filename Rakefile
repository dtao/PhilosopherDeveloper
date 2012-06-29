require File.join(File.dirname(__FILE__), "config", "boot")

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
