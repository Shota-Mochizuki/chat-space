class ChangeColumnToMessage < ActiveRecord::Migration[5.0]
  def change
    def up
      change_column :messages, :body, :string, null: false
    end
  
    # 変更前の状態
    def down
      change_column :messages, :body, :string
    end
  end
end
