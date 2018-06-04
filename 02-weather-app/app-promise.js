const yargs = require('yargs');
const axios = require('axios');

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

const composeEndPointURL = (address) => {
    const endPoint = 'https://maps.googleapis.com/maps/api/geocode/json';
    const addressParam = encodeURIComponent(address);
    const apiKey = 'AIzaSyBvsMsjgfbh_S1DIwWn7jVnCgUUSNvitvE';
    return `${endPoint}?address=${addressParam}&key=${apiKey}`;
}

const convertToCelsius = (f) => {
    let c = (f -32) * 5 / 9;
    return c.toFixed(2);
}

axios.get(composeEndPointURL(argv.address))
.then( (response) => {

    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }
    else{
        let results = response.data.results[0];
        let location = results.geometry.location;
        
        console.log('Address :', results.formatted_address);
        
        const darkSkyKey = '1e79f7487d04ab7871d7522039d64954';
        const weatherURL = `https://api.darksky.net/forecast/${darkSkyKey}/${location.lat},${location.lng}`;
        return axios.get(weatherURL);
    }

})
.then( (response)=>{
    const temperatureData = {
        temperature: convertToCelsius(response.data.currently.temperature),
        apparentTemperature: convertToCelsius(response.data.currently.apparentTemperature)
    }
    console.log(`It's is currently ${temperatureData.temperature}°C, but it feels like ${temperatureData.apparentTemperature}°C`);
})
.catch( (error) => {
    if(error.code === 'EAI_AGAIN'){
        console.log('Unable to connect to api services');
    } else {
        console.log(error.message);
    }
});




