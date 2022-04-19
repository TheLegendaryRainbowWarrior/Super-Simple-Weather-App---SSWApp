#!/usr/bin/env node

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

try {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${args.city}&appid=${apiKey}&units=${args.units}`
  );

  if (response.status !== 200) {
    const { message } = await response.json();

    throw new Error(`Received status code ${response.status}: ${message}`);
  }

  const { main, name, sys } = await response.json();

  buntstift.info(`Weather for: ${name}`);
  buntstift.info(`Country: ${sys.country}`);
  buntstift.info(`Temp: ${main.temp}`);
  buntstift.info(`Temp minimal: ${main.temp_min}`);
  buntstift.info(`Temp maximum: ${main.temp_max}`);
  buntstift.info(`Temperature feels like: ${main.feels_like}`);
} catch (ex) {
  buntstift.error(`An error occured: ${ex.message}`);

  process.exit(1);
}
