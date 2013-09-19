class Middleman::Renderers::MiddlemanRedcarpetHTML < ::Redcarpet::Render::HTML
  def block_code(code, language)
    Pygments.highlight(code, :lexer => language)
  end

  def paragraph(text)
    '<p>' + text.gsub('--', '&mdash;') + '</p>'
  end
end
