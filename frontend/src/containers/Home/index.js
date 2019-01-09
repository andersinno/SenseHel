import React, { Component } from 'react';
import './home.styles.css';
import AppHeader from '../../components/AppHeader';
import SensorValueCard from '../../components/SensorValueCard';
import Icons from '../../assets/Icons';
import SubscribedServiceCard from '../../components/SubscribedServiceCard';
import NoSubscriptionsCard from '../../components/NoSubscriptionsCard';
import PullToRefresh from '../../components/PullToRefresh';
import API from '../../services/Api';
import CustomizedSnackbar from '../../components/Snackbar';
import LocalStorageKeys from '../../config/LocalStorageKeys';

const mockSensorValues = [
  {
    title: 'Temperature',
    icon: Icons.Temperature_Normal,
    value: 23,
    unit: '℃',
    lastUpdated: '20 seconds ago'
  },
  {
    title: 'Humidity',
    icon: Icons.Humidity_Normal,
    value: 40,
    unit: '%',
    lastUpdated: '10 min ago'
  },
  {
    title: 'Carbon Dioxide',
    icon: Icons.CO2_Normal,
    value: 300,
    unit: 'ppm',
    lastUpdated: '40 min ago'
  }
];

class HomePage extends Component {
  state = {
    subscribedServices: [],
    refreshing: false,
    errorMessage: '',
    name: '',
    address: ''
  };

  async componentDidMount() {
    this.updateName();
    await this.fetchSubscribedServices();
    await this.fetchApartment();
  }

  updateName = () => {
    const currentUser = JSON.parse(
      localStorage.getItem(LocalStorageKeys.CURRENT_USER)
    );
    const name = `${currentUser.first_name} ${currentUser.last_name}`;
    this.setState({ name });
  };

  fetchSubscribedServices = async () => {
    try {
      const subscribedServices = await API.getSubscribedServices();
      this.setState({ subscribedServices });
    } catch (e) {
      this.setState({
        errorMessage: {
          title: 'Could not fetch subscribed services',
          subtitle: `${e.message}`
        }
      });
    }
  };

  fetchApartment = async () => {
    try {
      const apartment = await API.getApartment();
      const address = `${apartment.street}\n${apartment.city}`;
      this.setState({ address });
    } catch (e) {
      this.setState({
        errorMessage: {
          title: 'Could not fetch address',
          subtitle: `${e.message}`
        }
      });
    }
  };

  handleChangeTab = () => {
    const { changeTab } = this.props;
    setTimeout(() => changeTab(1), 800);
  };

  onRefresh = () =>
    new Promise(async resolve => {
      await this.fetchSubscribedServices();
      setTimeout(resolve, 2000);
    });

  render() {
    const {
      subscribedServices,
      refreshing,
      errorMessage,
      name,
      address
    } = this.state;

    return (
      <PullToRefresh onRefresh={this.onRefresh}>
        <div className="home-page">
          <AppHeader headline={name} title={address} hasBgImage />

          <div className="home-page__content tab-page__content">
            <div className="home-page__cards-container">
              {mockSensorValues.map(s => (
                <SensorValueCard
                  key={s.title}
                  title={s.title}
                  icon={s.icon}
                  value={s.value}
                  unit={s.unit}
                  lastUpdated={s.lastUpdated}
                  refreshing={refreshing}
                />
              ))}
            </div>

            <div className="home-page__subscriptions-container">
              <p className="title dark-text left-aligned home-page__subscription-title">
                subscriptions
              </p>

              {subscribedServices.length > 0 ? (
                subscribedServices.map(s => (
                  <SubscribedServiceCard
                    key={s.name}
                    logo={s.img_logo_url}
                    title={s.name}
                    description={s.description}
                    serviceImage={s.img_service_url}
                    url={s.link}
                  />
                ))
              ) : (
                <NoSubscriptionsCard onClick={this.handleChangeTab} />
              )}
            </div>
          </div>

          <CustomizedSnackbar
            message={errorMessage}
            variant="error"
            handleClose={() => this.setState({ errorMessage: '' })}
            open={!!errorMessage}
          />
        </div>
      </PullToRefresh>
    );
  }
}

export default HomePage;
