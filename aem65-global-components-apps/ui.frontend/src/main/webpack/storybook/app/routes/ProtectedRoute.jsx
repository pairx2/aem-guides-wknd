import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import ThemeGlobals from '../models/ThemeGlobals';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        ThemeGlobals.hasTheme() ? <Component {...props} /> : <Redirect to="/new-theme" />
      }
    />
  )
}

export default ProtectedRoute;
