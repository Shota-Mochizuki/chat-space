FactoryBot.define do
  factory :message do
    body {Faker::Lorem.sentence}
    #image {File.open("#{Rails.root}/public/images/no_image.jpg")}
    image {File.open(Rails.root.join('spec', 'fixtures', 'sample.jpg'))}
    user
    group
  end
end
