import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Customer } from "../types";

const GET_JWT_TOKEN = gql`
  query($customerId: ID!) {
    customerJwt(customerId: $customerId)
  }
`;

const setCurrentCustomer = (customer: any) => {
  window.currentCustomer = customer;
};

export const getCurrentCustomer = () => {
  return window.currentCustomer || null;
};

const useSmileAuth = () => {
  const shopifyCustomerId = process.env.REACT_APP_SHOPIFY_CUSTOMER_ID;
  const smileKey = process.env.REACT_APP_SMILE_PUBLIC_KEY;

  const { loading, error, data } = useQuery(GET_JWT_TOKEN, {
    variables: { customerId: shopifyCustomerId },
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const initializeSmileUI = () => {
    window.SmileUI.init({
      channel_key: smileKey,
      customer_identity_jwt: data.customerJwt,
    });

    window.SmileUI.ready()
      .then((smileUiInstance: { smile: { customer: any; }; }) => {
        loadCurrentCustomer(smileUiInstance.smile.customer);
      })
      .catch((err: any) => {
        console.error("Error while initializing SmileUI:", err);
      });
  };

  const loadCurrentCustomer = (customer: Customer) => {
    if (customer) {
      setCurrentCustomer(customer);
      setIsAuthenticated(true);
    } else {
      console.warn("SmileUI is initialized but customer data is not available yet.");
    }
  };

  useEffect(() => {
    if(!data?.customerJwt) {
      console.log("Waiting for JWT token to be available.");
      return;
    }

    if (!loading && !isAuthenticated) {
      if (window.SmileUI) {
        initializeSmileUI();
      } else {
        console.log("Waiting for SmileUI to load...");
        document.addEventListener("smile-ui-loaded", () => {
          console.log("SmileUI was loaded.");
          initializeSmileUI();
        });
      }
    }
  }, [loading, data, isAuthenticated, smileKey]);

  return { isAuthenticated, loading, error, getCurrentCustomer };
};

export default useSmileAuth;
