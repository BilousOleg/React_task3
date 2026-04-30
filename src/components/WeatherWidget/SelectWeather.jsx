import CONSTANTS from '../../constatnts';

const { MPS, KPH, CELS, FAHR } = CONSTANTS.UNITS;

function SelectWeather() {
  return (
    <section>
      <label>
        <span>Wind speed unit</span>
        <select>
          <option value={MPS}>M/s</option>
          <option value={KPH}>Km/h</option>
        </select>
      </label>
      <label>
        <span>Temperature unit</span>
        <select>
          <option value={CELS}>°C</option>
          <option value={FAHR}>°F</option>
        </select>
      </label>
    </section>
  );
}

export default SelectWeather;
