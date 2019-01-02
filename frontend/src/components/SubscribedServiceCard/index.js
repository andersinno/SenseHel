import React from 'react';
import './subscribedservicecard.styles.css';

const SubscribedServiceCard = ({ title, icon, value, unit, lastUpdated }) => (
  <div className="service-card">
    <div className="service-card__header">
      <span className="body-text">{title}</span>
      <img className="service-card__header__icon" src={icon} alt={title} />
    </div>

    <div>
      <span className="large-number">
        {value}
        <span className="number">{unit}</span>
      </span>
    </div>

    <div className="small-body">Updated {lastUpdated}</div>
  </div>
);

export default SubscribedServiceCard;
