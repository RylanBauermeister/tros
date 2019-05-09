class CreateSitePrefs < ActiveRecord::Migration[5.2]
  def change
    create_table :site_prefs do |t|
      t.integer :access_time
      t.integer :swap_time
      t.integer :compare_time
      t.integer :array_size

      t.timestamps
    end
  end
end
