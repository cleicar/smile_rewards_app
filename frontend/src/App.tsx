import BasePage from "./pages/BasePage";
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <BasePage pageName="Dashboard">
        <Dashboard />
      </BasePage>
    </>
  );
}

export default App;
