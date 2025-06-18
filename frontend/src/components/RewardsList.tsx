import React, { useEffect, useState } from "react";

import { Reward } from "../types";
import RewardItem from "./RewardItem";

type RewardsListProps = {
  customerPoints: number;
  onPointsUpdated: () => void;
};

export const RewardsList: React.FC<RewardsListProps> = ({ customerPoints, onPointsUpdated }) => {
  const [rewards, setRewards] = useState<Reward[]>([]);
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

  useEffect(() => {
    fetchRewards();
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
                    onRedeemSuccess={onPointsUpdated}
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
