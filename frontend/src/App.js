import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute>
              <Login />
            </PublicRoute>} />
        <Route path="/Login" element={<PublicRoute>
              <Login />
            </PublicRoute>} />

        <Route
          path="/DashBoard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;