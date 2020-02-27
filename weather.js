/*
Super Simple Weather App - SSWApp
Weather API: https://openweathermap.org

Author: Gregor Wedlich
*/

require('dotenv').config();

const
    yargs = require('yargs'),
    axios = require('axios');

let arguments = yargs
    .option('c', {
        'describe': 'Type your City e.g. -c amsterdam or with country code -c amsterdam,nl',
        'alias': 'city',
        'type': 'string',
        'default': 'Amsterdam',
        'demandOption': 'false'
    })
    .option('u', {
        'describe': 'For temperature in Fahrenheit use units=imperial, For temperature in Celsius use units=metric, For temperature in Kelvin use units=kelvin',
        'alias': 'units',
        'choices': ['imperial', 'metric', 'kelvin'],
        'type': 'string',
        'default': 'metric',
        'demandOption': 'false'
    })
    .help('h')
    .argv;


const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/find',
    timeout: 1000
});

instance.get('/', {
        params: {
            q: arguments.city,
            apiKey: process.env.API_KEY,
            units: arguments.units
        }
    })
    .then(function (response) {
        response.data.list.forEach((data, index) => {
            console.log((index + 1) + '. ' + 'Weather for: ' + data.name);
            console.log('   ' + 'Country: ' + data.sys.country);
            console.log('   ' + 'Temp: ' + data.main.temp);
            console.log('   ' + 'Temp minimal: ' + data.main.temp_min);
            console.log('   ' + 'Temp maximum: ' + data.main.temp_max);
            console.log('   ' + 'Temperature feels like: ' + data.main.feels_like);
        })
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