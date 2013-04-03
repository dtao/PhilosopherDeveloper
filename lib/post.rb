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
      all_posts.select(&:published).sort { |x, y| y.date.to_time <=> x.date.to_time }.freeze
    end

    @@table ||= @@posts.inject({}) do |hash, post|
      hash[post.identifier] = post; hash
    end

    @@posts_by_month  ||= @@posts.group_by(&:month)
    @@posts_by_period ||= @@posts.group_by(&:period)

    @@months  ||= @@posts_by_month.keys.sort.reverse
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

  def local_path
    ["app", "views", "posts", "#{self.identifier}.markdown"]
  end

  def to_html(max_length=nil)
    fragment = get_html_fragment(max_length)
    resize_images(fragment)
    style_images(fragment)
    do_syntax_highlighting(fragment)
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

  def get_html_fragment(max_length=nil)
    # Get raw post in MMD format.
    markdown = File.read(File.join(SINATRA_ROOT, "app", "views", "posts", "#{self.identifier}.markdown"))
    markdown.gsub!(/\b\-{2}\b/, "&mdash;")

    # Translate to HTML w/ Maruku.
    raw_html = Maruku.new(markdown).to_html

    if max_length
      raw_html = HTML_Truncator.truncate(raw_html, max_length, {
        :ellipsis => " <span class=\"post-link\">... (<a href=\"#{link}\">read the full post</a>)</span>"
      })
    end

    Nokogiri::HTML.fragment(raw_html)
  end

  def resize_images(html)
    html.css("img").each do |node|
      src = node["src"]

      # I can only work w/ my own images.
      if !src.start_with?("/")
        next
      end

      filename = File.join(SINATRA_ROOT, "public", src)
      img = Magick::Image.read(filename).first

      # Aim for no larger than 640 wide x 480 tall.
      max_dimensions = [640, 480]

      # But if it's a portrait image, we'll do 300 x 400 instead.
      if img.rows > img.columns
        max_dimensions.reverse!
      end

      # Check if we've already resized this image.
      if img.columns <= max_dimensions[0] && img.rows <= max_dimensions[1]
        next
      end

      puts "Resizing #{filename}..."
      ext = File.extname(filename)

      # Save the original.
      img.write("#{filename.chomp(ext)}.orig#{ext}")

      # Create the resized version.
      thumb = img.resize_to_fit(*max_dimensions)
      thumb.write(filename)
    end
  end

  def style_images(html)
    html.css("img").each do |node|
      p = node.parent
      p.name = "figure"
      alt = node["alt"]
      if alt
        caption = Nokogiri::XML::Node.new("figcaption", html)
        caption.content = alt
        p.children.last.add_next_sibling(caption)
      end
    end
  end

  def do_syntax_highlighting(html)
    html.css("code").each do |node|
      node = node.parent
      language = node["lang"]
      if language
        replacement = Nokogiri::HTML::fragment(Pygments.highlight(node.content, :lexer => language))
        node.replace(replacement)
      end
    end
  end
end
