import React, { Component } from 'react';
import _ from 'lodash';
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
    errorMessage: '',
    subscriptions: []
  };

  handlePermissionUpdate = async (data) => {
    try {
      await API.updateDatastreamPermissions(data)
      this.handleRequestSuccess({
        title: 'Successfully updated!',
        subtitle: 'You have successfully updated the datastream consent.'
      });
    } catch (e) {
      this.handleRequestFail({
        title: 'Could not update datastream consent.',
        subtitle: `${e.message}`
      });
    }
  }

  async componentDidMount() {
    this.updateWithPersistedServices();
    await this.fetchServices();
    await this.fetchSubscribedServiceIds();
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
        JSON.stringify(services)
      );
      this.setState({ services });
    } catch (e) {
      this.setState({
        errorMessage: {
          title: 'Fetching services failed',
          subtitle: `${e.message}`
        }
      });
    }
  };

  fetchSubscribedServiceIds = () => {
    const subscriptionsStr = localStorage.getItem(
      LocalStorageKeys.SUBSCRIBED_SERVICES
    );
    const subscriptions = _.map(
      JSON.parse(subscriptionsStr),
      _.partialRight(_.pick, ['id', 'service.id'])
    );

    this.setState({ subscriptions });
  };

  isSubscribed = serviceId => {
    const { subscriptions } = this.state;

    return _.map(subscriptions, 'service.id').includes(serviceId);
  };

  getSubscriptionId = serviceId => {
    const { subscriptions } = this.state;

    const subscription = _.find(subscriptions, s => s.service.id === serviceId);

    if (subscription) return subscription.id;

    throw new Error(
      'Subscription does not exist. Please refresh your browser and try again.'
    );
  };

  handleSnackbarClose = () => {
    this.setState({ errorMessage: '', successMessage: '' });
  };

  handleRequestFail = message => {
    this.setState({
      errorMessage: message,
      successMessage: ''
    });
  };

  handleRequestSuccess = message => {
    this.setState({
      errorMessage: '',
      successMessage: message
    });
  };

  handleSubscribe = async (id, url, permissions) => {
    try {
      await API.addSubscribedService(id, url, permissions);
      this.handleRequestSuccess({
        title: 'Successfully subscribed!',
        subtitle: 'You can now view your subscriptions in your home page'
      });

      await this.refetchSubscriptions();
    } catch (e) {
      this.handleRequestFail({
        title: 'Could not subscribe to service',
        subtitle: `${e.message}`
      });
    }
  };

  handleUnsubscribe = async id => {
    try {
      const subscriptionId = this.getSubscriptionId(id);
      await API.deleteSubscribedService(subscriptionId);

      this.handleRequestSuccess('Successfully unsubscribed');

      await this.refetchSubscriptions();
    } catch (e) {
      this.handleRequestFail({
        title: 'Could not unsubscribe from service',
        subtitle: `${e.message}`
      });
    }
  };

  refetchSubscriptions = async () => {
    // Refetch subscribed services and set state to rerender
    await API.getSubscribedServices();
    this.fetchSubscribedServiceIds();
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
              datastreams={service.datastreams}
              subscribed={this.isSubscribed(service.id)}
              handleSubscribe={(serviceId, serviceUrl, dataStreamConsent) => this.handleSubscribe(serviceId, serviceUrl, dataStreamConsent)}
              handleUnsubscribe={() => this.handleUnsubscribe(service.id)}
              handlePermissionUpdate={this.handlePermissionUpdate}
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
