require "jwt"

class SmileJwtService
  def self.generate_jwt(customer_id)
    private_key = ENV["SMILE_PRIVATE_KEY"]

    payload = {
      customer_identity: {
        distinct_id: customer_id
      },
      exp: Time.now.to_i + 300 # Set expiry to 5 minutes
    }

    JWT.encode(payload, private_key, "HS256")
  end
end
