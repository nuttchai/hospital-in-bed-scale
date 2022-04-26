import React, { useEffect } from "react";
import "./App.css";

import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {
  useEffect(() => {
    document.title = "Patient Weight Tracker";
  }, []);

  return (
    <div className="app-container">
      <Dashboard />
    </div>
  );
};

export default App;
