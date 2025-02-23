# frozen_string_literal: true
module Types
  class PointsProductType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: true
    field :image_url, String, null: true
    field :usage_instructions, String, null: true
    field :source_description, String, null: true
    field :code, String, null: true
  end
end
