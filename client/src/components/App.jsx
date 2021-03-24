import React from "react";
import { Route, Switch } from "react-router-dom";
import MainNavbar from "./MainNavbar";
import Home from "./pages/Home";
import List from "./pages/List";
import AddCountry from "./pages/AddCountry";
import Secret from "./pages/Secret";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

class App extends React.Component {
  state = {
    user: null,
    isLoggedIn: null,
    isLoading: true,
  };

  render() {
    return (
      <div className="App">
        <MainNavbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/list" component={List} />
          <Route exact path="/add-country" component={AddCountry} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/secret" component={Secret} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
