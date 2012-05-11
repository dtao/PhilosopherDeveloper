Blog.controllers :posts do
  get :index do
    @posts = Post.all(:order => [:created_at.desc])
    render :"posts/index"
  end

  post :index do
    title = params["title"]
    permalink = title.downcase.gsub(/\s+/, "-")

    Post.create({
      :created_at => Time.now,
      :title => title,
      :permalink => permalink,
      :content => params["content"],
      :published => true
    })

    redirect "/posts"
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

  delete :index, :with => [:permalink] do
    post = Post.first(:permalink => params[:permalink])
    
    if post
      title = post.title
      post.destroy!
      "Deleted post '#{title}'"
    else
      "Unable to find post"
    end
  end
end
