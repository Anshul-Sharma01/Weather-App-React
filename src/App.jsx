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
      return;
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
      <div className="flex flex-col justify-center m-10 items-center min-h-[200px]">
        <form className="flex justify-center items-center flex-col shadow-xl p-10 " onSubmit={getWeatherData}>
          <div>
            <input
              type="text"
              id="city"
              className="border-solid border-2 rounded-lg border-slate-400 px-4 py-2"
              value={cityName}
              placeholder="enter city name.."
              onChange={(e) => setCityName(e.target.value)}
            />
          </div>
          <br />
          <button type="submit" className="border-solid border-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-600 border-orange-400 text-lg">
            Show Weather Data
          </button>
          <Toaster />
        </form>

      </div>
      {dataFetched && (
        <WeatherCard weatherData = {weatherData}/>
      )}
    </>
  );
}

export default App;
