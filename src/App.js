import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function App() {
  const { user } = useSelector((state) => state.user);
  const { token} = user;

  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={token? <Home /> : <Navigate to="/login" />}
          ></Route>
          <Route
            exact
            path="/login"
            element={!token? <Login /> : <Navigate to="/" />}
          ></Route>
          <Route
            exact
            path="/register"
            element={!token? <Register /> : <Navigate to="/" />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
