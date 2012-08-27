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

  get "/*" do |identifier|
    @post = Post.get(identifier)
    render :post
  end
end
