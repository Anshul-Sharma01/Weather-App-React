import axios from "axios";


async function fetchWeatherData(cityName){
    const api_key = import.meta.env.VITE_API_KEY;
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${cityName}&aqi=yes`);
    console.log(response.data);
    return response.data;
}

export{
    fetchWeatherData,
}










