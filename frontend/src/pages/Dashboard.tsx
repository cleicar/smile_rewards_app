import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import Balance from '../components/Balance';
import Rewards from '../components/Rewards';

const GET_CUSTOMER_POINTS = gql`
  query GetCustomerPoints {
    customerPoints
  }
`;

const GET_JWT_TOKEN = gql`
  query GetCustomerJwt($customerId: ID!) {
    customerJwt(customerId: $customerId)
  }
`;

export const Dashboard = () => {
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

  const { loading, error, data } = useQuery(GET_CUSTOMER_POINTS);

  if (loading || loadingToken || !isAuthenticated) return <p>Loading...</p>;
  if (error || errorToken) return <p className="text-red-500">Error fetching data</p>;

  return (
    <div className="grid grid-cols-12 gap-6 mt-8">
      <Balance customerPoints={ data?.customerPoints } />
      <Rewards customerPoints={ data?.customerPoints }/>
    </div>
  );
}

export default Dashboard;