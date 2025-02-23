import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import { GiftIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Reward, PointsProduct } from "../types";

import CouponModal from "./CouponModal";

type RewardItemProps = {
  reward: Reward;
  customerPoints: number;
  onRedeemSuccess: () => void;
};

const REDEEM_REWARD_MUTATION = gql`
  mutation RedeemReward($input: RedeemRewardMutationInput!) {
    redeemReward(input: $input) {
      success
      message
      fulfilledReward {
        id
        name
        imageUrl
        usageInstructions
        sourceDescription
        code
      }
    }
  }
`;

export const RewardItem: React.FC<RewardItemProps> = ({ reward, customerPoints, onRedeemSuccess }) => {
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [fulfilledReward, setFulfilledReward] = useState<PointsProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const [redeemReward] = useMutation(REDEEM_REWARD_MUTATION);

  const pointsProduct = reward.points_product as PointsProduct;  
  const canRedeem = customerPoints >= pointsProduct.points_price;
  
  const pointsToSpend = pointsProduct.exchange_type === 'variable' 
    ? pointsProduct.variable_points_step 
    : pointsProduct.points_price;

  const handleRedeem = async () => {
    if (!canRedeem || loading) return;

    setLoading(true);
    setMessage(null);
    setCouponCode(null);

    const currentCustomer = window.currentCustomer;

    if (!currentCustomer?.id) {
      setMessage("No customer information available.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await redeemReward({
        variables: { 
          input: { 
            pointsProductId: pointsProduct.id, 
            customerId: currentCustomer.id,
            pointsToSpend: pointsToSpend
          } 
        },
      });

      if (data.redeemReward.success) {
        setCouponCode(data.redeemReward.couponCode || "No coupon code available.");
        setFulfilledReward(data.redeemReward.fulfilledReward);
        onRedeemSuccess();
      } else {
        setMessage(data.redeemReward.message || "Failed to redeem reward.");
      }
    } catch (error) {
      console.error("Error redeeming reward:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-3">
          <GiftIcon className="h-6 w-6 text-yellow-500" />
          <span className="text-lg text-gray-800">{reward.name}</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`font-semibold ${canRedeem ? "text-green-600" : "text-red-500"}`}>
            {pointsProduct.exchange_description}
          </span>
          {canRedeem ? (
            <button
              className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md primary-button`}
              onClick={handleRedeem}
              disabled={loading}
            >
              {loading ? "Processing..." : "Redeem"}
            </button>
          ) : (
            <XCircleIcon className="h-6 w-6 text-red-500" />
          )}
        </div>
      </li>

      {couponCode && fulfilledReward && (
         <CouponModal
          fulfilledReward={fulfilledReward}
          onClose={() => setCouponCode(null)}
       />
      )}

      {message && (
        <p className="mt-2 text-sm text-red-500">
          {message}
        </p>
      )}
    </>
  );
};

export default RewardItem;
