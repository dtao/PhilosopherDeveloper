class Post
  include DataMapper::Resource

  property :id,           Serial
  property :last_updated, DateTime
  property :title,        String
  property :content,      Text
end
