source :rubygems

# Server requirements
gem "foreman"
gem "thin"

# Project requirements
gem "sinatra"

group :development do
  gem "builder"
  gem "haml"
  gem "html_truncator"
  gem "maruku", :git => "git://github.com/bhollis/maruku.git"
  gem "nokogiri"
  gem "pygments.rb"
  gem "rake"
  gem "sass"
  gem "yui-compressor"
end

group :test do
  gem "rspec", :group => "test"
  gem "rack-test", :group => "test", :require => "rack/test"
end
