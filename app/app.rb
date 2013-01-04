class Blog < Padrino::Application
  register SassInitializer
  register Padrino::Rendering
  register Padrino::Mailer
  register Padrino::Helpers
  register Sinatra::Glorify

  enable :sessions

  Tilt.prefer Sinatra::Glorify::Template

  get "/index" do
    @posts = Post.all_by_period
    render :index
  end

  get "/" do
    return redirect("/#{Post.most_recent.identifier}")
  end

  get "/", :with => :identifier do
    @post = Post.get(params[:identifier])
    render :post
  end
end
