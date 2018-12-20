import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './login.styles.css';
import Images from '../../assets/Images';
import TextInput from '../../components/TextInput';
import LoginButton from '../../components/LoginButton';
import Spinner from '../../components/Spinner';
import API from '../../services/Api';

class LoginPage extends Component {
  state = {
    userNumber: '',
    pinCode: '',
    login: false,
    loading: false
  };

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLogin = async () => {
    const { userNumber, pinCode } = this.state;

    this.setState({ loading: true });

    try {
      const res = await API.login(userNumber, pinCode);
      console.log(res);
    } catch (e) {
      this.setState({ loading: false });
      window.alert(e);
      console.error(e);
    }
    // setTimeout(() => this.setState({ login: true, loading: false }), 2000);
  };

  render() {
    const { userNumber, pinCode, login, loading } = this.state;

    if (login) return <Redirect to="/main" />;

    return (
      <div className="login-page">
        <div className="login-page__content">
          {loading && <Spinner />}

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
              type="password"
            />
          </div>

          <div className="content__button-container">
            <LoginButton onClick={this.onLogin} disabled={loading} />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
