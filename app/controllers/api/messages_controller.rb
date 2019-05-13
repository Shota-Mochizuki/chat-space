class Api::MessagesController < ApplicationController
  before_action :set_group, only: :index

  def index
    @messages = Message.where('(id > ?) AND (group_id = ?)', params[:id], params[:group_id])
  end

  private

  def set_group
    @group = Group.find(params[:group_id])
  end

end
