import { Component } from 'react';
import { getWindSpeed, getTemperature } from '../../api';
import CurrentWeather from './CurrentWeather';
import SelectWeather from './SelectWeather';
import CONSTANTS from '../../constatnts';
import styles from './WeatherWidget.module.sass';

const {
  SPEED: { MPS },
  TEMPERATURE: { CELS },
} = CONSTANTS.UNITS;

class WeatherWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windSpeed: null,
      temperature: null,
      windSpeedUnit: MPS,
      temperatureUnit: CELS,
      isFetchingWindSpeed: false,
      isFetchingTemperature: false,
      windSpeedError: null,
      temperatureError: null,
    };
  }

  setWindSpeed = (newWindSpeed) => {
    this.setState({ windSpeed: newWindSpeed });
  };

  setTemperature = (newTemperature) => {
    this.setState({ temperature: newTemperature });
  };

  setWindSpeedUnit = (newWindSpeedUnit) => {
    this.setState({ windSpeedUnit: newWindSpeedUnit });
  };

  setTemperatureUnit = (newTemperatureUnit) => {
    this.setState({ temperatureUnit: newTemperatureUnit });
  };

  loadWindSpeed = () => {
    const { windSpeedUnit } = this.state;

    this.setState({ isFetchingWindSpeed: true });

    getWindSpeed(windSpeedUnit)
      .then(({ current: { wind_speed_10m: windSpeed } }) =>
        this.setWindSpeed(windSpeed)
      )
      .catch((error) => this.setState({ windSpeedError: error }))
      .finally(() => this.setState({ isFetchingWindSpeed: false }));
  };

  loadTemperature = () => {
    const { temperatureUnit } = this.state;

    this.setState({ isFetchingTemperature: true });

    getTemperature(temperatureUnit)
      .then(({ current: { temperature_2m: temperature } }) =>
        this.setTemperature(temperature)
      )
      .catch((error) => this.setState({ temperatureError: error }))
      .finally(() => this.setState({ isFetchingTemperature: false }));
  };

  componentDidMount() {
    this.loadWindSpeed();
    this.loadTemperature();
  }

  componentDidUpdate(
    prevProps,
    { windSpeedUnit: prevWindSpeedUnit, temperatureUnit: prevTemperatureUnit }
  ) {
    const { windSpeedUnit, temperatureUnit } = this.state;

    if (windSpeedUnit !== prevWindSpeedUnit) {
      this.loadWindSpeed();
    }

    if (temperatureUnit !== prevTemperatureUnit) {
      this.loadTemperature();
    }
  }

  render() {
    const {
      windSpeed,
      temperature,
      windSpeedUnit,
      temperatureUnit,
      isFetchingTemperature,
      isFetchingWindSpeed,
      windSpeedError,
      temperatureError,
    } = this.state;

    return (
      <>
        <article className={styles.weatherWidget}>
          <SelectWeather
            windSpeedUnit={windSpeedUnit}
            temperatureUnit={temperatureUnit}
            setWindSpeedUnit={this.setWindSpeedUnit}
            setTemperatureUnit={this.setTemperatureUnit}
          />
          <CurrentWeather
            currentWindSpeed={windSpeed}
            currentTemperature={temperature}
            windSpeedUnit={windSpeedUnit}
            temperatureUnit={temperatureUnit}
            isFetchingWindSpeed={isFetchingWindSpeed}
            isFetchingTemperature={isFetchingTemperature}
            windSpeedError={windSpeedError}
            temperatureError={temperatureError}
          />
        </article>
      </>
    );
  }
}

export default WeatherWidget;
