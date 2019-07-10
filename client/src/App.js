import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Project from "./pages/Project";
import API from "./utils/API";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";

import './style.css'

class App extends Component {
  state = {
    isLoggedIn: ""
  };

  componentWillMount() {
    this.getLoginStatus();
  }

  getLoginStatus = () => {
    API.isLoggedIn()
      .then(status => {
        return this.setState({ isLoggedIn: status });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        {this.state.isLoggedIn !== "" ? (
          <div className="app">
            <BrowserRouter>
              <PrivateRoute
                isAuthenticated={this.state.isLoggedIn}
                exact
                path="/"
                component={Profile}
              />
              <PrivateRoute
                isAuthenticated={this.state.isLoggedIn}
                path="/project/:id"
                component={Project}
              />
              <Route exact path="/welcome" component={Landing} />
            </BrowserRouter>
          </div>
        ) : null}
      </>
    );
  }
}

export default App;
