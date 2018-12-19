import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './theme/Fonts.css';

// Routes
import LoginPage from './containers/Login';

const App = () => (
  <Router>
    <div>
      <Route path="/" exact component={LoginPage} />
    </div>
  </Router>
);

export default App;
