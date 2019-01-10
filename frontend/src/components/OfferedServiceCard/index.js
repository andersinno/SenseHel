import React from 'react';
import _ from 'lodash';

import './offeredservicecard.styles.css';
import Icons from '../../assets/Icons';
import CollapsibleComponent from './CollapsibleComponent';
import Card from '../Card';
import '../Card/card.styles.css';

const OfferedServiceCard = ({
  service,
  subscribed,
  handleSubscribe,
  handleUnsubscribe
}) => {
  const {
    id,
    img_logo_url: logoUrl,
    img_service_url: serviceImageUrl,
    name,
    description,
    price,
    benefit_short: benefit,
    eula_url: eula
  } = service;
  const collapsibleFields = _.pick(service, [
    'description',
    'price',
    'benefit_long',
    'required_sensors'
  ]);

  return (
    <div>
      <Card
        image={logoUrl}
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
            serviceId={id}
            serviceImageUrl={serviceImageUrl}
            detailFields={collapsibleFields}
            termsAndConditions={eula}
            privacyPolicy={eula}
            subscribed={subscribed}
            handleSubscribe={handleSubscribe}
            handleUnsubscribe={handleUnsubscribe}
          />
        }
      />
    </div>
  );
};
export default OfferedServiceCard;
