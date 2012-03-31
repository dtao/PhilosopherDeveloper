class Post
  attr_reader :id
  attr_reader :title

  def initialize(title)
    @title = title
    @path = Dir.entries(File.join(File.dirname(__FILE__), "..")).find { |dir| dir.include? title }
    puts "Path: #{@path}"
    @id = title.gsub(/\s/, "_").to_sym
    puts "Id: #{@id}"
  end

  def content
    if @content.nil?
      @content = File.read("#{@path}/post.markdown")
      puts "Content: #{@content}"
    end

    @content
  end
end