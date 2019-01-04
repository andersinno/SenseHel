import React, { Component } from 'react';
import './home.styles.css';
import AppHeader from '../../components/AppHeader';
import SensorValueCard from '../../components/SensorValueCard';
import Icons from '../../assets/Icons';
import SubscribedServiceCard from '../../components/SubscribedServiceCard';
import NoSubscriptionsCard from '../../components/NoSubscriptionsCard';

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

const mockSubscriptions = [
  // {
  //   name: 'Service name 1',
  //   logo: Images.Placeholder,
  //   serviceImage: Images.Placeholder_Long,
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mi enim, vestibulum nec mollis non, ultrices at elit consectetur semper. Proin auctor metus risus, at cursus magna tempor eu. Nulla ac ornare elit, in vulputate.',
  //   link: 'http://example.com'
  // },
  // {
  //   name: 'Service name 2',
  //   logo: Images.Placeholder,
  //   serviceImage: Images.Placeholder_Long,
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mi enim, vestibulum nec mollis non, ultrices at elit consectetur semper. Proin auctor metus risus, at cursus magna tempor eu. Nulla ac ornare elit, in vulputate.',
  //   link: 'http://example.com'
  // },
  // {
  //   name: 'Service name 3',
  //   logo: Images.Placeholder,
  //   serviceImage: Images.Placeholder_Long,
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mi enim, vestibulum nec mollis non, ultrices at elit consectetur semper. Proin auctor metus risus, at cursus magna tempor eu. Nulla ac ornare elit, in vulputate.',
  //   link: 'http://example.com'
  // }
];

class HomePage extends Component {
  state = {
    refreshing: false
  };

  handleChangeTab = () => {
    const { changeTab } = this.props;
    setTimeout(() => changeTab(1), 800);
  };

  render() {
    const { refreshing } = this.state;

    return (
      <div className="home-page">
        <AppHeader
          headline="PAULI TOIVONEN"
          title={`URHO KEKKOSEN KATU 7B,\nHELSINKI`}
          hasBgImage
        />

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

            {mockSubscriptions.length > 0 ? (
              mockSubscriptions.map(s => (
                <SubscribedServiceCard
                  key={s.name}
                  logo={s.logo}
                  title={s.name}
                  description={s.description}
                  serviceImage={s.serviceImage}
                  url={s.link}
                />
              ))
            ) : (
              <NoSubscriptionsCard onClick={this.handleChangeTab} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
