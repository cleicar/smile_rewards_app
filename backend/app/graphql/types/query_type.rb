# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :customer_jwt, String, null: false do
      argument :customer_id, ID, required: true
    end

    def customer_jwt(customer_id:)
      SmileJwtService.generate_jwt(customer_id)
    end
  end
end
