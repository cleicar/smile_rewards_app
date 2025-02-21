import React, { useState } from "react";

import { GiftIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Reward, PointsProduct } from "../types";

type RewardItemProps = {
  reward: Reward;
  customerPoints: number;
};

export const RewardItem: React.FC<RewardItemProps> = ({ reward, customerPoints }) => {
  const [message, setMessage] = useState<string | null>(null);

  const pointsProduct = reward.points_product as PointsProduct;
  const canRedeem = customerPoints >= pointsProduct.points_price;

  const handleRedeem = () => {
    // setMessage("Redeem success");
  };

  return (
    <li key={pointsProduct.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
      <div className="flex items-center space-x-3">
        <GiftIcon className="h-6 w-6 text-yellow-500" />
        <span className="text-lg text-gray-800">{reward.name}</span>
      </div>
      <div className="flex items-center space-x-3">
        <span className={`font-semibold ${canRedeem ? "text-green-600" : "text-red-500"}`}>
          {pointsProduct.exchange_description}
        </span>
        {canRedeem ? (
          <CheckCircleIcon className="h-6 w-6 text-green-500" />
        ) : (
          <XCircleIcon className="h-6 w-6 text-red-500" />
        )}
        <button
          className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md ${
            canRedeem ? "primary-button" : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={handleRedeem}
          disabled={!canRedeem}
        >
          Redeem
        </button>
      </div>
      {message && (
        <p className="mt-2 text-sm text-blue-500">
          {message}
        </p>
      )}
    </li>
  );
};

export default RewardItem;
