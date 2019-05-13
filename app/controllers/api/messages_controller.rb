class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    @messages = Message.where('(id > ?) AND (group_id = ?)', params[:id], params[:group_id])
  end
end
