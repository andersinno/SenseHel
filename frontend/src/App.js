import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './theme/Fonts.css';
import './theme/Colors.css';

// Routes
import LoginPage from './containers/Login';
import Tabs from './containers/Tabs';

const App = () => (
  <Router>
    <div>
      <Route path="/" exact component={LoginPage} />
      <Route path="/main" component={Tabs} />
    </div>
  </Router>
);

export default App;
