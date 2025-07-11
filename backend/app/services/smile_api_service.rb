# frozen_string_literal: true

require "uri"
require "json"
require "net/http"

class SmileApiService
  BASE_URL = "https://api.smile.io/v1/"

  def self.purchase_points_product(points_product_id:, customer_id:, points_to_spend: nil)
    url = URI("#{BASE_URL}/points_products/#{points_product_id}/purchase")

    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    request = Net::HTTP::Post.new(url)
    request["Authorization"] = "Bearer #{ENV['SMILE_PRIVATE_KEY']}"
    request["Content-Type"] = "application/json"

    payload = {
      customer_id: customer_id,
      points_to_spend: points_to_spend
    }

    request.body = payload.to_json

    response = https.request(request)

    if response.is_a?(Net::HTTPSuccess)
      {success: true, body: JSON.parse(response.body, symbolize_names: true)}
    else
      Rails.logger.error "Error purchasing points product: #{response.code} - #{response.message}"
      {success: false, error: JSON.parse(response.body, symbolize_names: true)}
    end
  end

  def self.create_points_transaction(customer_id:, points_change:, description:, internal_note: nil)
    url = URI("#{BASE_URL}/points_transactions")
  
    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true
  
    request = Net::HTTP::Post.new(url)
    request["Authorization"] = "Bearer #{ENV['SMILE_PRIVATE_KEY']}"
    request["Content-Type"] = "application/json"
  
    payload = {
      points_transaction: {
        customer_id: customer_id,
        points_change: points_change,
        description: description,
        internal_note: internal_note
      }
    }
  
    request.body = payload.to_json
  
    response = https.request(request)
  
    if response.is_a?(Net::HTTPSuccess)
      { success: true, body: JSON.parse(response.body, symbolize_names: true) }
    else
      Rails.logger.error "Error creating points transaction: #{response.code} - #{response.message}"
      { success: false, error: JSON.parse(response.body, symbolize_names: true) }
    end
  end  
end
