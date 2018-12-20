import React from 'react';
import './subscribedservicecard.styles.css';
import Icons from '../../assets/Icons';

const SubscribedServiceCard = () => (
  <div className="service-card">
    <div className="service-card__header">
      <span className="body-text">Temperature</span>
      <img
        className="service-card__header__icon"
        src={Icons.Temperature_Warning}
        alt="temperature"
      />
    </div>
  </div>
);

export default SubscribedServiceCard;
