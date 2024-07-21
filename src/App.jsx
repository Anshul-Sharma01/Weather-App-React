import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { fetchWeatherData } from './Helpers/fetchData.js';
import WeatherCard from "./Components/WeatherCard.jsx";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState('');
  const [dataFetched, setDataFetched] = useState(false);
  
  async function getWeatherData(e) {
    if(!cityName){
      toast.error('Please enter city name');
    }

    setDataFetched(false);
    e.preventDefault();
    try {
      const weatherDataPromise = fetchWeatherData(cityName);
      toast.promise(weatherDataPromise, {
        loading: 'Fetching Weather Data for the requested Location',
        success: (data) => {
          setWeatherData(data);
          return `Successfully fetched Weather Data for ${cityName}`;
        },
        error: 'Failed to fetch weather data for the requested city'
      });
      const data = await weatherDataPromise;
      setWeatherData(data);
      setDataFetched(true);
      // console.log(data.current.condition.icon);
    } catch (err) {
      console.error(`Error fetching weather data: `, err);
    }
  }

  return (
    <>
      <h1 className="text-white text-center text-2xl bg-slate-700 p-4 m-2 font-mono">Weather-App-React</h1>
      <form action="" className="flex justify-center items-center flex-col" onSubmit={getWeatherData}>
        <div>
          <label htmlFor="city">City Name: </label>
          <input
            type="text"
            id="city"
            className="border-solid border-2 border-slate-400"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <br />
        <button type="submit" className="text-md bg-slate-400 p-4 m-4 rounded-lg border-solid border-4 border-gray-500 text-white hover:text-slate-700 hover:bg-gray-300">
          Show Weather Data
        </button>
        <Toaster />
      </form>
      {dataFetched && (
        <WeatherCard weatherData = {weatherData}/>
      )}
    </>
  );
}

export default App;
