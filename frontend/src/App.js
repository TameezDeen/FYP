import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//Pages
import Home from "./Home";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import Questionnaire from "./pages/questionnaire/Questionnaire";
import SongsPage from "./pages/main/SongsPage";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/questionnaire"
              element=<Questionnaire /> />
              
            <Route
            path="/songspage"
            element =<SongsPage/> />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
