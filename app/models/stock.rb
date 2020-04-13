class Stock < ApplicationRecord
  def self.new_lookup(ticker_sym)
    keychains = Rails.application.credentials.iex_client
    client = IEX::Api::Client.new(
      publishable_token: keychains[:sandbox_api_public_key],
      secret_token:  keychains[:sandbox_api_private_key],
      endpoint: 'https://sandbox.iexapis.com/v1'
    )
    client.price(ticker_sym)
  end
end
