import Icons from '../assets/Icons';

export default {
  TEMPERATURE: {
    icon: Icons.Temperature,
    getSeverityIcon: value => {
      if (value > 24 || value < 17) {
        return Icons.Temperature_Danger;
      }

      if (value > 22 || value < 2) {
        return Icons.Temperature_Warning;
      }

      return Icons.Temperature_Normal;
    },
    unit: '℃'
  },
  HUMIDITY: {
    icon: Icons.Humidity,
    getSeverityIcon: value => {
      if (value > 60 || value < 10) {
        return Icons.Humidity_Danger;
      }

      if (value > 50 || value < 20) {
        return Icons.Humidity_Warning;
      }

      return Icons.Humidity_Normal;
    },
    unit: '%'
  },
  CO2: {
    icon: Icons.CO2,
    getSeverityIcon: value => {
      if (value > 1500 || value < 800) {
        return Icons.CO2_Danger;
      }

      if (value > 800 || value < 0) {
        return Icons.CO2_Warning;
      }

      return Icons.CO2_Normal;
    },
    unit: 'ppm'
  },
  DEFAULT: {
    icon: Icons.Sensor,
    getSeverityIcon: () => Icons.Sensor_Normal,
    unit: ''
  }
};
