module PostHelper
  def render_post_title_as_link(post)
    %Q{<a href="/posts/#{post.id}">#{post.title}</a>}
  end

  def render_post_content(post)
    post.rendered_html ||= render_post_html(post)
  end

  def render_post_html(post)
    markdown(post.text).gsub("--", "&mdash;")
  end
end

Blog.helpers do
  include PostHelper
end
