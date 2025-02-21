import React, { useEffect, useState } from "react";

import { Reward, Customer } from "../types";
import RewardItem from "./RewardItem";

export const RewardsList: React.FC = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [customerPoints, setCustomerPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (window.SmileUI) {
      try {
        const customer: Customer | null = window.SmileUI?.smile?.customer;
        
        if (customer) {
          setCustomerPoints(customer.points_balance);
        } else {
          console.warn("No customer data found in SmileUI.");
          setError("Failed to load customer data.");
        }

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
      } catch (err) {
        console.error("Error while accessing SmileUI:", err);
        setError("Failed to load data. Please refresh the page.");
        setLoading(false);
      }
    } else {
      console.warn("SmileUI is not loaded. Unable to fetch data.");
      setError("SmileUI not loaded. Please try again later.");
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading rewards...</p>;

  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-xs rounded-xl">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full border border-gray-200">
        <div className="border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Ways to Redeem</h2>
        </div>
        <div className="p-3">
          { error ? ( 
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <ul className="space-y-4">
                {rewards.length > 0 ? (
                  rewards.map((reward) => (
                    <RewardItem 
                      key={reward.points_product.id} 
                      reward={reward} 
                      customerPoints={customerPoints || 0} 
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No rewards available.</p>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardsList;
