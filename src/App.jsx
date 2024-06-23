import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { fetchWeatherData } from './Helpers/fetchData.js';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [aqiValue, setAqiValue] = useState(true);
  const [cityName, setCityName] = useState('');

  async function getWeatherData(e) {
    e.preventDefault();
    try {
      const weatherDataPromise = fetchWeatherData(cityName, aqiValue);
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
        <div className="flex gap-2">
          <label htmlFor="aqi">AQI</label>
          <input
            type="checkbox"
            id="aqi"
            checked={aqiValue}
            onChange={(e) => setAqiValue(e.target.checked)}
          />
        </div>
        <br />
        <button type="submit" className="text-md bg-slate-400 p-4 m-4 rounded-lg border-solid border-4 border-gray-500 text-white hover:text-slate-700 hover:bg-gray-300">
          Show Weather Data
        </button>
        <Toaster />
      </form>
      {weatherData && (
        <div>
          <h2>Temperature in Celsius: {weatherData?.current?.temp_c}</h2>
          <h2>Humidity: {weatherData?.current?.humidity}</h2>
          <h2>Time: {(weatherData?.location?.localtime).split(" ")[1]}</h2>
          <h2>Weather: {weatherData?.current?.condition?.text} <img src={weatherData?.current?.condition?.icon} alt="" /></h2>
          {
            aqiValue &&
            (<h2>AQI : {weatherData?.current?.air_quality?.co}</h2>)
          }
        </div>
      )}
    </>
  );
}

export default App;
