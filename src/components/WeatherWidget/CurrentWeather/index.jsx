import styles from './CurrentWeather.module.sass';
import { FaTemperatureLow, FaWind } from 'react-icons/fa';
import Current from './Current';

function getRealUnit(unit) {
  switch (unit) {
    case 'ms':
      return 'M/s';
    case 'kmh':
      return 'Km/h';
    case 'celsius':
      return '°C';
    case 'fahrenheit':
      return '°F';
  }
}

function CurrentWeather({
  currentWindSpeed,
  currentTemperature,
  windSpeedUnit,
  temperatureUnit,
  isFetchingWindSpeed,
  isFetchingTemperature,
  windSpeedError,
  temperatureError,
}) {
  return (
    <section className={styles.currentWeather}>
      <h2>Current Weather</h2>
      <ul className={styles.weatherDataList}>
        {windSpeedError && (
          <li className={styles.errorMsg}>An error occured!</li>
        )}
        {isFetchingWindSpeed && !windSpeedError && (
          <li>Loading. Please, wait...</li>
        )}
        {!isFetchingWindSpeed && !windSpeedError && (
          <Current
            valueIcon={<FaWind />}
            currentValue={currentWindSpeed}
            realValueUnit={getRealUnit(windSpeedUnit)}
          />
        )}

        {temperatureError && (
          <li className={styles.errorMsg}>An error occured!</li>
        )}
        {isFetchingTemperature && !temperatureError && (
          <li>Loading. Please, wait...</li>
        )}
        {!isFetchingTemperature && !temperatureError && (
          <Current
            valueIcon={<FaTemperatureLow />}
            currentValue={currentTemperature}
            realValueUnit={getRealUnit(temperatureUnit)}
          />
        )}
      </ul>
    </section>
  );
}

export default CurrentWeather;
