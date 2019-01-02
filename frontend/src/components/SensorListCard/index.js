import React from 'react';
import Card from '../Card';
import DetailItem from '../Card/DetailItem';

import './sensorlistcard.styles.css';

const CollapsibleComponent = ({
  deviceName,
  serialNumber,
  associatedSubscriptions
}) => (
  <div className="detail-container">
    <DetailItem title="device name" description={deviceName} />
    <DetailItem title="serial number" description={serialNumber} />
    <DetailItem
      title="associated with"
      description={associatedSubscriptions.join('\n')}
      hideDivider
    />
  </div>
);

const SensorListCard = ({
  image,
  name,
  description,
  deviceName,
  serialNumber,
  associatedSubscriptions
}) => (
  <Card
    image={image}
    name={name}
    description={description}
    CollapsibleComponent={
      <CollapsibleComponent
        deviceName={deviceName}
        serialNumber={serialNumber}
        associatedSubscriptions={associatedSubscriptions}
      />
    }
  />
);

export default SensorListCard;
