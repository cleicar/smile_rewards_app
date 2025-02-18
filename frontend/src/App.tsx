import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BasePage from "./pages/BasePage";
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Router>
        <BasePage pageName="Dashboard">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BasePage>
      </Router>
    </>
  );
}

export default App;
