import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
