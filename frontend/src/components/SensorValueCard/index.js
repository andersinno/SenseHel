import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import './sensorvaluecard.styles.css';
import Icons from '../../assets/Icons';

const getIcon = (type, value) => {
  switch (type) {
    case 'temperature':
      if (value > 24 || value < 17) {
        return Icons.Temperature_Danger;
      }

      if (value > 22 || value < 2) {
        return Icons.Temperature_Warning;
      }

      return Icons.Temperature_Normal;
    case 'humidity':
      if (value > 60 || value < 10) {
        return Icons.Humidity_Danger;
      }

      if (value > 50 || value < 20) {
        return Icons.Humidity_Warning;
      }

      return Icons.Humidity_Normal;
    case 'carbon_dioxide':
      if (value > 1500 || value < 800) {
        return Icons.CO2_Danger;
      }

      if (value > 800 || value < 0) {
        return Icons.CO2_Warning;
      }

      return Icons.CO2_Normal;
    default:
      return Icons.Temperature_Normal;
  }
};

const SensorValueCard = ({
  title,
  type,
  value,
  unit,
  lastUpdated,
  refreshing
}) => (
  <div className="service-card">
    <div className="service-card__header">
      <span className="body-text">{title}</span>
      <img
        className="service-card__header__icon"
        src={getIcon(type, value)}
        alt={title}
      />
    </div>

    {!refreshing ? (
      <div>
        <span className="large-number">
          {value}
          <span className="number">{unit}</span>
        </span>
      </div>
    ) : (
      <CircularProgress className="service-card__spinner" />
    )}

    <div className="small-body">
      {!refreshing ? `Updated ${lastUpdated}` : 'Refreshing'}
    </div>
  </div>
);

export default SensorValueCard;
