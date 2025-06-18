# frozen_string_literal: true
module Mutations
  class RedeemRewardMutation < BaseMutation
    argument :points_product_id, ID, required: true
    argument :customer_id, ID, required: true
    argument :points_to_spend, Integer, required: false

    field :success, Boolean, null: false
    field :message, String, null: true
    field :fulfilled_reward, Types::PointsProductType, null: true

    def resolve(points_product_id:, customer_id:, points_to_spend:)
      response = SmileApiService.purchase_points_product(
        points_product_id: points_product_id,
        customer_id: customer_id,
        points_to_spend: points_to_spend
      )

      if response[:success]
        fulfilled_reward_data = response[:body][:points_purchase][:fulfilled_reward]

        {
          fulfilled_reward: fulfilled_reward(fulfilled_reward_data),
          message: "Redeemed successfully",
          success: true
        }
      else
        {
          fulfilled_reward: nil,
          message: response[:error]["message"] || "Failed to redeem the reward.",
          success: false
        }
      end
    end

    private
    
    def fulfilled_reward(fulfilled_reward_data)
      {
        id: fulfilled_reward_data[:id],
        name: fulfilled_reward_data[:name],
        image_url: fulfilled_reward_data[:image_url],
        usage_instructions: fulfilled_reward_data[:usage_instructions],
        source_description: fulfilled_reward_data[:source_description],
        code: fulfilled_reward_data[:code]
      }
    end
  end
end
