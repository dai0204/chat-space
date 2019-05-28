class Api::MessagesController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json {@new_messages = Message.where('id > ? && group_id == ?', params[:id], params[:group_id])}
    end
  end
end