import React, { Component } from 'react';
import './sensors.styles.css';
import AppHeader from '../../components/AppHeader';
import SensorListCard from '../../components/SensorListCard';
import API from '../../services/Api';
import CustomizedSnackbar from '../../components/Snackbar';

class SensorsPage extends Component {
  state = {
    sensors: [],
    errorMessage: ''
  };

  async componentWillMount() {
    try {
      const sensors = await API.getApartmentSensors();

      console.log(sensors);
      this.setState({ sensors });
    } catch (e) {
      this.setState({
        errorMessage: {
          title: 'Could not fetch apartment sensors',
          subtitle: `${e.message}`
        }
      });
    }
  }

  render() {
    const { sensors, errorMessage } = this.state;

    return (
      <div className="sensors-page">
        <AppHeader headline="MY SENSORS" title="DEVICES INFORMATION" />

        <div className="sensors-page__content tab-page__content">
          {sensors.map(sensor => (
            <SensorListCard
              key={sensor.id}
              type={sensor.uiType}
              name={sensor.name}
              description={sensor.description}
              identifier={sensor.identifier}
              uri={sensor.uri}
            />
          ))}
        </div>

        <CustomizedSnackbar
          message={errorMessage}
          variant="error"
          handleClose={() => this.setState({ errorMessage: '' })}
          open={!!errorMessage}
        />
      </div>
    );
  }
}

export default SensorsPage;
