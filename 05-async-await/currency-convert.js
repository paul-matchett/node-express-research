// http://data.fixer.io/api/latest?access_key=8aaf6c96f88fa34c3699a3c8cbfad9c2

// https://restcountries.eu/rest/v2/currency/gbp
// https://restcountries.eu/rest/v2/currency/usd

const axios = require('axios');

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=8aaf6c96f88fa34c3699a3c8cbfad9c2');
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];

    if (isNaN(rate)) {
      throw new Error();
    }

    return rate;
  } catch (e) {
    throw new Error(`endpoint error - unable to get exchange rate for ${from} and ${to}`);
  }
};

const getCountries = async (countryCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${countryCode}`);
    return response.data.map((country) => country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${countryCode}`);
  }
};

const convertCurrency = async (from, to, amount) => {

  const exchangeRate = await getExchangeRate(from, to);
  const countryNames = await getCountries(to);
  const convertedAmount = (amount * exchangeRate).toFixed(2);
  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in the following ${countryNames.join(', ')}`;

  // return getExchangeRate(from, to).then((rate) => {
  //   convertedAmount = (amount * rate).toFixed(2);
  //   console.log('convertedAmount :', convertedAmount); 
  //   return getCountries(to);
  // }).then((countryNames) => {
  //   console.log('countryNames :', countryNames);
  //   return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in the following ${countryNames.join(', ')}`;
  // });
};

convertCurrency('USD', 'GBP', 20).then((message) => {
  console.log('message :', message);
}).catch((erro) => {
  console.log('error :', error);
});


