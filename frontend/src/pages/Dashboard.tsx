import React, { useState, useEffect } from "react";

import { useSmileAuth, setCurrentCustomer } from "../hooks/useSmileAuth";
import Balance from '../components/Balance';
import RewardsList from '../components/RewardsList';
import WaysToEarn from "../components/WaysToEarn";

import { Customer } from "../types";

export const Dashboard = () => {
  const { isAuthenticated, loading, error } = useSmileAuth();
  const [customerPoints, setCustomerPoints] = useState<number | null>(null);

  const refreshCustomerPoints = () => {
    if (window.SmileUI?.smile) {
      window.SmileUI.smile.fetchCustomer().then((customer: Customer) => {
        if (customer?.points_balance !== undefined) {
          setCurrentCustomer(customer);
          setCustomerPoints(customer.points_balance);
        } else {
          console.warn("No customer data found in SmileUI.");
        }
      })
      .catch((err: unknown) => {
        console.error("Failed to fetch updated customer points:", err);
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshCustomerPoints();
    }
  }, [isAuthenticated]);

  if ( !isAuthenticated ) return <p className="text-red-500">Waiting for authentication.</p>;
  if ( loading ) return <p>Loading...</p>;
  if ( error) return <p className="text-red-500">Error fetching data</p>;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div className="col-span-1 bg-white shadow-xs rounded-xl p-6">
        <Balance customerPoints={customerPoints} />
      </div>
      <div className="col-span-1 xl:col-span-2 space-y-4">
        <RewardsList 
          customerPoints={customerPoints || 0} 
          onPointsUpdated={refreshCustomerPoints} 
        />
        <WaysToEarn onPointsEarned={refreshCustomerPoints} />
      </div>
    </div>
  );
}

export default Dashboard;