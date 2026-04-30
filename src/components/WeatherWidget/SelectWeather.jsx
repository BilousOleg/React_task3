import CONSTANTS from '../../constatnts';

const { MPS, KPH, CELS, FAHR } = CONSTANTS.UNITS;

function SelectWeather({ weatherUnits, setWeatherUnits }) {
  const changeWeather = ({ target: { name, value } }) => {
    setWeatherUnits({
      ...weatherUnits,
      [name]: value,
    });
  };

  return (
    <section>
      <label>
        <span>Wind speed unit</span>
        <select
          name="windSpeedUnit"
          value={weatherUnits.windSpeedUnit}
          onChange={changeWeather}
        >
          <option value={MPS}>M/s</option>
          <option value={KPH}>Km/h</option>
        </select>
      </label>
      <label>
        <span>Temperature unit</span>
        <select
          name="temperatureUnit"
          value={weatherUnits.temperatureUnit}
          onChange={changeWeather}
        >
          <option value={CELS}>°C</option>
          <option value={FAHR}>°F</option>
        </select>
      </label>
    </section>
  );
}

export default SelectWeather;
