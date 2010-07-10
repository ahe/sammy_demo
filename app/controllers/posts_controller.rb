class PostsController < ApplicationController
  
  def index
    render :json => Post.all
  end
  
  def create
    render :json => Post.create(params[:post]).attributes.to_json
  end
  
  def update
    post = Post.find(params[:id])
    post.update_attributes(params[:post])
    render :json => post.attributes.to_json
  end
  
  def destroy
    post = Post.find(params[:id])
    post.destroy
    render :nothing => true
  end
  
end