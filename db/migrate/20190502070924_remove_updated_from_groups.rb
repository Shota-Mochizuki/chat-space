class RemoveUpdatedFromGroups < ActiveRecord::Migration[5.0]
  def change
    remove_column :groups, :updated_at, :timestamps
  end
end
