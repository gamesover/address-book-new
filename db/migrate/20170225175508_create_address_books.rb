class CreateAddressBooks < ActiveRecord::Migration[5.0]
  def change
    create_table :address_books do |t|
      t.string :email, null: false
      t.string :name, null: false

      t.index :email, unique: true
      t.timestamps
    end
  end
end
