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
      currentWindSpeed: null,
      currentTemperature: null,
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

  loadWeather = () => {
    const { queryOptions } = this.state;

    this.setState({ isFetching: true });
    getWeather(queryOptions)
      .then(
        ({
          current: { temperature_2m: temperature, wind_speed_10m: windSpeed },
        }) =>
          this.setState({
            currentWindSpeed: windSpeed,
            currentTemperature: temperature,
          })
      )
      .catch((error) => this.setState({ error: error }))
      .finally(() => this.setState({ isFetching: false }));
  };

  componentDidMount() {
    this.loadWeather();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentWindSpeed, currentTemperature } = this.state;
    if (
      currentWindSpeed !== prevState.currentWindSpeed ||
      currentTemperature !== prevState.currentTemperature
    ) {
      this.loadWeather();
    }
  }

  render() {
    const { currentTemperature, currentWindSpeed, isFetching, error } =
      this.state;

    return (
      <>
        {!isFetching && !error && (
          <article>
            <SelectWeather />
            <CurrentWeather
              currentWindSpeed={currentWindSpeed}
              currentTemperature={currentTemperature}
            />
          </article>
        )}
      </>
    );
  }
}

export default WeatherWidget;
