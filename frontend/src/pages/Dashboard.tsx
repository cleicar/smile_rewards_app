import { Balance } from '../components/Balance';

function Dashboard() {
  const points = 200;

  return (
    <div className="grid grid-cols-12 gap-6 mt-8">
      <Balance points={points} />
    </div>
  );
}

export default Dashboard;