import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Auth from "./components/Auth";
import API from "./utils/API";

class App extends Component {
  state = {
    isLoggedIn: false,
    user: {}
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    API.getUser()
      .then(user => {
        console.log(user);

        if (user.error) {
          console.log("failed to fetch user");
          return;
        }
        this.setState({ isLoggedIn: true, user: user });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Route
            exact
            path="/"
            component={
              !this.state.isLoggedIn
                ? () => <Auth />
                : () => <div>Logged In!</div>
            }
          />
          <Route exact path="/login" component={() => <Auth />} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
