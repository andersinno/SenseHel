import React from 'react';
import './loginbutton.styles.css';

const LoginButton = ({ ...props }) => (
  <button className="button" type="submit" {...props}>
    <p className="large-body">SIGN IN</p>
  </button>
);

export default LoginButton;
