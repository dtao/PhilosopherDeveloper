require "haml"
require "sinatra"

require File.join(File.dirname(__FILE__), "lib", "post")

helpers do
  def posts_from_fs
    if @posts.nil?
      post_dirs = Dir.entries(".").select { |dir| dir.match /\d{4}\-\w{3}\-\d{2} .*/ }
      post_titles = post_dirs.map { |post_dir| post_dir[12..-1] }
      @posts = post_titles.map { |title| Post.new(title) }
    end

    @posts
  end

  def post_from_title(post_id)
    posts_from_fs.find { |post| post.id == post_id }
  end
end

get "/" do
  puts "Normal get!"
  @posts = posts_from_fs
  haml :index
end

get "/*" do |post_id|
  puts "Post Id: #{post_id}"
  @posts = posts_from_fs
  @post = post_from_title(post_id)
  puts "Post: #{@post}"
  haml :index
end