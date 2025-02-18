import { gql, useQuery } from "@apollo/client";

import Balance from '../components/Balance';

const GET_CUSTOMER_POINTS = gql`
  query GetCustomerPoints {
    customerPoints
  }
`;

function Dashboard() {
  const { loading, error, data } = useQuery(GET_CUSTOMER_POINTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error fetching points</p>;

  return (
    <div className="grid grid-cols-12 gap-6 mt-8">
      <Balance customerPoints={ data?.customerPoints } />
    </div>
  );
}

export default Dashboard;