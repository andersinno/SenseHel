import React from 'react';
import './sensors.styles.css';
import AppHeader from '../../components/AppHeader';
import Icons from '../../assets/Icons';
import SensorListCard from '../../components/SensorListCard';

const mockSensors = [
  {
    image: Icons.Temperature,
    name: 'Temperature',
    description:
      'Lorem ipsum dolor sit amet, consecteurt adipilohjs elit, sed diam nonummy nibh eusimod',
    deviceName: 'AAAAAA',
    serialNumber: '123HHD87377',
    associatedSubscriptions: ['SERVICE NAME 1', 'SERVICE NAME 2']
  },
  {
    image: Icons.Humidity,
    name: 'Humidity',
    description:
      'Lorem ipsum dolor sit amet, consecteurt adipilohjs elit, sed diam nonummy nibh eusimod',
    deviceName: 'AAAAAA',
    serialNumber: '123HHD87377',
    associatedSubscriptions: ['SERVICE NAME 1', 'SERVICE NAME 2']
  },
  {
    image: Icons.CO2,
    name: 'Carbon Dioxide',
    description:
      'Lorem ipsum dolor sit amet, consecteurt adipilohjs elit, sed diam nonummy nibh eusimod',
    deviceName: 'AAAAAA',
    serialNumber: '123HHD87377',
    associatedSubscriptions: ['SERVICE NAME 1', 'SERVICE NAME 2']
  },
  {
    image: Icons.Temperature,
    name: 'Light',
    description:
      'Lorem ipsum dolor sit amet, consecteurt adipilohjs elit, sed diam nonummy nibh eusimod',
    deviceName: 'AAAAAA',
    serialNumber: '123HHD87377',
    associatedSubscriptions: ['SERVICE NAME 1', 'SERVICE NAME 2']
  }
];

const SensorsPage = () => (
  <div className="sensors-page">
    <AppHeader headline="MY SENSORS" title="DEVICES INFORMATION" />

    <div className="sensors-page__content tab-page__content">
      {mockSensors.map(sensor => (
        <SensorListCard
          key={sensor.name}
          image={sensor.image}
          name={sensor.name}
          description={sensor.description}
          deviceName={sensor.deviceName}
          serialNumber={sensor.serialNumber}
          associatedSubscriptions={sensor.associatedSubscriptions}
        />
      ))}
    </div>
  </div>
);

export default SensorsPage;
