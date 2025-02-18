Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  
  get "up" => "rails/health#show", as: :rails_health_check

  post "/graphql", to: "graphql#execute"
end
