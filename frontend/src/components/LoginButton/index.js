import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import './loginbutton.styles.css';

const LoginButton = ({ loading, ...props }) => (
  <button className="button" type="submit" {...props}>
    {loading ? (
      <CircularProgress className="login-button__loader" />
    ) : (
      <p className="large-body">SIGN IN</p>
    )}
  </button>
);

export default LoginButton;
