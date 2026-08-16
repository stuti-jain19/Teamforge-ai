import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>

        <div className="absolute top-1/2 left-1/2 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl"></div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;