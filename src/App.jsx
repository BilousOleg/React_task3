import WeatherWidget from './components/WeatherWidget';
import styles from './App.module.sass';

function App() {
  return (
    <section className={styles.weatherSection}>
      <WeatherWidget />
    </section>
  );
}

export default App;

