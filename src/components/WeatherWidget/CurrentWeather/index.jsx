import styles from './CurrentWeather.module.sass';

function CurrentWeather({
  currentWindSpeed,
  currentTemperature,
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
            <li>{currentWindSpeed}</li>
            <li>{currentTemperature}</li>
          </ul>
        </>
      )}
    </section>
  );
}

export default CurrentWeather;
