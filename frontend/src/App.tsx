import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";

import BasePage from "./pages/BasePage";
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <React.StrictMode>
          <Router>
            <BasePage pageName="Dashboard">
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </BasePage>
          </Router>
        </React.StrictMode>
      </ApolloProvider>
    </>
  );
}

export default App;
