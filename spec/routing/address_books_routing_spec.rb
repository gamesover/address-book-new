require 'rails_helper'

RSpec.describe AddressBooksController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/address_books').to route_to('address_books#index')
    end
  end
end
