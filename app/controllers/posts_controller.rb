Blog.controllers :posts do
  get :index do
    @posts = Post.all.select(&:published?)
    render :"posts/index"
  end

  get :index, :with => [:id] do
    @post = Post.get(params[:id])

    raise Sinatra::NotFound if @post.nil?

    @post.visit!(request)

    render :"posts/show"
  end
end
