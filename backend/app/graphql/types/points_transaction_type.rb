module Types
  class PointsTransactionType < Types::BaseObject
    field :id, ID, null: false
    field :customer_id, ID, null: false
    field :points_change, Integer, null: false
    field :description, String, null: true
    field :internal_note, String, null: true
    field :created_at, String, null: true
    field :updated_at, String, null: true
  end
end
