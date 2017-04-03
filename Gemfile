source 'https://rubygems.org'

ruby '2.3.3'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'pg', '~> 0.19'
gem 'puma', '~> 3.7.0'
gem 'rails', '~> 5.0.1'
gem 'rubocop', '~> 0.47.1', require: false

group :development, :test do
  gem 'capybara', '~> 2.12.0'
  gem 'factory_girl_rails', '~> 4.0'
  gem 'faker', '~> 1.7.0'
  gem 'rspec-rails', '~> 3.5'
end

gem 'listen', '~> 3.1.5'
gem 'rack-rewrite'

group :development do
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
