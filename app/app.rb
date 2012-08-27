class Blog < Padrino::Application
  register SassInitializer
  register Padrino::Rendering
  register Padrino::Mailer
  register Padrino::Helpers

  enable :sessions

  get "/" do
    @post = Post.most_recent
    render :post
  end

  get "/", :with => :identifier do
    @post = Post.get(params[:identifier])
    render :post
  end
end
