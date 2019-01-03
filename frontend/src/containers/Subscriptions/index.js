import React, { Component } from 'react';
import './subscriptions.styles.css';
import AppHeader from '../../components/AppHeader';
import OfferedServiceCard from '../../components/OfferedServiceCard';
import Images from '../../assets/Images';
import CustomizedSnackbar from '../../components/Snackbar';

const offeredServices = [
  {
    image: Images.Placeholder,
    name: 'Service name 1',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod',
    price: 'Free',
    benefit: {
      short: 5,
      long:
        '5% Increase in energy saving\nLorem ipsum dolarament huyg the shutg saudt hut'
    },
    requiredSensors: 'Temperature / Something',
    termsAndConditions: 'http://example.com',
    privacyPolicy: 'http://example.com'
  },
  {
    image: Images.Placeholder,
    name: 'Service name 2',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod',
    price: 'Free',
    benefit: {
      short: 5,
      long:
        '5% Increase in energy saving\nLorem ipsum dolarament huyg the shutg saudt hut'
    },
    requiredSensors: 'Temperature / Something',
    termsAndConditions: 'http://example.com',
    privacyPolicy: 'http://example.com'
  },
  {
    image: Images.Placeholder,
    name: 'Service name 3',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod',
    price: 'Free',
    benefit: {
      short: 5,
      long:
        '5% Increase in energy saving\nLorem ipsum dolarament huyg the shutg saudt hut'
    },
    requiredSensors: 'Temperature / Something',
    termsAndConditions: 'http://example.com',
    privacyPolicy: 'http://example.com'
  },
  {
    image: Images.Placeholder,
    name: 'Service name 4',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod',
    price: 'Free',
    benefit: {
      short: 5,
      long:
        '5% Increase in energy saving\nLorem ipsum dolarament huyg the shutg saudt hut'
    },
    requiredSensors: 'Temperature / Something',
    termsAndConditions: 'http://example.com',
    privacyPolicy: 'http://example.com'
  }
];

class SubscriptionsPage extends Component {
  state = {
    successMessage: '',
    errorMessage: ''
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
    const { errorMessage, successMessage } = this.state;

    return (
      <div className="subscriptions-page">
        <AppHeader headline="SUBSCRIPTION LIST" title="OFFERED SERVICES" />

        <div className="subscriptions-page__content tab-page__content">
          {offeredServices.map(service => (
            <OfferedServiceCard
              key={service.name}
              image={service.image}
              name={service.name}
              description={service.description}
              price={service.price}
              benefit={service.benefit}
              requiredSensors={service.requiredSensors}
              termsAndConditions={service.termsAndConditions}
              privacyPolicy={service.privacyPolicy}
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
