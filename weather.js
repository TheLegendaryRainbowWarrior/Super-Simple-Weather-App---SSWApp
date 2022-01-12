"use strict";

/*
Super Simple Weather App - SSWApp
Weather API: https://openweathermap.org

Author: Gregor Wedlich
*/

const yargs = require('yargs');
const axios = require('axios');

require('dotenv').config();

const args = yargs
    .option('c', {
        describe: 'Type your City e.g. -c amsterdam or with country code -c amsterdam',
        alias: 'city',
        type: 'string',
        default: 'Amsterdam',
        demandOption: 'false',
    })
    .option('u', {
        describe: 'For temperature in Fahrenheit use units=imperial, For temperature in Celsius use units=metric, For temperature in Kelvin use units=kelvin',
        alias: 'units',
        choices: ['imperial', 'metric', 'kelvin'],
        type: 'string',
        default: 'metric',
        demandOption: 'false',
    })
    .help('h').argv;

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    timeout: 1000,
});

instance
    .get('/weather', {
        params: {
            q: args.city,
            appid: process.env.API_KEY,
            units: args.units,
        },
    })
    .then(function (response) {
        console.log('   ' + 'Weather for: ' + response.data.name);
        console.log('   ' + 'Country: ' + response.data.sys.country);
        console.log('   ' + 'Temp: ' + response.data.main.temp);
        console.log('   ' + 'Temp minimal: ' + response.data.main.temp_min);
        console.log('   ' + 'Temp maximum: ' + response.data.main.temp_max);
        console.log('   ' + 'Temperature feels like: ' + response.data.main.feels_like);
    })
    .catch(function (error) {
        if (error.response) {
            console.log('HTTP-Error: ' + error.response.data.cod);
            console.log('Error message: ' + error.response.data.message);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error: ' + error.message);
        }
    });
