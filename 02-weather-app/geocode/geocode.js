const request = require('request');

const composeEndPointURL = (address) => {
    const endPoint = 'https://maps.googleapis.com/maps/api/geocode/json';
    const addressParam = encodeURIComponent(address);
    const apiKey = 'AIzaSyBvsMsjgfbh_S1DIwWn7jVnCgUUSNvitvE';
    return `${endPoint}?address=${addressParam}&key=${apiKey}`;
}

const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url: composeEndPointURL(address),
            json: true 
        }, (error, response, body) => {
            // console.log('error:', error); // Print the error if one occurred
            // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // console.log('body:', JSON.stringify(body, undefined, 2)); // Print the HTML for the Google homepage.
        
            if(error) {
                reject('End Point Error');
            } else if(body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address');
            } else if(body.status === 'OK') {
        
                let results = body.results[0];
                let location = results.geometry.location;
        
                let data = {
                    'Address': results.formatted_address,
                    'lat': location.lat,
                    'lng': location.lng
                }
                resolve(data);
            }
        });
    });
}

module.exports = {
    geocodeAddress
};