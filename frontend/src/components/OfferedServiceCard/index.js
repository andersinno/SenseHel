import React from 'react';

import './offeredservicecard.styles.css';
import Icons from '../../assets/Icons';
import CollapsibleComponent from './CollapsibleComponent';
import Card from '../Card';
import '../Card/card.styles.css';

const OfferedServiceCard = ({
  image,
  name,
  description,
  price,
  benefit,
  requiredSensors
}) => (
  <div>
    <Card
      image={image}
      name={name}
      description={description}
      AdditionalSummaryRow={
        <table className="price-benefit-table">
          <tbody>
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
                <b>{benefit.short}%</b>
              </td>
            </tr>
          </tbody>
        </table>
      }
      CollapsibleComponent={
        <CollapsibleComponent
          description={description}
          benefit={benefit}
          price={price}
          requiredSensors={requiredSensors}
        />
      }
    />
  </div>
);

export default OfferedServiceCard;
