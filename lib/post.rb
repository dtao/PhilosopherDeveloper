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
      all_posts.sort! { |x, y| y.date.to_time <=> x.date.to_time }

      # Assign 'next' and 'previous' for forward/backward links.
      all_posts.each_with_index do |post, i|
        post.previous = all_posts[i + 1] if i + 1 < all_posts.count
        post.next = all_posts[i - 1] if i - 1 >= 0
      end

      # Make the result immutable (why not?).
      all_posts.freeze
    end

    @@table ||= @@posts.inject({}) do |hash, post|
      hash[post.identifier] = post; hash
    end

    @@posts_by_month  ||= @@posts.select(&:published).group_by(&:month)
    @@posts_by_period ||= @@posts.select(&:published).group_by(&:period)

    @@months  ||= @@posts_by_month.keys.sort.reverse
    @@periods ||= @@posts_by_period.keys.sort.reverse
  end

  def self.all
    @@posts.select(&:published)
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
    @@posts.select(&:published).first
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
  attr_accessor :include_social_links, :allow_comments, :previous, :next

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
    # Yes, this is hacky. Leave me alone.
    self.title == "Dan Tao" ?
      "#{SITE_ROOT}/about.html" :
      "#{SITE_ROOT}/posts/#{CGI.escape(self.identifier)}.html"
  end

  def has_custom_javascript?
    File.exist?(File.join(SINATRA_ROOT, *local_javascript_path))
  end

  def has_custom_stylesheet?
    File.exist?(File.join(SINATRA_ROOT, *local_stylesheet_path))
  end

  def local_path
    ["app", "views", "posts", "#{self.identifier}.markdown"]
  end

  # Yeah, this is kind of misleading because it's really JS *includes* in HTML
  # format rather than a JavaScript file. Let's hope this doesn't confuse me
  # later (whatever, it's just a blog)!
  def local_javascript_path
    ["app", "views", "javascript", "#{self.identifier}.haml"]
  end

  def local_stylesheet_path
    ["app", "stylesheets", "#{self.identifier}.sass"]
  end

  def to_html(options={})
    fragment = get_html_fragment(options[:max_length])
    resize_images(fragment)
    style_images(fragment, options)
    do_syntax_highlighting(fragment)
    fix_absolute_refs(fragment)
    remove_scripts(fragment) if options[:feed]
    remove_footnotes(fragment) if options[:footnotes] == false
    fragment.inner_html
  end

  private
  def initialize(identifier, info)
    @identifier = identifier
    @date = info["date"]
    @title = info["title"]
    @published = info["published"]
    @include_social_links = true
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

      # Don't resize special-case images.
      if node.parent["class"] =~ /full\-size/
        next
      end

      filename = File.join(SINATRA_ROOT, "public", src)

      # If there's a *.orig.jpg (or whatever) file, we've already done this.
      if File.exist?(orig_filename(filename))
        next
      end

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

  def style_images(html, options={})
    html.css("img").each do |node|
      p = node.parent
      alt = node["alt"]

      if alt
        if options[:feed]
          caption = Nokogiri::XML::Node.new("p", html)
          caption.content = alt
          p.add_next_sibling(caption)
        else
          p.name = "figure"
          caption = Nokogiri::XML::Node.new("figcaption", html)
          caption.content = alt
          p.children.last.add_next_sibling(caption)
        end
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

  def fix_absolute_refs(html)
    # If the posts contains any links like "<a href='/...>" make sure they're properly prefixed
    # w/ SITE_ROOT.
    html.css("a").each do |link|
      if link["href"].start_with?("/")
        link["href"] = "#{SITE_ROOT}#{link['href']}"
      end
    end

    # Same w/ images like "<img src='/...>".
    html.css("img").each do |img|
      if img["src"].start_with?("/")
        img["src"] = "#{SITE_ROOT}#{img['src']}"
      end
    end
  end

  def remove_scripts(html)
    html.css("script").remove
  end

  def remove_footnotes(html)
    html.css("a[rel='footnote']").each do |a|
      a.parent.remove
    end
  end

  protected

  def orig_filename(filename)
    filename_and_extension = filename.split(".")
    extension = filename_and_extension.pop
    filename_and_extension.concat(["orig", extension]).join(".")
  end
end
