Blog.controllers :posts do
  get :index do
    @posts = Post.all
    render :"posts/index"
  end

  get :index, :with => [:post_id] do
    @post = Post.get(params[:post_id].to_i)
    raise Sinatra::NotFound if @post.nil?
    render :"posts/show"
  end

  get :new do
    render :"posts/new"
  end
end
