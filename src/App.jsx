import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Login from "./Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import CreateProjectWizard from "./Pages/CreateProject/CreateProjectWizard";
import Settings from "./Pages/Settings.jsx";
import Account from "./Pages/Account.jsx";
import Logout from "./Pages/Logout.jsx";
import Portfolio from "./Pages/Portfolio.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreateProjectWizard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />

      <Route
        path="/logout"
        element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        }
      />

      {/* Public Portfolio */}
      <Route path="/portfolio/:userId" element={<Portfolio />} />

    </Routes>
  );
}

export default App;
