require "yaml"

class Post
  def self.load_all(yaml_file)
    @@posts ||= begin
      all_posts = []

      YAML.load_file(yaml_file).tap do |posts|
        posts.each do |identifier, info|
          all_posts << Post.new(identifier, info)
        end
      end

      # Order from newest to oldest.
      all_posts.select(&:published).sort { |x, y| y.date <=> x.date }.freeze
    end

    @@table ||= @@posts.inject({}) do |hash, post|
      hash[post.identifier] = post
      hash
    end

    @@posts_by_month ||= @@posts.group_by { |p| Date.new(p.date.year, p.date.month, 1) }

    @@months ||= @@posts_by_month.keys.sort.reverse
  end

  def self.each
    @@posts.each do |post|
      yield post
    end
  end

  def self.by_month
    @@months.each do |month|
      yield [month, @@posts_by_month[month]]
    end
  end

  def self.most_recent
    @@posts.first
  end

  def self.get(identifier)
    @@table[identifier]
  end

  attr_reader :identifier, :date, :title, :published

  private
  def initialize(identifier, info)
    @identifier = identifier
    @date = info["date"]
    @title = info["title"]
    @published = info["published"]
  end
end
