import useSmileAuth from "../hooks/useSmileAuth";

import Balance from '../components/Balance';
import RewardsList from '../components/RewardsList';

export const Dashboard = () => {
  const { isAuthenticated, loading, error } = useSmileAuth();

  if ( !isAuthenticated ) return <p className="text-red-500">Waiting for authentication.</p>;
  if ( loading ) return <p>Loading...</p>;
  if ( error) return <p className="text-red-500">Error fetching data</p>;

  return (
    <div className="grid grid-cols-12 gap-6 mt-8">
      <Balance />
      <RewardsList />
    </div>
  );
}

export default Dashboard;