import React, { useEffect, useState } from "react";

import { Reward, Customer } from "../types";
import RewardItem from "./RewardItem";

export const RewardsList: React.FC = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [customerPoints, setCustomerPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRewards = () => {
    if (!rewards.length && window.SmileUI) {  
      window.SmileUI.smile.fetchAllCustomerPointsProducts()
        .then((rewards: Reward[]) => {
          setRewards(rewards);
          setLoading(false);
        })
        .catch((err: unknown) => {
          console.error("Error fetching rewards:", err);
          setError("Failed to load rewards. Please try again later.");
          setLoading(false);
        });
    }
  };

  const refreshCustomerPoints = () => {
    if (window.SmileUI?.smile) {
      window.SmileUI.smile.fetchCustomer().then((customer: Customer) => {
        if (customer?.points_balance !== undefined) {
          setCustomerPoints(customer.points_balance);
        } else {
          setError("Failed to load the updated customer data.");
        }
      }).catch((err: unknown) => {
        setError("Failed to refresh customer points. Please refresh the page.");
      });
    }
  };

  useEffect(() => {
    if (window.SmileUI) {
      refreshCustomerPoints();
      fetchRewards();
    } else {
      setError("SmileUI not loaded. Please try again later.");
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading rewards...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-xs rounded-xl">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full border border-gray-200">
        <div className="border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Ways to Redeem</h2>
        </div>
        <div className="p-3">
          <div className="overflow-x-auto">
            <ul className="space-y-4">
              {rewards.length > 0 ? (
                rewards.map((reward) => (
                  <RewardItem 
                    key={reward.points_product.id} 
                    reward={reward} 
                    customerPoints={customerPoints || 0}
                    onRedeemSuccess={refreshCustomerPoints}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center">No rewards available.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsList;
