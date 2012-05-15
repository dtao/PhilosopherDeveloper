class Visit
  include DataMapper::Resource

  belongs_to :post

  property :id,       Serial
  property :post_id,  Integer
  property :visited,  DateTime
  property :ip,       String
  property :agent,    String
  property :referrer, String
end
