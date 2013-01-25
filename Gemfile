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
gem "sass"

# Padrino Stable Gem
gem "padrino", "0.10.6"

group :development do
  gem "builder"
  gem "haml"
  gem "maruku", :git => "git://github.com/bhollis/maruku.git"
  gem "nokogiri"
  gem "pygments.rb"
end

group :test do
  gem "rspec", :group => "test"
  gem "rack-test", :group => "test", :require => "rack/test"
end
