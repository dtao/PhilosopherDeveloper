Blog.helpers do
  def render_post_content(post)
    html = markdown(post.content)
    html.gsub("--", "&mdash;")
  end
end
