# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :redeem_reward, mutation: Mutations::RedeemRewardMutation
    field :earn_points, mutation: Mutations::EarnPointsMutation
  end
end
