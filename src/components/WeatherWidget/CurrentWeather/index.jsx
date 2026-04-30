import styles from './CurrentWeather.module.sass';
import { FaTemperatureLow, FaWind } from 'react-icons/fa';

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
  isFetching,
  error,
}) {
  return (
    <section className={styles.currentWeather}>
      {error && <h2 className={styles.errorMsg}>An error occured!</h2>}
      {isFetching && !error && <h2>Loading. Please, wait...</h2>}
      {!isFetching && !error && (
        <>
          <h2>Current Weather</h2>
          <ul className={styles.weatherDataList}>
            <li>
              <FaWind />
              <span className={styles.weatherData}>{currentWindSpeed}</span>
              {getRealUnit(windSpeedUnit)}
            </li>
            <li>
              <FaTemperatureLow />
              <span className={styles.weatherData}>{currentTemperature}</span>
              {getRealUnit(temperatureUnit)}
            </li>
          </ul>
        </>
      )}
    </section>
  );
}

export default CurrentWeather;
