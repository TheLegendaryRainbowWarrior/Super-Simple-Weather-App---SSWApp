#!/usr/bin/env node

import { buntstift } from 'buntstift';
import dotenv from 'dotenv';
import { getCurrentWeather } from '../domain/getCurrentWeather.js';
import yargs from 'yargs';

dotenv.config();
// eslint-disable-next-line no-process-env
const apiKey = process.env.API_KEY;

const args = yargs(process.argv.slice(2)).
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

try {
  const currentWeather = await getCurrentWeather({
    apiKey,
    city: args.city,
    units: args.units
  });

  buntstift.info(`Weather for: ${currentWeather.city}`);
  buntstift.info(`Country: ${currentWeather.country}`);
  buntstift.info(`Temp: ${currentWeather.temperature.current}`);
  buntstift.info(`Temp minimal: ${currentWeather.temperature.minimum}`);
  buntstift.info(`Temp maximum: ${currentWeather.temperature.maximum}`);
  buntstift.info(`Temperature feels like: ${currentWeather.temperature.feelsLike}`);
} catch (ex) {
  buntstift.error(`An error occured: ${ex.message}`);

  process.exit(1);
}
