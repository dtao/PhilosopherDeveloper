# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard "less", :all_on_start => true, :all_after_change => true, :output => "public/stylesheets" do
  watch(%r{^app/stylesheets/(.+\.less)$})
end

guard "sass", :all_on_start => true, :output => "public/stylesheets" do
  watch(%r{^app/stylesheets/(.+\.sass)$})
end
