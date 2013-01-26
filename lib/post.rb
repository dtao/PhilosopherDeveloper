require "maruku"
require "nokogiri"
require "pygments"
require "yaml"

class Post
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

    @@posts_by_month ||= @@posts.group_by(&:month)
    @@posts_by_period ||= @@posts.group_by(&:period)

    @@months ||= @@posts_by_month.keys.sort.reverse
    @@periods ||= @@posts_by_period.keys.sort.reverse
  end

  def self.all
    @@posts
  end

  def self.each
    @@posts.each do |post|
      yield post
    end
  end

  def self.all_by_month
    @@months.map do |month|
      [month, @@posts_by_month[month]]
    end
  end

  def self.all_by_period
    @@periods.map do |period|
      [period, @@posts_by_period[period]]
    end
  end

  def self.latest
    @@posts.first
  end

  def self.get(identifier)
    @@table[identifier]
  end

  def self.friendly_month(date)
    date.strftime("%B %Y")
  end

  def self.friendly_period(date)
    case date.month
    when 3
      "Spring #{date.year}"
    when 6
      "Summer #{date.year}"
    when 9
      "Fall #{date.year}"
    when 12
      "Winter #{date.year} - #{date.year + 1}"
    end
  end

  attr_reader :identifier, :date, :title, :published
  attr_accessor :allow_comments

  def comments
    Comment.all(:post_identifier => self.identifier)
  end

  def month
    Date.new(@date.year, @date.month, 1)
  end

  def period
    year = @date.month > 2 ? @date.year : @date.year - 1
    Date.new(year, MONTHS_TO_PERIODS[@date.month], 1)
  end

  def friendly_date
    @date.strftime("%B %d, %Y")
  end

  def link
    "/posts/#{CGI.escape(self.identifier)}.html"
  end

  def to_html(max_length=nil)
    # Get raw post in MMD format.
    markdown = File.read(File.join(SINATRA_ROOT, "app", "views", "posts", "#{self.identifier}.markdown"))
    markdown.gsub!(/\b\-{2}\b/, "&mdash;")

    # Translate to HTML w/ Maruku.
    post_body_html = Maruku.new(markdown).to_html

    if max_length
      post_body_html = HTML_Truncator.truncate(post_body_html, max_length, {
        :ellipsis => ' <span class="post-link">... (<a href="#{link}">read the full post</a>)</span>'
      })
    end

    # Parse and do syntax highlighting of code blocks w/ Pygments.
    fragment = Nokogiri::HTML.fragment(post_body_html)
    fragment.css("code").each do |node|
      node = node.parent
      language_attr = node.attribute("lang")
      if language_attr
        language = language_attr.value
        replacement = Nokogiri::HTML::fragment(Pygments.highlight(node.content, :lexer => language))
        node.replace(replacement)
      end
    end

    fragment.inner_html
  end

  private
  def initialize(identifier, info)
    @identifier = identifier
    @date = info["date"]
    @title = info["title"]
    @published = info["published"]
    @allow_comments = true
  end
end
