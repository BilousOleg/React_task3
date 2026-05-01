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

    // По-суті зараз весь state можна об'єднати в два об'єкти - для temperature та windSpeed, але зараз так
    this.state = {
      windSpeed: null,
      temperature: null,
      // Оскільки задача компонента - саме ПЕРЕМИКАТИ одиниці вимірювання, передаю лише їх, тобто кількість параметрів фіксована (2)
      // адже інакше треба було б змінювати і select'и в компоненті SelectWeather динамічно під кікльість параметрів
      windSpeedUnit: MPS,
      temperatureUnit: CELS,
      // Розділив стан для двох завантажень окремо.
      isFetchingWindSpeed: false,
      isFetchingTemperature: false,
      // Розділив помилки для двох завантажень окремо.
      windSpeedError: null,
      temperatureError: null,
    };
  }

  // Просто службовий метод, можна було обійтись без нього
  setWindSpeed = (newWindSpeed) => {
    this.setState({ windSpeed: newWindSpeed });
  };

  // Просто службовий метод, можна було обійтись без нього
  setTemperature = (newTemperature) => {
    this.setState({ temperature: newTemperature });
  };

  setWindSpeedUnit = (newWindSpeedUnit) => {
    this.setState({ windSpeedUnit: newWindSpeedUnit });
  };

  setTemperatureUnit = (newTemperatureUnit) => {
    this.setState({ temperatureUnit: newTemperatureUnit });
  };

  // Окремий метод підвантаження швидкості повітря
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

  // Окремий метод підвантаження температури
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
    // Можна й else додати, оскільки фактично неможливо одночасно перемикнути і температуру і швидкість повітря в select
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
