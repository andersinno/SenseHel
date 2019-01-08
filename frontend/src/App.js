import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect, Switch } from 'react-router';
import './theme/Fonts.css';
import './theme/Colors.css';

// Routes
import LoginPage from './containers/Login';
import Tabs from './containers/Tabs';
import API from './services/Api';
import LocalStorageKeys from './config/LocalStorageKeys';

const ProtectedRoute = ({ component, ...rest }) => {
  const authToken = localStorage.getItem(LocalStorageKeys.AUTH_TOKEN);

  if (authToken) {
    return <Route component={component} {...rest} />;
  }

  // Not logged in, redirect to login page
  const renderer = () => <Redirect to="/login" />;

  return <Route render={renderer} {...rest} />;
};

class App extends Component {
  async componentWillMount() {
    const authToken = localStorage.getItem(LocalStorageKeys.AUTH_TOKEN);
    if (authToken) await API.setToken(authToken);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={LoginPage} />
          <ProtectedRoute path="/" component={Tabs} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
