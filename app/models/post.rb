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
      all_posts.sort { |x, y| y.date <=> x.date }.freeze
    end

    @@table ||= begin
      all_posts.inject({}) do |hash, post|
        hash.update(post.identifier => post)
      end
    end
  end

  def self.each
    @@posts.select(&:published).each do |post|
      yield post
    end
  end

  def self.most_recent
    @@posts.first
  end

  def self.get(identifier)
    puts "Looking for post #{identifier}"
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
