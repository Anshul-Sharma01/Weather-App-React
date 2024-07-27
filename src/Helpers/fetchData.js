import axios from "axios";


async function fetchWeatherData(cityName){
    const api_key = import.meta.env.VITE_API_KEY;
    
    const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${cityName}&days=3`);
    console.log(response.data);
    console.log(response?.data?.forecast?.forecastday);
    return response.data;
}

async function fetchHourlyData(cityName, day) {
    console.log(cityName);
    if (!cityName || typeof cityName !== 'string') {
        throw new Error('Invalid city name');
    }

    if (day < 0 || day > 2) {
        throw new Error('Invalid day parameter. Should be 0, 1, or 2');
    }

    const api_key = import.meta.env.VITE_API_KEY;
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${cityName}&days=3`);
        return response.data.forecast.forecastday[day];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export{
    fetchWeatherData,
    fetchHourlyData
}









