class Referrers
  include DataMapper::Resource

  property :id,       Serial
  property :date,     Date,    :index => true
  property :referrer, String,  :index => true
  property :count,    Integer, :default => 0
end
