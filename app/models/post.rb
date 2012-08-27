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
  end

  def self.each
    @@posts.each do |post|
      yield post
    end
  end

  def self.most_recent
    @@posts.first
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
