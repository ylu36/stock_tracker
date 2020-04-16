class Stock < ApplicationRecord
  has_many :user_stocks
  has_many :users, through: :user_stocks

  validates :name, :ticker, presence: true
  def self.check_db(ticker_sym)
    Stock.where(ticker: ticker_sym).first
  end

  def self.new_lookup(ticker_sym)
    keychains = Rails.application.credentials.iex_client
    client = IEX::Api::Client.new(
      publishable_token: keychains[:sandbox_api_public_key],
      secret_token:  keychains[:sandbox_api_private_key],
      endpoint: 'https://sandbox.iexapis.com/v1'
    )
    begin
      new(ticker: ticker_sym, name: client.company(ticker_sym).company_name, last_price: client.price(ticker_sym))
    rescue => e
      nil
    end
  end
end
