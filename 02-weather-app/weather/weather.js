const request = require('request');

const composeEndPointURL = (lat, lng) => {
    const endPoint = 'https://api.darksky.net/forecast';
    const apiKey = '1e79f7487d04ab7871d7522039d64954';
    return `${endPoint}/${apiKey}/${lat},${lng}`;
}

const convertToCelsius = (f) => {
    let c = (f -32) * 5 / 9;
    return c.toFixed(2);
}

const getTemperature = (lat, lng, callback) => {

    request({
        url: composeEndPointURL(lat, lng),
        json: true 
    }, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            temperatureData = {
                temperature: convertToCelsius(body.currently.temperature),
                apparentTemperature: convertToCelsius(body.currently.apparentTemperature)
            }
            callback(undefined, temperatureData);
        } else {
            callback('Unable to fetch weather');
        }

    });

}

module.exports = {
    getTemperature
};