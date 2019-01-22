import React from 'react';
import Card from '../Card';
import DetailItem from '../Card/DetailItem';
import Icons from '../../assets/Icons';

import './sensorlistcard.styles.css';

const getSensorIcon = type => {
  switch (type) {
    case 'TEMPERATURE':
      return Icons.Temperature;
    case 'HUMIDITY':
      return Icons.Humidity;
    case 'CO2':
      return Icons.CO2;
    default:
      return Icons.Sensor;
  }
};

const CollapsibleComponent = ({ sensorName, identifier, uri }) => (
  <div className="detail-container">
    <DetailItem title="Sensor name" description={sensorName} />
    <DetailItem title="Identifier" description={identifier} />
    <DetailItem
      title="Uri"
      description={
        <a href={uri} target="_blank" rel="noopener noreferrer">
          {uri}
        </a>
      }
      hideDivider
    />
  </div>
);

const SensorListCard = ({ type, name, description, identifier, uri }) => (
  <Card
    image={getSensorIcon(type)}
    name={name}
    description={description}
    CollapsibleComponent={
      <CollapsibleComponent
        sensorName={name}
        identifier={identifier}
        uri={uri}
      />
    }
  />
);

export default SensorListCard;
