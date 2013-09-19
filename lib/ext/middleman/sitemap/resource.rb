class Middleman::Sitemap::Resource
  def friendly_date
    self.date.strftime('%B %d, %y')
  end
end
