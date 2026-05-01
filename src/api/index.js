import CONFIGS from './../configs';

function getWindSpeed(windSpeedUnit) {
  return fetch(
    `${CONFIGS.BASE_URL}?${CONFIGS.DEFAULT_PARAMS}&current=wind_speed_10m&wind_speed_unit=${windSpeedUnit}`
  ).then((response) => response.json());
}

function getTemperature(temperatureUnit) {
  return fetch(
    `${CONFIGS.BASE_URL}?${CONFIGS.DEFAULT_PARAMS}&current=temperature_2m&temperature_unit=${temperatureUnit}`
  ).then((response) => response.json());
}

export { getWindSpeed, getTemperature };
