import { defekt } from 'defekt';
import { URL, URLSearchParams } from 'url';

class UnexpectedWeatherResponse extends defekt({ code: 'UnexpectedWeatherResponse' }) {}

const getCurrentWeather = async function ({ apiKey, city, units }) {
  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  const urlSearchParams = new URLSearchParams({
    // eslint-disable-next-line id-length
    q: city,
    appid: apiKey,
    units
  });

  const response = await fetch(
    `${url.toString()}?${urlSearchParams.toString()}`
  );

  if (response.status !== 200) {
    const { message } = await response.json();

    throw new UnexpectedWeatherResponse(`Received status code ${response.status}: ${message}`);
  }

  const { main, name, sys } = await response.json();

  return {
    city: name,
    country: sys.country,
    temperature: {
      current: main.temp,
      minimum: main.temp_min,
      maximum: main.temp_max,
      feelsLike: main.feels_like
    }
  };
};

export {
  UnexpectedWeatherResponse,

  getCurrentWeather
};
