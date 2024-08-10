import axios from "axios";
const api_key = import.meta.env.VITE_API_KEY;

async function fetchWeatherData(cityName){
    
    
    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${cityName}&days=3`);
    console.log(response.data);
    console.log(response?.data?.forecast?.forecastday);
    return response.data;
}
async function fetchCurrentWeather(lat, long) {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${lat},${long}&days=3`);
      return response.data;
    } catch (error) {
      console.error("Error fetching current weather:", error);
      throw error; // Ensure errors are propagated
    }
  }
  


async function fetchHourlyData(cityName, day) {
    console.log(cityName);
    if (!cityName || typeof cityName !== 'string') {
        throw new Error('Invalid city name');
    }

    if (day < 0 || day > 2) {
        throw new Error('Invalid day parameter. Should be 0, 1, or 2');
    }

    
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${cityName}&days=3`);
        return response.data.forecast.forecastday[day];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export{
    fetchWeatherData,
    fetchHourlyData,
    fetchCurrentWeather
}









