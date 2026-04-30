import React, { Component } from 'react';
import getWeather from '../../api';
import CurrentWeather from './CurrentWeather';
import SelectWeather from './SelectWeather';

class WeatherWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWindSpeed: null,
      currentTemperature: null,
      isFetching: false,
      error: null,
    };
  }

  loadWeather = () => {
    this.setState({ isFetching: true });
    getWeather()
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

  componentDidUpdate(prevProps, prevState) {}

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
