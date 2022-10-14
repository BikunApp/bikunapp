import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />

        <Route exact path="*" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
