module DateHelper
  def format_date(date)
    date.strftime("%B %d, %Y")
  end

  def format_time(time)
    time.strftime("%I:%M%p")
  end
end

Blog.helpers do
  include DateHelper
end
