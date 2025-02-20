import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_JWT_TOKEN = gql`
  query GetCustomerJwt($customerId: ID!) {
    customerJwt(customerId: $customerId)
  }
`;

const useSmileAuth = () => {
  const shopifyCustomerId = process.env.REACT_APP_SHOPIFY_CUSTOMER_ID;
  const smileKey = process.env.REACT_APP_SMILE_PUBLIC_KEY;

  const { loading: loadingToken, error: errorToken, data: tokenData } = useQuery(GET_JWT_TOKEN, {
    variables: { customerId: shopifyCustomerId },
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!loadingToken && tokenData?.customerJwt && !isAuthenticated) {
      if (!window.SmileUI) return; // Smile.js not loaded

      if (!smileKey) return; // Smile public key not set
      try {
        window.SmileUI.init({
          channel_key: smileKey,
          customer_identity_jwt: tokenData.customerJwt,
        });

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error initializing Smile.js:", error);
      }
    }
  }, [loadingToken, tokenData, isAuthenticated, smileKey]);

  return { isAuthenticated, loadingToken, errorToken };
};

export default useSmileAuth;
