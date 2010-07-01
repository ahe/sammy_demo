class Post
  include Mongoid::Document
  field :title
  field :content
  field :author
end