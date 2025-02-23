import React from "react";

import { FulfilledReward } from "../types";

type CouponModalProps = {
  fulfilledReward: FulfilledReward;
  onClose: () => void;
};

const CouponModal: React.FC<CouponModalProps> = ({ onClose, fulfilledReward }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-2">{fulfilledReward.name}</h2>
        <p className="text-lg mb-4">{fulfilledReward.sourceDescription}</p>
        <p className="text-md mb-6">{fulfilledReward.usageInstructions}</p>

        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
          <span className="text-xl font-bold">{fulfilledReward.code}</span>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
            onClick={() => fulfilledReward.code && navigator.clipboard.writeText(fulfilledReward.code)}
          >
            Copy Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponModal;
