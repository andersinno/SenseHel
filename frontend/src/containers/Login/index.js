import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

import './login.styles.css';
import Images from '../../assets/Images';
import TextInput from '../../components/TextInput';
import LoginButton from '../../components/LoginButton';
import API from '../../services/Api';
import CustomizedSnackbar from '../../components/Snackbar';
import LocalStorageKeys from '../../config/LocalStorageKeys';

class LoginPage extends Component {
  state = {
    userNumber: '',
    pinCode: '',
    login: false,
    loading: false,
    errorMessage: ''
  };

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLogin = async () => {
    const { userNumber, pinCode } = this.state;

    this.setState({ loading: true });

    try {
      await API.login(userNumber, pinCode);

      this.setState({ login: true, loading: false });
    } catch (error) {
      this.setState({ loading: false });
      this.handleLoginFail(error);
    }
  };

  handleLoginFail = error => {
    const errorMessage = _.get(error, 'response.data.error', error);

    this.setState({
      errorMessage: {
        title: 'Login Failed',
        subtitle: `${errorMessage}`
      }
    });
  };

  handleSnackbarClose = () => {
    this.setState({ errorMessage: '' });
  };

  render() {
    const currentUser = localStorage.getItem(LocalStorageKeys.CURRENT_USER);
    const { userNumber, pinCode, login, loading, errorMessage } = this.state;

    if (login || (currentUser && currentUser !== 'undefined'))
      return <Redirect to="/" />;

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
              type="password"
            />
          </div>

          <div className="content__button-container">
            <LoginButton
              onClick={this.onLogin}
              disabled={loading}
              loading={loading}
            />
          </div>
        </div>

        <CustomizedSnackbar
          message={errorMessage}
          variant="error"
          handleClose={this.handleSnackbarClose}
          open={!!errorMessage}
        />
      </div>
    );
  }
}

export default LoginPage;
