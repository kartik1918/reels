import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import Feed from "./components/Feed";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgotPassword" component={ForgotPassword}/>
            <PrivateRoute path="/profile/:id" component={Profile} />
            <PrivateRoute path="/" component={Feed} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
