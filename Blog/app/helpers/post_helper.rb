module PostHelper
  def render_post_created_at(post)
    %Q{#{format_date(post.created_at)} <span class="post-time">#{format_time(post.created_at)}</span>}
  end

  def render_post_title_as_link(post)
    %Q{<a href="/posts/#{post.permalink}">#{post.title}</a>}
  end

  def render_post_published(post)
    post.published ? %Q{<i class="icon-ok"></i>} : ""
  end

  def render_post_content(post)
    html = markdown(post.content)
    html.gsub("--", "&mdash;")
  end
end

Blog.helpers do
  include PostHelper
end
