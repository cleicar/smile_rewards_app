# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :customer_points, Integer, null: false

    def customer_points
      { points_balance: 200 }[:points_balance]
    end
  end
end
