import React from 'react';
import './offeredservicecard.styles.css';
import Icons from '../../assets/Icons';

const OfferedServiceCard = ({ image, name, description, price, benefit }) => (
  <div className="offered-service-card">
    <div className="offered-service-card__row1">
      <div className="offered-service-card__col1">
        <img src={image} className="col1__img" alt="service" />
      </div>

      <div className="offered-service-card__col2">
        <p className="headline offered-service-card__text">{name}</p>
        <p className="body-text offered-service-card__text">{description}</p>
      </div>

      <div className="offered-service-card__col3">
        <img src={Icons.Arrow_Up} className="col3__icon" alt="arrow-down" />
      </div>
    </div>

    <div className="offered-service-card__row2">
      <div className="offered-service-card__col1" />
      <div className="offered-service-card__col2">
        <table className="row2__col2__table">
          <tr>
            <th className="body-text">Price</th>
            <th className="body-text">Benefit</th>
          </tr>

          <tr>
            <td className="body-text">
              <b>{price}</b>
            </td>
            <td className="body-text">
              <img
                className="benefit-col__body-text__icon"
                src={Icons.Green_Arrow}
                alt="green arrow"
              />
              <b>{benefit}%</b>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
);

export default OfferedServiceCard;
