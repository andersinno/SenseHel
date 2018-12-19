import React, { Component } from 'react';

import './login.styles.css';
import Images from '../../assets';
import TextInput from '../../components/TextInput';

class Index extends Component {
  onLogin = () => {};

  render() {
    return (
      <div className="login-page">
        <div className="login-page__content">
          <img className="content__img-logo" src={Images.Logo} alt="logo" />

          <div className="content__input-container">
            <TextInput placeholder="User number" />

            <TextInput placeholder="PIN code" />
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
