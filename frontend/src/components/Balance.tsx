import React from "react";
import { TrophyIcon } from "@heroicons/react/24/solid";

type BalanceProps = {
  customerPoints: number | null;
};

export const Balance: React.FC<BalanceProps> = ({ customerPoints }) => {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-xs rounded-xl">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md border border-gray-200">
        <div className="border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">You have</h2>
        </div>
        <div>
          <p className="text-4xl font-semibold text-gray-600 mt-2 flex items-center">
            <TrophyIcon className="h-6 w-6 text-yellow-500" />
            <span className="smile-points-balance m-2">{customerPoints}</span>
            <span className="text-base">points</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Balance;
