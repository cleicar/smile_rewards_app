# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :redeem_reward, mutation: Mutations::RedeemRewardMutation
  end
end
