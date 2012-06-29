require "yaml"

class Post
  def self.load_all
    @@table ||= {}

    YAML.load_file(File.join(PADRINO_ROOT, "config", "posts.yml")).tap do |posts|
      posts.each do |id, info|
        @@table[id] = Post.new(id, info)
      end
    end

    # Order from newest to oldest.
    @@all = @@table.values.sort { |x, y| y.date <=> x.date }.freeze
  end

  def self.all
    @@all
  end

  def self.most_recent
    @@all.first
  end

  def self.get(id)
    @@table[id]
  end

  attr_reader :date, :id, :title, :text
  attr_accessor :rendered_html

  def published?
    @published
  end

  def visit!(request)
    date = Time.now.utc

    visits = PostVisits.first_or_create(:date => date, :post_id => @id)
    visits.count += 1
    visits.save

    referrers = Referrers.first_or_create(:date => date, :referrer => request.referrer)
    referrers.count += 1
    referrers.save
  end

  private
  def initialize(id, info)
    @id = id
    @date = info["date"]
    @title = info["title"]
    @text = File.read(File.join(PADRINO_ROOT, "posts", "#{@date} #{@title}.markdown"))
    @published = info["published"]
  end
end
