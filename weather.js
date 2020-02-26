/*
Super Simple Weather App - SSWApp
Weather API: https://openweathermap.org

Author: Gregor Wedlich
*/

require('dotenv').config();

const
    request = require('request'),
    yargs = require('yargs');

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

let requestOptions = {
    url: "https://api.openweathermap.org/data/2.5/find",
    qs: {
        q: arguments.city,
        apiKey: process.env.API_KEY,
        units: arguments.units
    }
};

request(
    requestOptions,
    (error, response, body) => {
        if (response.statusCode === 200) {
            let bodyObj = JSON.parse(body);

            bodyObj.list.forEach((list, index) => {
                console.log((index + 1) + '. ' + 'Weather for: ' + list.name);
                console.log('   ' + 'Country: ' + list.sys.country);
                console.log('   ' + 'Temp: ' + list.main.temp);
                console.log('   ' + 'Temp minimal: ' + list.main.temp_min);
                console.log('   ' + 'Temp maximum: ' + list.main.temp_max);
                console.log('   ' + 'Temperature feels like: ' + list.main.feels_like);
            });
        }
    }
);