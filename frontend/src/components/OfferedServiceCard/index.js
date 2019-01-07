import React from 'react';
import _ from 'lodash';

import './offeredservicecard.styles.css';
import Icons from '../../assets/Icons';
import CollapsibleComponent from './CollapsibleComponent';
import Card from '../Card';
import '../Card/card.styles.css';

const OfferedServiceCard = ({
  image,
  service,
  onRequestFail,
  onRequestSuccess
}) => {
  const { name, description, price, benefit_short: benefit, eula } = service;
  const collapsibleFields = _.pick(service, [
    'description',
    'price',
    'benefit_long',
    'required_sensors'
  ]);

  return (
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
                  <b>{benefit}</b>
                </td>
              </tr>
            </tbody>
          </table>
        }
        CollapsibleComponent={
          <CollapsibleComponent
            detailFields={collapsibleFields}
            termsAndConditions={eula}
            privacyPolicy={eula}
            onRequestFail={onRequestFail}
            onRequestSuccess={onRequestSuccess}
          />
        }
      />
    </div>
  );
};
export default OfferedServiceCard;
