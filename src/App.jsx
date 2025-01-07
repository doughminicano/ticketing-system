import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/TicketsPage";
import Navbar from "./components/Navbar";
import IssuePage from "./pages/IssuePage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Page doesn't have the Navbar */}
        <Route path="/" element={<LoginPage />} />

        {/* Routes with Navbar */}
        <Route element={<Navbar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/issue" element={<IssuePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
