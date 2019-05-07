class RemoveCreatedFromGroups < ActiveRecord::Migration[5.0]
  def change
    remove_column :groups, :created_at, :timestamps
  end
end
