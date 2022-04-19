# Super Simple Weather App - SSWApp

This is a small app for your console, written in Node.js with Yargs (https://yargs.js.org).

API: https://openweathermap.org/api

_Feel free to fork._

## Usage

Set `.env` and paste your api key.

```bash
$ npm i
$ node lib/bin/weather.js -h # for help
$ node lib/bin/weather.js -c Amsterdam -u metric # City: Amsterdam Unit: Celsius
```

## Running quality assurance

To run quality assurance for this module use [roboter](https://www.npmjs.com/package/roboter):

```shell
$ npx roboter
```
