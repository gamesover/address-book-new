Rails.application.routes.draw do
  resources :address_books, only: :index do
    collection do
      post 'upload'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
