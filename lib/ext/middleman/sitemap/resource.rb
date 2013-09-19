class Middleman::Sitemap::Resource
  MONTHS_TO_PERIODS = {
    1  => 12,
    2  => 12,
    3  => 3,
    4  => 3,
    5  => 3,
    6  => 6,
    7  => 6,
    8  => 6,
    9  => 9,
    10 => 9,
    11 => 9,
    12 => 12
  }

  def period_date
    year = date.month > 2 ? date.year : date.year - 1
    Date.new(year, MONTHS_TO_PERIODS[date.month], 1)
  end

  def friendly_date
    date.strftime('%B %d, %y')
  end

  def friendly_period
    reference_date = self.period_date

    case reference_date.month
    when 3
      "Spring #{reference_date.year}"
    when 6
      "Summer #{reference_date.year}"
    when 9
      "Fall #{reference_date.year}"
    when 12
      "Winter #{reference_date.year} - #{reference_date.year + 1}"
    end
  end
end
