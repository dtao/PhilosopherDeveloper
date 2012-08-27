require "md5"

module CommentsHelper
  def comment_header(comment)
    email = comment.reader_email || ""
    hash  = MD5.new(email.strip.downcase).hexdigest
    url   = "http://www.gravatar.com/avatar/#{hash}?s=50&d=identicon"
    time  = comment.created_at.strftime("%B %d, %Y")
    %Q{<img src="#{url}" /> <span class="reader-name">#{comment.reader_name}</span> <span class="comment-time">#{time}</span>}
  end
end

Blog.helpers do
  include CommentsHelper
end
