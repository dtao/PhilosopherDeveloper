require "digest/md5"

module CommentsHelper
  def comment_header(comment)
    email = comment.reader_email || ""
    hash  = Digest::MD5.hexdigest(email.strip.downcase)
    url   = "http://www.gravatar.com/avatar/#{hash}?s=50&d=identicon"
    time  = comment.created_at.strftime("%l:%M %p on %b %d, %Y")
    %Q{<img class="reader-pic" src="#{url}" /> <span class="reader-name">#{comment.reader_name}</span> <span class="comment-time">#{time}</span>}
  end
end

Blog.helpers do
  include CommentsHelper
end
