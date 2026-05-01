import CONSTANTS from '../../../constatnts';
import styles from './SelectWeather.module.sass';

const {
  SPEED: { MPS, KPH },
  TEMPERATURE: { CELS, FAHR },
} = CONSTANTS.UNITS;

function SelectWeather({
  windSpeedUnit,
  temperatureUnit,
  setWindSpeedUnit,
  setTemperatureUnit,
}) {
  const changeTemperature = ({ target: { value } }) => {
    setTemperatureUnit(value);
  };

  const changeWindSpeed = ({ target: { value } }) => {
    setWindSpeedUnit(value);
  };

  return (
    <section className={styles.selectWeather}>
      <label>
        <span>Wind speed unit</span>
        <select
          name="windSpeedUnit"
          value={windSpeedUnit}
          onChange={changeWindSpeed}
        >
          <option value={MPS}>M/s</option>
          <option value={KPH}>Km/h</option>
        </select>
      </label>
      <label>
        <span>Temperature unit</span>
        <select
          name="temperatureUnit"
          value={temperatureUnit}
          onChange={changeTemperature}
        >
          <option value={CELS}>°C</option>
          <option value={FAHR}>°F</option>
        </select>
      </label>
    </section>
  );
}

export default SelectWeather;
