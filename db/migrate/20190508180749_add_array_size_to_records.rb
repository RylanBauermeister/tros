class AddArraySizeToRecords < ActiveRecord::Migration[5.2]
  def change
    add_column :records, :array_size, :integer
  end
end
