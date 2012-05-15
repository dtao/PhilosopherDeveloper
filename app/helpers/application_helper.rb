module ApplicationHelper
  def is_admin?(request)
    # Yeah, this is DEFINITELY not what we want long-term.
    # Just a quick hack for now, to prove out the concept of an admin interface!
    request.params.include?("admin")
  end
end

Blog.helpers do
  include ApplicationHelper
end
