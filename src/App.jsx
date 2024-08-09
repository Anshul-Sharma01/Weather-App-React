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
    async function getLocation(){
      try{
        const location = await fetchCurrentLocation();
        setLocation(location);
        console.log("Location : ", location);
      }catch(err){
        console.log("Error fetching location : ", err);
      }
    }
    getLocation();
    fetchLiveWeather();
  }, [])

  async function fetchLiveWeather(){
    try{
      const liveLocation = await fetchCurrentWeather(Location[0], Location[1]);
      setLiveWeatherData(liveLocation);
      setLiveWeatherFetched(true);
    }catch(err){
      console.log(`Error showing live weather : ${err}`);
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
      // console.log(data.current.condition.icon);
    } catch (err) {
      console.error(`Error fetching weather data: `, err);
    }
  }

  return (
    <>
      <IconsBar Title={"Weather App"}/> 
      <div className="flex flex-col justify-center m-10 items-center min-h-[200px]">
        <form className="flex justify-center items-center flex-col shadow-xl p-10 min-w-[400px]" onSubmit={getWeatherData}>
          <div>
            <input
              type="text"
              id="city"
              className=" tracking-widest uppercase border-solid border-2 rounded-lg  border-slate-400 px-6 py-2"
              value={cityName}
              placeholder="enter city name.."
              onChange={(e) => setCityName(e.target.value)}
            />
          </div>
          <br />
          <button type="submit" className="border-solid border-2 px-4 py-2 bg-cyan-400 hover:bg-cyan-600 rounded-xl border-violet-400 text-lg">
            Show Weather Data
          </button>
          <Toaster />
        </form>

      </div>
      {
        liveWeatherFetched && (
          <>
            <div>
              <h2 className="text-2xl text-center m-4 p-4 bg-yellow-200 tracking-widest font-mono">3-Day forecast</h2>
              <WeatherCard weatherData = {liveWeatherData}/>
            </div>
            <IconsBar className="mt-5" Title={"Thank you"} />
          </>
        )
      }
      {dataFetched && (
        <>
          <div>
            <h2 className="text-2xl text-center m-4 p-4 bg-yellow-200 tracking-widest font-mono">3-Day forecast</h2>
            <WeatherCard weatherData = {weatherData}/>
          </div>
          <IconsBar className="mt-5" Title={"Thank you"} />

        </>
      )}
      
    </>
  );
}

export default App;
