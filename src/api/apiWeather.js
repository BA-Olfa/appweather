import axios from 'axios';
const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = '481843282b85c1b77c7c573c2513d1a0';

const GEO_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

export async function getWeatherData(lat, lon) {
  try {
    const weatherUrl = `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    const forecastUrl = `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

    const [weatherResponse, forecastResponse] = await Promise.all([
      axios.get(weatherUrl),
      axios.get(forecastUrl),
    ]);

    return [weatherResponse.data, forecastResponse.data];
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

export async function searchCities(input) {
    try {
      const response = await axios.get(
        `${GEO_API_URL}/cities`,
        {
          params: {
            minPopulation: 10000,
            namePrefix: input,
          },
          ...GEO_API_OPTIONS
        }
      );
  
      return response.data;
    } catch (error) {
      console.error('Error fetching cities:', error);
      return;
    }
  }