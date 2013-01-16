class Blog < Padrino::Application
  register SassInitializer
  register Padrino::Rendering
  register Padrino::Mailer
  register Padrino::Helpers
  register Sinatra::Glorify

  enable :sessions

  Tilt.prefer Sinatra::Glorify::Template

  get "/" do
    redirect("/posts/latest")
  end
end
