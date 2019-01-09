import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import './sensorvaluecard.styles.css';
import Icons from '../../assets/Icons';

const getIcon = (type, value) => {
  switch (type) {
    case 'temperature':
      if (value > 35 || value < 0) {
        return Icons.Temperature_Danger;
      }

      if (value > 25 || value < 10) {
        return Icons.Temperature_Warning;
      }

      return Icons.Temperature_Normal;
    case 'humidity':
      if (value > 80 || value < 10) {
        return Icons.Humidity_Danger;
      }

      if (value > 60 || value < 45) {
        return Icons.Humidity_Warning;
      }

      return Icons.Humidity_Normal;
    case 'carbon_dioxide':
      if (value > 2000 || value < 100) {
        return Icons.CO2_Danger;
      }

      if (value > 1000 || value < 350) {
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
