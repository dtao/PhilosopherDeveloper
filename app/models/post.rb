class Post
  include DataMapper::Resource

  has n, :visits

  property :id,           Serial
  property :created_at,   DateTime
  property :permalink,    String, :unique => true, :index => true
  property :title,        String
  property :content,      Text
  property :published,    Boolean
end
