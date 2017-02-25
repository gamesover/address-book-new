class AddressBooksController < ApplicationController
  before_action :set_address_book, only: [:show, :update, :destroy]

  # GET /address_books
  def index
    @address_books = AddressBook.all

    render json: @address_books
  end

  # GET /address_books/1
  def show
    render json: @address_book
  end

  # POST /address_books
  def create
    @address_book = AddressBook.new(address_book_params)

    if @address_book.save
      render json: @address_book, status: :created, location: @address_book
    else
      render json: @address_book.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /address_books/1
  def update
    if @address_book.update(address_book_params)
      render json: @address_book
    else
      render json: @address_book.errors, status: :unprocessable_entity
    end
  end

  # DELETE /address_books/1
  def destroy
    @address_book.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_address_book
    @address_book = AddressBook.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def address_book_params
    params.fetch(:address_book, {})
  end
end
