import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { fetchCurrentWeather, fetchWeatherData } from './Helpers/fetchData.js';
import WeatherCard from "./Components/WeatherCard.jsx";
import IconsBar from "./Components/IconsBar.jsx";
import fetchCurrentLocation from "./Helpers/fetchCurrentLocation.js";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [liveWeatherData, setLiveWeatherData] = useState(null);
  const [liveWeatherFetched, setLiveWeatherFetched] = useState(false);
  const [cityName, setCityName] = useState('');
  const [Location, setLocation] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    async function getLocation() {
        try {
            const location = await fetchCurrentLocation();
            setLocation(location);
            console.log("Location: ", location);
            fetchLiveWeather(location); 
        } catch(err) {
            console.log("Error fetching location: ", err);
        }
    }
    getLocation();
}, []); 


async function fetchLiveWeather(location) {
  if (!location || location.length < 2) return;

  try {
    const liveLocationPromise = fetchCurrentWeather(location[0], location[1]);
    toast.promise(liveLocationPromise, {
      loading: "Fetching live location weather",
      success: (data) => {
        setLiveWeatherData(data);
        setLiveWeatherFetched(true);
        return "Successfully fetched live location weather";
      },
      error: "Failed to fetch current location weather"
    });
  } catch (err) {
    console.log(`Error showing live weather: ${err}`);
    toast.error("Failed to fetch live location weather. Please try again.");
  }
}



  
  
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
      setLiveWeatherData(false);
      setDataFetched(true);
      setLiveWeatherFetched(false);
    } catch (err) {
      console.error(`Error fetching weather data: `, err);
    }
  }

  return (
    <>
      <IconsBar Title={"Weather App"} />
      

      <div className="flex flex-col justify-center items-center m-10">
        <form 
          className="flex flex-col items-center shadow-lg p-8 bg-white rounded-lg max-w-md w-full" 
          onSubmit={getWeatherData}
        >
          <div>
            <input
              type="text"
              id="city"
              className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:border-sky-500 text-lg uppercase"
              value={cityName}
              placeholder="Enter city name..."
              onChange={(e) => setCityName(e.target.value)}
            />
          </div>
          <br />
          <button 
            type="submit" 
            className="w-full py-3 px-4 mt-4 text-lg text-white bg-red-500 rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300"
          >
            Show Weather
          </button>
          <Toaster />
        </form>
      </div>


      {liveWeatherFetched && (
        <div>
          <h2 className="text-2xl text-center font-semibold tracking-widest text-white bg-blue-500 py-3 mt-6 rounded-lg shadow-lg">Live Weather Data</h2>
          <WeatherCard weatherData={liveWeatherData} />
          <IconsBar className="mt-5" Title={"Thank You"} />
        </div>
      )}


      {dataFetched && (
        <div>
          <h2 className="text-2xl text-center font-semibold tracking-widest text-white bg-blue-500 py-3 mt-6 rounded-lg shadow-lg">3-Day Weather Forecast</h2>
          <WeatherCard weatherData={weatherData} />
          <IconsBar className="mt-5" Title={"Thank You"} />
        </div>
      )}
    </>
  );
}

export default App;
