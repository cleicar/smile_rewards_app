Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  post "/graphql", to: "graphql#execute"

  get '/', to: proc { [200, {}, ['Backend is running']] }
end
