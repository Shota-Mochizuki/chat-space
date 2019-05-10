class MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    @message = Message.new
    @messages = @group.messages.includes(:user)

    @name_list = []
    @group.group_users.each do |group_user|
      @name_list << User.find(group_user.user_id).name
    end
  end
  def create
    @group = Group.find(params[:group_id])
    @message = @group.messages.new(message_params)
    respond_to do |format|
      format.html {
        if @message.save
          redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
        else
          @messages = @group.messages.includes(:user)
          flash.now[:alert] = 'メッセージを入力してください。'
          render :index
        end
      }
      format.json { @message.save }
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end
end
