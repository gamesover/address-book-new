require 'rails_helper'

RSpec.describe 'AddressBooks', type: :request do
  describe 'GET /address_books' do
    it 'works! (now write some real specs)' do
      get address_books_path
      expect(response).to have_http_status(200)
    end
  end
end
