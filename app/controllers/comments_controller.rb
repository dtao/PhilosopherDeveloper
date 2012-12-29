Blog.controllers :comments do
  post :index, :with => :identifier, :provides => :json do
    identifier = params[:identifier]

    if identifier.blank?
      identifier = Post.most_recent.identifier
    end

    comment = Comment.create({
      :post_identifier => identifier,
      :reader_name => params["name"],
      :reader_email => params["email"],
      :text => params["text"]
    })

    redirect "/#{identifier}"
  end
end
