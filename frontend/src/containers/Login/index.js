import React, { Component } from 'react';

import './login.styles.css';
import Images from '../../assets';
import TextInput from '../../components/TextInput';
import LoginButton from '../../components/LoginButton';

class Index extends Component {
  state = {
    userNumber: '',
    pinCode: ''
  };

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLogin = () => {};

  render() {
    const { userNumber, pinCode } = this.state;

    return (
      <div className="login-page">
        <div className="login-page__content">
          <img className="content__img-logo" src={Images.Logo} alt="logo" />

          <div className="content__input-container">
            <TextInput
              placeholder="User number"
              name="userNumber"
              value={userNumber}
              onChange={this.onChangeInput}
            />

            <TextInput
              placeholder="PIN code"
              name="pinCode"
              value={pinCode}
              onChange={this.onChangeInput}
            />
          </div>

          <div className="content__button-container">
            <LoginButton />
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
