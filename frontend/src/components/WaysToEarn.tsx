import React from "react";
import MathQuestion from "./MathQuestion";

type WaysToEarnProps = {
  onPointsEarned: () => void;
};

const WaysToEarn: React.FC<WaysToEarnProps> = ({ onPointsEarned }) => {
  return (
   <div className="col-span-full xl:col-span-8 bg-white shadow-xs rounded-xl">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full border border-gray-200">
        <div className="border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Ways to Earn</h2>
        </div>

        <MathQuestion onSuccess={onPointsEarned} />
      </div>
    </div>
  );
};

export default WaysToEarn;
