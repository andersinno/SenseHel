import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './about.styles.css';
import AppHeader from '../../components/AppHeader';
import Images from '../../assets/Images';
import BottomButton from '../../components/BottomButton';
import ConfirmDialog from '../../components/ConfirmDialog';
import CustomizedSnackbar from '../../components/Snackbar';
import API from '../../services/Api';

class AboutPage extends Component {
  state = {
    logoutConfirmOpen: false,
    revokeConfirmOpen: false,
    revoking: false,
    errorMessage: '',
    successMessage: '',
    revoked: false,
    loggedOut: false
  };

  onLogout = () => {
    this.setState({ logoutConfirmOpen: true });
  };

  onRevokeApartment = () => {
    this.setState({ revokeConfirmOpen: true });
  };

  onCloseConfirm = () => {
    this.setState({ logoutConfirmOpen: false, revokeConfirmOpen: false });
  };

  onCloseSnackbar = () => {
    this.setState({ errorMessage: '', successMessage: '' });
  };

  handleLogout = () => {
    localStorage.clear();
    API.setToken('');
    this.setState({ loggedOut: true });
  };

  handleRevokeApartment = async () => {
    this.setState({ revoking: true, revokeConfirmOpen: false });

    try {
      await API.revokeApartment();
      this.setState({ revoking: false });
      this.handleRevokeSuccess();

      setTimeout(() => this.handleLogout(), 5000);
    } catch (e) {
      this.handleRevokeFail(e);
    }
  };

  handleRevokeSuccess = () => {
    this.setState({
      successMessage: {
        title: 'Successfully revoked apartment',
        subtitle:
          'All your information has been erased. You will be logged out in 5 seconds'
      },
      errorMessage: ''
    });
  };

  handleRevokeFail = e => {
    this.setState({
      errorMessage: {
        title: 'Revoke Apartment unsuccessful',
        subtitle: `${e.message}`
      }
    });
  };

  render() {
    const {
      revokeConfirmOpen,
      logoutConfirmOpen,
      revoking,
      revoked,
      loggedOut,
      errorMessage,
      successMessage
    } = this.state;

    if (loggedOut) return <Redirect to="/login" />;

    return (
      <div className="about-page">
        <AppHeader headline="ABOUT" />

        <div className="about-page__content tab-page__content">
          <div className="section-container">
            <p className="subheader dark-text">Lorem ipsum</p>
            <p className="body-text dark-text about-page__text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              volutpat enim quis ante lobortis tristique. Pellentesque egestas,
              arcu vitae hendrerit sagittis, nulla enim varius libero, et
              viverra lacus magna eu nisi. Nunc ac ullamcorper dui, quis blandit
              arcu. Praesent aliquam ullamcorper fringilla. Aenean rhoncus purus
              quis varius fringilla. Pellentesque habitant morbi tristique
              senectus et netus et malesuada fames ac turpis egestas. Vivamus
              dui nulla, dapibus vestibulum porttitor et, lacinia eu augue.
              Integer elit sem, pulvinar id lorem venenatis, euismod tincidunt
              massa. Aliquam nec sapien a elit posuere placerat. Quisque ac
              congue augue, et tristique metus.
            </p>
            <img
              src={Images.Banner}
              alt="logo"
              className="about-page__img--banner"
            />
          </div>

          <div className="section-container">
            <p className="subheader dark-text">Building Owner</p>
            <p className="body-text dark-text about-page__text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              volutpat enim quis ante lobortis tristique.
            </p>
            <p className="body-text dark-text">Call - +358 46 9999999</p>
            <p className="body-text dark-text">
              Email -{' '}
              <a href="mailto:service@forumvirium.fi">service@forumvirium.fi</a>
            </p>
          </div>

          <div className="section-container no-border">
            <p className="subheader dark-text">Log out</p>
            <p className="body-text dark-text about-page__text">
              Log out of this app
            </p>
          </div>

          <BottomButton title="Log out" onClick={this.onLogout} />

          <div className="section-container no-border">
            <p className="subheader dark-text">Revoke Apartment</p>
            <p className="body-text dark-text about-page__text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              volutpat enim quis ante lobortis tristique. Pellentesque egestas.
            </p>
          </div>

          <BottomButton
            title={revoking ? 'revoking' : 'revoke apartment'}
            onClick={this.onRevokeApartment}
            variant="negative"
            loading={revoking}
            disabled={revoked}
          />
        </div>

        <ConfirmDialog
          title="Are you sure you want to delete your aparment?"
          description="This will lorem ipsum dolor amet euphi nibh turs"
          handleConfirm={this.handleRevokeApartment}
          open={revokeConfirmOpen}
          handleClose={this.onCloseConfirm}
        />

        <ConfirmDialog
          title="Are you sure you want to logout?"
          description="You will be redirected to login screen"
          handleConfirm={this.handleLogout}
          open={logoutConfirmOpen}
          handleClose={this.onCloseConfirm}
        />

        <CustomizedSnackbar
          message={errorMessage}
          variant="error"
          handleClose={this.onCloseSnackbar}
          open={!!errorMessage}
        />

        <CustomizedSnackbar
          message={successMessage}
          variant="success"
          handleClose={this.onCloseSnackbar}
          open={!!successMessage}
        />
      </div>
    );
  }
}

export default AboutPage;
