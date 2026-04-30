import React, { Component } from 'react';
import getWeather from '../../api';
import CurrentWeather from './CurrentWeather';
import SelectWeather from './SelectWeather';
import CONSTANTS from '../../constatnts';

const { MPS, CELS } = CONSTANTS.UNITS;

class WeatherWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWeather: {
        windSpeed: null,
        temperature: null,
      },
      // Оскільки задача компонента - саме ПЕРЕМИКАТИ одиниці вимірювання, передаю лише їх, тобто кількість параметрів фіксована (2)
      // адже інакше треба було б змінювати і select в компоненті SelectWeather динамічно під кікльість параметрів
      queryOptions: {
        windSpeedUnit: MPS,
        temperatureUnit: CELS,
      },
      isFetching: false,
      error: null,
    };
  }

  setWeather = (newWeather) => {
    this.setState({ currentWeather: newWeather });
  };

  loadWeather = () => {
    const { queryOptions } = this.state;

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
      queryOptions: {
        windSpeedUnit: prevWindSpeedUnit,
        temperatureUnit: prevTemperatureUnit,
      },
    }
  ) {
    const {
      queryOptions: { windSpeedUnit, temperatureUnit },
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
      isFetching,
      error,
    } = this.state;

    console.log(this.state);

    return (
      <>
        {!isFetching && !error && (
          <article>
            <SelectWeather />
            <CurrentWeather
              currentWindSpeed={windSpeed}
              currentTemperature={temperature}
            />
          </article>
        )}
      </>
    );
  }
}

export default WeatherWidget;
