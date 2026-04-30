import queryString from 'query-string';
import CONFIGS from './../configs';

// Функція, яка переводить cammelCase - стандартний стиль для JS на snake_case для пошукового рядка
function normalizeKeys(options) {
  return Object.fromEntries(
    Object.entries(options).map(([key, value]) => [
      // Тут, чесно кажучи, не знав, що можна передати функцію як параметр replace
      key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
      value,
    ])
  );
}

function getWeather(options) {
  // Хоча враховуючи фіксований розмір параметрів можна було літерально перетворити один об'єкт на інший
  const normalizedOptions = normalizeKeys(options);
  const queryOptionsStringified = queryString.stringify(normalizedOptions);

  return fetch(
    `${CONFIGS.BASE_URL}?${CONFIGS.DEFAULT_PARAMS}&${queryOptionsStringified}`
  ).then((response) => response.json());
}

export default getWeather;
