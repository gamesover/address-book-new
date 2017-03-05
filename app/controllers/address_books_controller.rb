class AddressBooksController < ApplicationController
  # GET /address_books
  def index
    address_books = AddressBook.all

    address_books = address_books.map do |address_book|
      {
        email: address_book.email,
        name: address_book.name
      }
    end

    render json: address_books
  end

  def upload
    file = params[:file]
    correction = JSON.parse(params[:correction]) || {}

    errors, conflicts, created_num, updated_num = AddressBook.read_csv(file, correction)

    if errors.blank? && conflicts.blank?
      render json: { created_num: created_num, updated_num: updated_num }
    else
      render json: { errors: errors, conflicts: conflicts }, status: :unprocessable_entity
    end
  end
end
