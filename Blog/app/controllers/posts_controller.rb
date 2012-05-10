Blog.controllers :posts do
  get :index do
    @posts = Post.all(:order => [:created_at.desc])
    render :"posts/index"
  end

  get :new do
    render :"posts/new"
  end
  
  get :index, :with => [:permalink] do
    @post = Post.first(:permalink => params[:permalink])
    raise Sinatra::NotFound if @post.nil?

    Visit.create({
      :post_id => @post.id,
      :visited => Time.now,
      :ip => request.ip,
      :agent => request.user_agent,
      :referrer => request.referrer
    })

    render :"posts/show"
  end
end
