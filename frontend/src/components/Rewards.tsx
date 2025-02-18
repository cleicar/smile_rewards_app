import React from "react";

import { GiftIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

type RewardsListProps = {
  customerPoints: number | null;
};

export const RewardsList: React.FC<RewardsListProps> = ({ customerPoints }) => {
  const rewards = [
    { id: 1, name: "Free Coffee", cost: 100 },
    { id: 2, name: "Free T-Shirt", cost: 500 },
    { id: 3, name: "Free Mug", cost: 200 },
  ];

  return (
    <>
      <div className="col-span-full xl:col-span-8 bg-white shadow-xs rounded-xl">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full border border-gray-200">
          <div className="border-b pb-3 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Available Rewards</h2>
          </div>
          <div className="p-3">
            <div className="overflow-x-auto">
              <ul className="space-y-4">
                { rewards.length > 0 ? (
                  rewards.map((reward) => {
                    const canRedeem = customerPoints !== null && customerPoints >= reward.cost;

                    return (
                      <li key={reward.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                        <div className="flex items-center space-x-3">
                          <GiftIcon className="h-6 w-6 text-yellow-500" />
                          <span className="text-lg text-gray-800">{reward.name}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`font-semibold ${canRedeem ? "text-green-600" : "text-red-500"}`}>
                            {reward.cost} pts
                          </span>
                          {canRedeem ? (
                            <CheckCircleIcon className="h-6 w-6 text-green-500" />
                          ) : (
                            <XCircleIcon className="h-6 w-6 text-red-500" />
                          )}
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-center">Loading rewards...</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>;
    </>
  );
};

export default RewardsList;
