import React from 'react';
import './home.styles.css';
import AppHeader from '../../components/AppHeader';
import SubscribedServiceCard from '../../components/SubscribedServiceCard';

const HomePage = () => (
  <div className="home-page">
    <AppHeader
      headline="PAULI TOIVONEN"
      title={`URHO KEKKOSEN KATU 7B,\nHELSINKI`}
      hasBgImage
    />

    <div className="home-page__cards-container">
      <SubscribedServiceCard />
      <SubscribedServiceCard />
      <SubscribedServiceCard />
    </div>
  </div>
);

export default HomePage;
