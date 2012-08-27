class Comment
  include DataMapper::Resource

  property :id,              Serial
  property :post_identifier, String
  property :reader_name,     String
  property :reader_email,    String
  property :text,            Text
  property :created_at,      DateTime
end
