import React from 'react';
import '../Card/card.styles.css';
import './subscribedservicecard.styles.css';
import BottomButton from '../BottomButton';

const SubscribedServiceCard = ({
  logo,
  title,
  description,
  serviceImage,
  url
}) => (
  <div className="card">
    <div className="card__row">
      <div className="card__col1">
        <img src={logo} className="service-logo" alt="service" />
      </div>

      <div className="card__col2">
        <p className="headline card__text">{title}</p>
      </div>

      <div className="card__col3" />
    </div>

    <div className="card__row">
      <img className="service-image" src={serviceImage} alt="placeholder" />
    </div>

    <div className="card__row">
      <p className="body-text dark-text sub-service__text">{description}</p>
    </div>

    <BottomButton
      onClick={() => {
        window.open(url);
      }}
      title="Go to service"
    />
  </div>
);

export default SubscribedServiceCard;
