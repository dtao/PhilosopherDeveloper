class Middleman::Renderers::MiddlemanRedcarpetHTML < ::Redcarpet::Render::HTML
  include Redcarpet::Render::SmartyPants

  # Grab the current postprocess, which is needed by SmartyPants.
  alias_method :orig_postprocess, :postprocess

  def postprocess(document)
    fragment = Nokogiri::HTML.fragment(document)

    images = fragment.css('p > img')
    images.each do |image|
      paragraph = image.parent
      paragraph.name = 'figure'

      caption = Nokogiri::XML::Node.new('figcaption', fragment)
      caption.content = image['alt']
      paragraph.add_child(caption)
    end

    # Let SmartyPants do its thing.
    orig_postprocess(fragment.to_html)
  end
end
