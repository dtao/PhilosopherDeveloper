class Blog < Padrino::Application
  register SassInitializer
  register Padrino::Rendering
  register Padrino::Mailer
  register Padrino::Helpers

  enable :sessions

  get "/" do
    redirect("/index.html")
  end

  get "/posts" do
    redirect("/posts/index.html")
  end
end
