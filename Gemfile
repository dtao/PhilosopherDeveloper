source :rubygems

# Server requirements
gem "eventmachine"
gem "thin"
gem "ffi", "~> 1.1.5", :platform => :mingw
gem "foreman"

# Project requirements
gem "rake"
gem "sinatra-flash", :require => "sinatra/flash"

# Component requirements
gem "haml"
gem "maruku", :git => "git://github.com/bhollis/maruku.git"
gem "nokogiri"
gem "pygments.rb"
gem "sass"
gem "dm-validations"
gem "dm-timestamps"
gem "dm-migrations"
gem "dm-constraints"
gem "dm-aggregates"
gem "dm-core"

# Padrino Stable Gem
gem "padrino", "0.10.6"

group :production do
  gem "dm-postgres-adapter"
end

group :development do
  gem "dm-sqlite-adapter"
  gem "guard", :platform => :ruby
  gem "guard-less", :platform => :ruby
  gem "guard-sass", :platform => :ruby
  gem "shotgun"
end

group :test do
  gem "rspec", :group => "test"
  gem "rack-test", :group => "test", :require => "rack/test"
end
