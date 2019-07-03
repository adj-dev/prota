import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Auth from "./components/Auth";
import API from "./utils/API";
import Project from './pages/Project';
//import mockAPI from "./utils/mockAPI";
import Profile from "./pages/Profile";
// import ProjectTest from "./pages/ProjectTest";

class App extends Component {
  state = {
    isLoggedIn: true
  };

  componentDidMount() {
    // console.log("mounting");
    // console.log("Logged In?", this.state.isLoggedIn);
    this.getLoginStatus();
  }
  componentDidUpdate() {
    // console.log("Component mounted! State:");
    // console.log(this.state);
  }

  getLoginStatus = () => {
    API
      .isLoggedIn()
      .then(status => {
        return this.setState({ isLoggedIn: status });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="app" style={{ height: 100 }}>
        <BrowserRouter>
          <PrivateRoute
            isAuthenticated={this.state.isLoggedIn}
            exact
            path="/"
            component={Profile}
          />
          <PrivateRoute
            isAuthenticated={this.state.isLoggedIn}
            // id={this.state.projectId}
            path="/project/:id"
            component={Project}
          />
          <Route exact path="/login" component={Auth} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
