import { gql, useQuery } from "@apollo/client";

import useSmileAuth from "../hooks/useSmileAuth";

import Balance from '../components/Balance';
import Rewards from '../components/Rewards';

const GET_CUSTOMER_POINTS = gql`
  query GetCustomerPoints {
    customerPoints
  }
`;

export const Dashboard = () => {
  const { isAuthenticated, loadingToken, errorToken } = useSmileAuth();

  const { loading, error, data } = useQuery(GET_CUSTOMER_POINTS);

  if (loading || loadingToken || !isAuthenticated) return <p>Loading...</p>;
  if (error || errorToken) return <p className="text-red-500">Error fetching data</p>;

  return (
    <div className="grid grid-cols-12 gap-6 mt-8">
      <Balance customerPoints={ data?.customerPoints } />
      <Rewards customerPoints={ data?.customerPoints }/>
    </div>
  );
}

export default Dashboard;