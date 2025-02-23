import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Customer } from "../types";

const EARN_POINTS_MUTATION = gql`
  mutation EarnPoints($input: EarnPointsMutationInput!) {
    earnPoints(input: $input) {
      success
      message
      pointsTransaction {
        id
        customerId
        pointsChange
        description
      }
    }
  }
`;

type AdminPanelProps = {
  onPointsUpdated: () => void;
};

const AdminPanel: React.FC<AdminPanelProps> = ({ onPointsUpdated }) => {
  const [pointsChange, setPointsChange] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [earnPoints, { loading }] = useMutation(EARN_POINTS_MUTATION);

  const handleSubmit = async () => {
    const currentCustomer = window.currentCustomer as Customer;
    if (!currentCustomer?.id) {
      setMessage("Customer not found.");
      return;
    }

    try {
      const points = parseInt(pointsChange);
      const { data } = await earnPoints({
        variables: {
          input: {
            customerId: currentCustomer.id,
            pointsChange: points,
            description: `Manual points ${points > 0 ? "addition" : "deduction"}`,
          },
        },
      });

      if (data.earnPoints.success) {
        setMessage(`${data.earnPoints.message}`);
        setPointsChange("");
        onPointsUpdated();
      } else {
        setMessage(`Error: ${data.earnPoints.message}`);
      }
    } catch (error) {
      console.error("Error adjusting points:", error);
      setMessage("An error occurred while adjusting points.");
    }
  };

  return (
    <div className="mt-6 bg-white p-4 border rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Adjust points balance</h2>
      <input
        type="number"
        value={pointsChange}
        onChange={(e) => setPointsChange(e.target.value)}
        placeholder="Enter points (e.g. 50 or -20)"
        className="border p-2 rounded mb-4 w-full"
      />
      <small>Use negative points to subtract from the customer's point balance.</small>
      <p></p>
      <button
        className="primary-button text-white px-4 py-2 rounded my-3"
        onClick={handleSubmit}
        disabled={loading || !pointsChange}
      >
        {loading ? "Processing..." : "Adjust Points"}
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default AdminPanel;
