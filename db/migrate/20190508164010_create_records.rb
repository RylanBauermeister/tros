class CreateRecords < ActiveRecord::Migration[5.2]
  def change
    create_table :records do |t|
      t.string :sort_type
      t.integer :accesses
      t.integer :swaps
      t.integer :compares
      t.integer :total_ms

      t.timestamps
    end
  end
end
