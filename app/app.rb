class Blog < Padrino::Application
  register SassInitializer
  register Padrino::Rendering
  register Padrino::Mailer
  register Padrino::Helpers
  register Sinatra::Glorify

  enable :sessions

  get "/index" do
  end

  get "/" do
    return redirect("/#{Post.most_recent.identifier}")
  end

  get "/", :with => :identifier do
    @post = Post.get(params[:identifier])
    render :post
  end
end
