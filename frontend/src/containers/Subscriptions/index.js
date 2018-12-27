import React from 'react';
import './subscriptions.styles.css';
import AppHeader from '../../components/AppHeader';
import OfferedServiceCard from '../../components/OfferedServiceCard';

const SubscriptionsPage = () => (
  <div className="subscriptions-page">
    <AppHeader headline="SUBSCRIPTION LIST" title="OFFERED SERVICES" />

    <div className="subscriptions-page__content tab-page__content">
      <OfferedServiceCard />
      <OfferedServiceCard />
      <OfferedServiceCard />
      <OfferedServiceCard />
      <OfferedServiceCard />
    </div>
  </div>
);

export default SubscriptionsPage;
