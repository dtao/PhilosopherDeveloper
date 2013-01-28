require "rack-canonical-host"
require "sinatra"

get "/" do
  redirect("/index.html")
end

get "/posts" do
  redirect("/posts/index.html")
end

get "/about" do
  redirect("/about.html")
end
