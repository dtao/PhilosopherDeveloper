source :rubygems

# Server requirements
gem "thin"

# Project requirements
gem "rake"
gem "sinatra-flash", :require => "sinatra/flash"

# Component requirements
gem "haml"
gem "redcarpet"
gem "sass"
gem "dm-sqlite-adapter"
gem "dm-validations"
gem "dm-timestamps"
gem "dm-migrations"
gem "dm-constraints"
gem "dm-aggregates"
gem "dm-core"

# Padrino Stable Gem
gem "padrino", "0.10.6"

group :development do
  gem "guard"
  gem "guard-less"
  gem "guard-sass"
  gem "heroku"
end

group :test do
  gem "rspec", :group => "test"
  gem "rack-test", :group => "test", :require => "rack/test"
end
