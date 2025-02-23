import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Customer } from "../types";

export const EARN_POINTS_MUTATION = gql`
  mutation EarnPoints($input: EarnPointsMutationInput!) {
    earnPoints(input: $input) {
      success
      message
      pointsTransaction {
        id
        customerId
        pointsChange
        description
        internalNote
        createdAt
        updatedAt
      }
    }
  }
`;

const MathQuestion: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const [earnPoints, { loading }] = useMutation(EARN_POINTS_MUTATION);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setAnswer("");
    setMessage(null);
  };

  const handleSubmit = async () => {
    const correctAnswer = num1 + num2;

    if (parseInt(answer) === correctAnswer) {
      const currentCustomer = window.currentCustomer as Customer;

      try {
        const { data } = await earnPoints({
          variables: {
            input: {
              customerId: currentCustomer.id,
              pointsChange: 50,
              description: "Answered the math question correctly",
            },
          },
        });

        if (data.earnPoints.success) {
          setMessage("Congratulations! You earned 50 points!");
          onSuccess();
          setTimeout(generateQuestion, 2000);
        } else {
          setMessage("Error earning points: " + data.earnPoints.message);
        }
      } catch (error) {
        console.error("Error earning points:", error);
        setMessage("An error occurred. Please try again.");
      }
    } else {
      setMessage("Sorry! That's not the correct answer. Try again.");
    }
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-md font-semibold mb-4">Answer a Math Question to Earn Points!</h2>
      <p className="mb-2">{`What is ${num1} + ${num2}?`}</p>
      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Your answer"
        className="border p-2 rounded mb-4 w-full"
      />
      <button
        className="primary-button text-white px-4 py-2 rounded"
        onClick={handleSubmit}
        disabled={loading}
      >
        Submit
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default MathQuestion;
