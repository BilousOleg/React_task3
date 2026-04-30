import React, { Component } from 'react';
import getWeather from '../../api';
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
      currentWeather: {
        windSpeed: null,
        temperature: null,
      },
      // Оскільки задача компонента - саме ПЕРЕМИКАТИ одиниці вимірювання, передаю лише їх, тобто кількість параметрів фіксована (2)
      // адже інакше треба було б змінювати і select'и в компоненті SelectWeather динамічно під кікльість параметрів
      weatherUnits: {
        windSpeedUnit: MPS,
        temperatureUnit: CELS,
      },
      isFetching: false,
      error: null,
    };
  }

  // Просто службовий метод, можна було обійтись без нього
  setWeather = (newWeather) => {
    this.setState({ currentWeather: newWeather });
  };

  setWeatherUnits = (newWeatherUnits) => {
    this.setState({ weatherUnits: newWeatherUnits });
  };

  // Так само, службовий метод для єдиної відповідальності за fetch
  loadWeather = () => {
    const { weatherUnits: queryOptions } = this.state;

    this.setState({ isFetching: true });
    getWeather(queryOptions)
      .then(
        ({
          current: { temperature_2m: temperature, wind_speed_10m: windSpeed },
        }) => this.setWeather({ windSpeed, temperature })
      )
      .catch((error) => this.setState({ error: error }))
      .finally(() => this.setState({ isFetching: false }));
  };

  componentDidMount() {
    this.loadWeather();
  }

  componentDidUpdate(
    prevProps,
    {
      weatherUnits: {
        windSpeedUnit: prevWindSpeedUnit,
        temperatureUnit: prevTemperatureUnit,
      },
    }
  ) {
    const {
      weatherUnits: { windSpeedUnit, temperatureUnit },
    } = this.state;

    if (
      windSpeedUnit !== prevWindSpeedUnit ||
      temperatureUnit !== prevTemperatureUnit
    ) {
      this.loadWeather();
    }
  }

  render() {
    const {
      currentWeather: { windSpeed, temperature },
      weatherUnits,
      isFetching,
      error,
    } = this.state;

    return (
      <>
        <article className={styles.weatherWidget}>
          <SelectWeather
            weatherUnits={weatherUnits}
            setWeatherUnits={this.setWeatherUnits}
          />
          <CurrentWeather
            currentWindSpeed={windSpeed}
            currentTemperature={temperature}
            isFetching={isFetching}
            error={error}
          />
        </article>
      </>
    );
  }
}

export default WeatherWidget;
