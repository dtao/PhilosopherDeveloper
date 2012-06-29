class PostVisits
  include DataMapper::Resource

  property :id,       Serial
  property :post_id,  String,  :index => true
  property :date,     Date,    :index => true
  property :count,    Integer, :default => 0
end
