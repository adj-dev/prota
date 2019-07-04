import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Auth from "./components/Auth";
import Project from "./pages/Project";
import API from "./utils/API";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
// import ProjectTest from "./pages/ProjectTest";

class App extends Component {
  state = {
    isLoggedIn: ""
  };

  componentWillMount() {
    // console.log("mounting");
    // console.log("Logged In?", this.state.isLoggedIn);
    this.getLoginStatus();
  }
  componentDidUpdate() {
    // console.log("Component mounted! State:");
    // console.log(this.state);
  }

  getLoginStatus = async () => {
    await API.isLoggedIn()
      .then(status => {
        return this.setState({ isLoggedIn: status });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        {this.state.isLoggedIn !== "" ? (
          <div className="app" style={{ height: 100 }}>
            <BrowserRouter>
              <PrivateRoute
                isAuthenticated={this.state.isLoggedIn}
                exact
                path="/"
                component={() => (
                  <>
                    <NavBar />
                    <Profile />
                  </>
                )}
              />
              <PrivateRoute
                isAuthenticated={this.state.isLoggedIn}
                // id={this.state.projectId}
                path="/project/:id"
                component={({ match }) => (
                  <>
                    {console.log("Match: ", match)}
                    <NavBar />
                    <Project match={match} />
                  </>
                )}
              />
              <Route exact path="/login" component={Auth} />
            </BrowserRouter>
          </div>
        ) : null}
      </>
    );
  }
}

export default App;
