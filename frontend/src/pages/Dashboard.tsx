import useSmileAuth from "../hooks/useSmileAuth";

import Balance from '../components/Balance';
import Rewards from '../components/Rewards';

export const Dashboard = () => {
  const { isAuthenticated, loading, error } = useSmileAuth();

  if ( loading || !isAuthenticated) return <p>Loading...</p>;
  if ( error) return <p className="text-red-500">Error fetching data</p>;

  return (
    <div className="grid grid-cols-12 gap-6 mt-8">
      <Balance />
      <Rewards customerPoints={ 0 }/>
    </div>
  );
}

export default Dashboard;