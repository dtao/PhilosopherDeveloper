class Blog < Padrino::Application
  register SassInitializer
  register Padrino::Rendering
  register Padrino::Mailer
  register Padrino::Helpers

  enable :sessions

  get "/" do
    @post = Post.most_recent
    raise Sinatra::NotFound if @post.nil?
    render :"posts/show", :post_id => @post.id
  end

  not_found do
    render :not_found, :layout => :application
  end
end
