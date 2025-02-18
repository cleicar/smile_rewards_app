# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :customer_jwt, String, null: false do
      argument :customer_id, ID, required: true
    end

    field :customer_points, Integer, null: false

    def customer_jwt(customer_id:)
      SmileJwtService.generate_jwt(customer_id)
    end
    
    def customer_points
      { points_balance: 200 }[:points_balance]
    end
  end
end
