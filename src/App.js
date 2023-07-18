import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// Components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
// React-redux
import { useSelector } from "react-redux";
import SocketProvider from "./contexts/SocketContext";
import Test from "./pages/Test";

function App() {
  const { user } = useSelector((state) => state.user);
  const { files } = useSelector((state) => state.chat);
  const { token } = user;

  return (
    <div className="dark">
      <SocketProvider>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={token ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/login"
              element={!token ? <Login /> : <Navigate to="/" />}
            />
            <Route
              exact
              path="/register"
              element={!token ? <Register /> : <Navigate to="/" />}
            />
            <Route
              exact
              path="/test"
              element={<Test />}
            />
          </Routes>
        </Router>
      </SocketProvider>
    </div>
  );
}

export default App;
