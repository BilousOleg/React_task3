import styles from './CurrentWeather.module.sass';
import { FaTemperatureLow, FaWind } from 'react-icons/fa';

// Функція для "перекладу" з константних значень для рядка запиту в звичні для розуміння одиниці вимірювання
// Чесно кажучи, легше було б вже рахувати їх значення, а не надсилати повторний запит))
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
      {/* Умовний рендеринг лише тієї частини, яка відповідає за відображення і яка може змінюватись */}
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
