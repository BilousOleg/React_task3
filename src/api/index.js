function getWeather(options) {
  return fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&past_days=0&forecast_days=7&wind_speed_unit=ms&temperature_unit=celsius'
  ).then((response) => response.json());
}

export default getWeather;

// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&past_days=0&forecast_days=7&wind_speed_unit=ms&temperature_unit=celsius
