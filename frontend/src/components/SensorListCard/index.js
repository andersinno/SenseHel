import React from 'react';
import Card from '../Card';
import DetailItem from '../Card/DetailItem';

import './sensorlistcard.styles.css';

const CollapsibleComponent = ({ sensorName, identifier, description }) => (
  <div className="detail-container">
    <DetailItem title="Description" description={description} />
    <DetailItem title="Sensor name" description={sensorName} />
    <DetailItem title="Identifier" description={identifier} hideDivider />
  </div>
);

const SensorListCard = ({ icon, name, description, identifier }) => (
  <Card
    image={icon}
    name={name}
    description={description}
    CollapsibleComponent={
      <CollapsibleComponent
        sensorName={name}
        identifier={identifier}
        description={description}
      />
    }
  />
);

export default SensorListCard;
