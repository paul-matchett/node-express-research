const yargs = require('yargs');
const request = require('request');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
})
.help()
.alias('help', 'h')
.argv;

geocode.geocodeAddress(argv.address).then( 
    (results) => {

        console.log('Address: ', results.Address);
        //console.log('Lat: ', results.lat);
        //console.log('Long: ', results.lng);
        
        weather.getTemperature(results.lat, results.lng, (errorMessage, temperatureResults) => {
            if(errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's is currently ${temperatureResults.temperature}°C, but it feels like ${temperatureResults.apparentTemperature}°C`);
            }
        });
        
    },
    (errorMessage) => {
        console.log(errorMessage);
    }
);




