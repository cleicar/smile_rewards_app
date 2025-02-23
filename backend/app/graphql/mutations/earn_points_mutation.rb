module Mutations
  class EarnPointsMutation < BaseMutation
    argument :customer_id, ID, required: true
    argument :points_change, Integer, required: true
    argument :description, String, required: true

    field :success, Boolean, null: false
    field :message, String, null: true
    field :points_transaction, Types::PointsTransactionType, null: true

    def resolve(customer_id:, points_change:, description:)
      response = SmileApiService.create_points_transaction(
        customer_id: customer_id,
        points_change: points_change,
        description: description,
        internal_note: "Earned points via Math Question"
      )

      if response[:success]
        points_transaction_data = response[:body][:points_transaction]

        {
          points_transaction: {
            id: points_transaction_data[:id],
            customer_id: points_transaction_data[:customer_id],
            points_change: points_transaction_data[:points_change],
            description: points_transaction_data[:description],
            internal_note: points_transaction_data[:internal_note],
            created_at: points_transaction_data[:created_at],
            updated_at: points_transaction_data[:updated_at]
          },
          message: "Points rewarded successfully!",
          success: true
        }
      else
        {
          points_transaction: nil,
          message: response[:error]["message"] || "Failed to reward points.",
          success: false
        }
      end
    end
  end
end
