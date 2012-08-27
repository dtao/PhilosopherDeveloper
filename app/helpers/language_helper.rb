module LanguageHelper
  def noun(noun, count)
    count == 1 ? "1 #{noun}" : "#{count} #{noun.pluralize}"
  end
end

Blog.helpers do
  include LanguageHelper
end
