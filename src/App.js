import React from "react";
import "./App.css";

import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {
  return (
    <div className="app-container">
      <h1>Patient In Bed Scale Data</h1>
      <Dashboard />
    </div>
  );
};

export default App;
