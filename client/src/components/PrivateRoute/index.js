import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({
  component: Component,
  isAuthenticated,
  isLoading,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
}

export default PrivateRoute;
