import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { fetchWeatherData } from './Helpers/fetchData.js';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState('');

  async function getWeatherData(){
    try{
      const weatherData = fetchWeatherData(cityName);
      toast.promise(weatherData, {
        loading : 'Fetching Weather Data for the requested Location',
        success : (data) => {
          console.log(data);
          setWeatherData(data);
          return `Successfully fetched Weather Data for ${cityName}`;
        },
        error : `Failed to fetch weather data for the requested city`
      })
      const data = await weatherData;
      setWeatherData(data);
    }catch(err){
      console.error(`Error fetching weather data : `, err);
    }
  }


  return(
    <>
        <h1 className="text-white text-center text-2xl bg-slate-700 p-4 m-2 font-mono">Weather-App-React</h1>
        <label htmlFor="">City Name : </label>
        <input
          type="text"
          className=" border-solid border-2 border-slate-400"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <br />
        <button onClick={getWeatherData} className="text-md bg-slate-400 p-4 m-4 rounded-lg border-solid border-4 border-gray-500 text-white hover:text-slate-700 hover:bg-gray-300">
          Show Weather Data
        </button>
        <Toaster/>
        {
          weatherData && (
            <div>
              <h2>Temperature in Celsius : {weatherData.current.temp_c}</h2>
              <h2>Humidity : {weatherData.humidity}</h2>
              <h2>Time : {weatherData.location.localtime}</h2>
            </div>
          )
        }
    </>
  )
}

export default App
