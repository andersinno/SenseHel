import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect, Switch } from 'react-router';
import './theme/Fonts.css';
import './theme/Colors.css';

// Routes
import LoginPage from './containers/Login';
import Tabs from './containers/Tabs';

const ProtectedRoute = ({ component, ...rest }) => {
  const loggedIn = localStorage.getItem('@AUTH_TOKEN');

  if (loggedIn) {
    return <Route component={component} {...rest} />;
  }

  // Not logged in, redirect to login page
  const renderer = () => <Redirect to="/" />;

  return <Route render={renderer} {...rest} />;
};

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={LoginPage} />
      <ProtectedRoute path="/main" component={Tabs} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default App;
