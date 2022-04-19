import axios from 'axios';
import { buntstift } from 'buntstift';
import dotenv from 'dotenv';
import yargs from 'yargs';

dotenv.config();
// eslint-disable-next-line no-process-env
const apiKey = process.env.API_KEY;

const args = yargs().
  option('c', {
    describe: 'Type your city e.g. -c amsterdam or with country code -c dresden,us or -c dresden,de',
    alias: 'city',
    type: 'string',
    default: 'amsterdam',
    demandOption: 'false'
  }).
  option('u', {
    describe: 'For temperature in Fahrenheit use units=imperial, for temperature in Celsius use units=metric, for temperature in Kelvin use units=kelvin',
    alias: 'units',
    choices: [ 'imperial', 'metric', 'kelvin' ],
    type: 'string',
    default: 'metric',
    demandOption: 'false'
  }).
  help('h').argv;

const client = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 1_000
});

try {
  const response = await client.get('/weather', {
    params: {
      // eslint-disable-next-line id-length
      q: args.city,
      appid: apiKey,
      units: args.units
    }
  });

  buntstift.info(`Weather for: ${response.data.name}`);
  buntstift.info(`Country: ${response.data.sys.country}`);
  buntstift.info(`Temp: ${response.data.main.temp}`);
  buntstift.info(`Temp minimal: ${response.data.main.temp_min}`);
  buntstift.info(`Temp maximum: ${response.data.main.temp_max}`);
  buntstift.info(`Temperature feels like: ${response.data.main.feels_like}`);
} catch (ex) {
  if (ex.response) {
    buntstift.error(`HTTP-Error: ${ex.response.data.cod}`);
    buntstift.error(`Error message: ${ex.response.data.message}`);
  } else if (ex.request) {
    buntstift.error(ex.request);
  } else {
    buntstift.error(`Error: ${ex.message}`);
  }
}
