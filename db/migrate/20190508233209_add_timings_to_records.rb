class AddTimingsToRecords < ActiveRecord::Migration[5.2]
  def change
    add_column :records, :access_time, :integer
    add_column :records, :swap_time, :integer
    add_column :records, :compare_time, :integer
  end
end
