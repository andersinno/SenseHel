import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './login.styles.css';
import Images from '../../assets/Images';
import TextInput from '../../components/TextInput';
import LoginButton from '../../components/LoginButton';

class Index extends Component {
  state = {
    userNumber: '',
    pinCode: '',
    login: false
  };

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLogin = () => {
    setTimeout(() => this.setState({ login: true }), 2000);
  };

  render() {
    const { userNumber, pinCode, login } = this.state;

    if (login) return <Redirect to="/main" />;

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
            <LoginButton onClick={this.onLogin} />
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
