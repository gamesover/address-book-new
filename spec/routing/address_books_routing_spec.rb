require 'rails_helper'

RSpec.describe AddressBooksController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/address_books').to route_to('address_books#index')
    end

    it 'routes to #show' do
      expect(get: '/address_books/1').to route_to('address_books#show', id: '1')
    end

    it 'routes to #create' do
      expect(post: '/address_books').to route_to('address_books#create')
    end

    it 'routes to #update via PUT' do
      expect(put: '/address_books/1').to route_to('address_books#update', id: '1')
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/address_books/1').to route_to('address_books#update', id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/address_books/1').to route_to('address_books#destroy', id: '1')
    end
  end
end
