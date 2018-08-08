class Middleman::Renderers::MiddlemanRedcarpetHTML < ::Redcarpet::Render::HTML
  include Redcarpet::Render::SmartyPants

  # Grab the current postprocess, which is needed by SmartyPants.
  alias_method :orig_postprocess, :postprocess

  def postprocess(document)
    fragment = Nokogiri::HTML.fragment(document)

    # Convert all <p><img>s into <figure><img>s
    fragment.css('p > img').each do |image|
      paragraph = image.parent
      convert_to_figure(paragraph, image)
    end

    # And likewise w/ <p><a><img>s
    fragment.css('p > a > img').each do |image|
      paragraph = image.parent.parent
      convert_to_figure(paragraph, image)
    end

    # Let SmartyPants do its thing.
    orig_postprocess(fragment.to_html)
  end

  def convert_to_figure(container, image)
    container.name = 'figure'

    if image['alt']
      caption = Nokogiri::XML::Node.new('figcaption', container.document)
      caption.content = image['alt']
      container.add_child(caption)
    end
  end
end
