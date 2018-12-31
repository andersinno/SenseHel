import React from 'react';
import './subscriptions.styles.css';
import AppHeader from '../../components/AppHeader';
import OfferedServiceCard from '../../components/OfferedServiceCard';
import Images from '../../assets/Images';

const offeredServices = [
  {
    image: Images.Placeholder,
    name: 'Service name',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod',
    price: 'Free',
    benefit: {
      short: 5,
      long:
        '5% Increase in energy saving\nLorem ipsum dolarament huyg the shutg saudt hut'
    },
    requiredSensors: 'Temperature / Something'
  },
  {
    image: Images.Placeholder,
    name: 'Service name',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod',
    price: 'Free',
    benefit: {
      short: 5,
      long:
        '5% Increase in energy saving\nLorem ipsum dolarament huyg the shutg saudt hut'
    },
    requiredSensors: 'Temperature / Something'
  },
  {
    image: Images.Placeholder,
    name: 'Service name',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod',
    price: 'Free',
    benefit: {
      short: 5,
      long:
        '5% Increase in energy saving\nLorem ipsum dolarament huyg the shutg saudt hut'
    },
    requiredSensors: 'Temperature / Something'
  },
  {
    image: Images.Placeholder,
    name: 'Service name',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod',
    price: 'Free',
    benefit: {
      short: 5,
      long:
        '5% Increase in energy saving\nLorem ipsum dolarament huyg the shutg saudt hut'
    },
    requiredSensors: 'Temperature / Something'
  }
];

const SubscriptionsPage = () => (
  <div className="subscriptions-page">
    <AppHeader headline="SUBSCRIPTION LIST" title="OFFERED SERVICES" />

    <div className="subscriptions-page__content tab-page__content">
      {offeredServices.map(service => (
        <OfferedServiceCard
          image={service.image}
          name={service.name}
          description={service.description}
          price={service.price}
          benefit={service.benefit}
          requiredSensors={service.requiredSensors}
        />
      ))}
    </div>
  </div>
);

export default SubscriptionsPage;
