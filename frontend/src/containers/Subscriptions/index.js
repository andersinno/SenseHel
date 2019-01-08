import React, { Component } from 'react';
import './subscriptions.styles.css';
import AppHeader from '../../components/AppHeader';
import OfferedServiceCard from '../../components/OfferedServiceCard';
import CustomizedSnackbar from '../../components/Snackbar';
import API from '../../services/Api';
import LocalStorageKeys from '../../config/LocalStorageKeys';

class SubscriptionsPage extends Component {
  state = {
    services: [],
    successMessage: '',
    errorMessage: ''
  };

  async componentDidMount() {
    this.updateWithPersistedServices();
    await this.fetchServices();
  }

  updateWithPersistedServices = () => {
    const persistedServices = localStorage.getItem(
      LocalStorageKeys.AVAILABLE_SERVICES
    );
    if (persistedServices) {
      this.setState({ services: JSON.parse(persistedServices) });
    }
  };

  fetchServices = async () => {
    try {
      const services = await API.getAvailableServices();
      localStorage.setItem(
        LocalStorageKeys.AVAILABLE_SERVICES,
        JSON.stringify(services.data)
      );
      this.setState({ services: services.data });
    } catch (e) {
      this.setState({
        errorMessage: {
          title: 'Fetching services failed',
          subtitle: `${e.message}`
        }
      });
    }
  };

  handleSnackbarClose = () => {
    this.setState({ errorMessage: '', successMessage: '' });
  };

  handleSubscribeFail = message => {
    this.setState({
      errorMessage: message,
      successMessage: ''
    });
  };

  handleSubscribeSuccess = message => {
    this.setState({
      errorMessage: '',
      successMessage: message
    });
  };

  render() {
    const { services, errorMessage, successMessage } = this.state;

    return (
      <div className="subscriptions-page">
        <AppHeader headline="SUBSCRIPTION LIST" title="OFFERED SERVICES" />

        <div className="subscriptions-page__content tab-page__content">
          {services.map(service => (
            <OfferedServiceCard
              key={service.id}
              service={service}
              onRequestFail={m => this.handleSubscribeFail(m)}
              onRequestSuccess={m => this.handleSubscribeSuccess(m)}
            />
          ))}
        </div>

        <CustomizedSnackbar
          message={errorMessage}
          variant="error"
          handleClose={this.handleSnackbarClose}
          open={!!errorMessage}
        />

        <CustomizedSnackbar
          message={successMessage}
          variant="success"
          handleClose={this.handleSnackbarClose}
          open={!!successMessage}
        />
      </div>
    );
  }
}
export default SubscriptionsPage;
