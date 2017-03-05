FactoryGirl.define do
  factory :address_book do
    email { Faker::Internet.email }
    name  { Faker::Name.name }
  end
end
