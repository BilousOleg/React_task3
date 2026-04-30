import queryString from 'query-string';
import CONFIGS from './../configs';

function normalizeKeys(object) {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
      value,
    ])
  );
}

function getWeather(options) {
  const normalizedOptions = normalizeKeys(options);
  const queryOptionsStringified = queryString.stringify(normalizedOptions);

  return fetch(
    `${CONFIGS.BASE_URL}?${CONFIGS.DEFAULT_PARAMS}&${queryOptionsStringified}`
  ).then((response) => response.json());
}

export default getWeather;
