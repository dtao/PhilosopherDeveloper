Blog.controllers :posts do
  get :index do
    @posts = Post.all_by_period
    render :index
  end

  get :latest do
    @post = Post.latest
    render :post
  end

  get :index, :with => :identifier do
    @post = Post.get(params[:identifier])
    render :post
  end
end
