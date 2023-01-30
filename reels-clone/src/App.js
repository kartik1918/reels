import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import Feed from "./components/Feed";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/" component={Feed} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
