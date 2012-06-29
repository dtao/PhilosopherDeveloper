class Post
  POSTS_ROOT = File.join(PADRINO_ROOT, "posts")

  @@all = {}

  def self.load_all
    Dir.glob(File.join(POSTS_ROOT, "*.markdown")).each do |file_path|
      post = Post.new(File.basename(file_path))
      @@all[post.id] = post
    end
  end

  def self.get(id)
    @@all[id]
  end

  attr_reader :date, :id, :title, :text
  attr_accessor :rendered_html

  private
  def initialize(file)
    date, title = file.match(/(\d{4}-\w{3}-\d{2}) (.*)\.markdown/)[1, 2]
    year, month_abbr, day = date.split("-")

    @date = Date.new(year.to_i, month_from_abbreviation(month_abbr), day.to_i)
    @title = title
    @id = @title.downcase.gsub(/\s+/, "-")
    @text = File.read(File.join(POSTS_ROOT, file))
  end

  def month_from_abbreviation(abbr)
    case abbr.downcase
    when "jan" then 1
    when "feb" then 2
    when "mar" then 3
    when "apr" then 4
    when "may" then 5
    when "jun" then 6
    when "jul" then 7
    when "aug" then 8
    when "sep" then 9
    when "oct" then 10
    when "nov" then 11
    when "dec" then 12
    end
  end
end
