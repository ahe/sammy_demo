class ApplicationController < ActionController::Base
  layout 'application'
  
  after_filter :clean_json
  
  private
  
  def clean_json
    response.body = response.body.gsub('"_id"', '"id"')
  end
  
end
