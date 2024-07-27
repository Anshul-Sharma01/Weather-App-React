import { CiCloudOn } from "react-icons/ci";
import { FaRegSnowflake, FaWind, FaCloudRain } from "react-icons/fa";
import { MdAvTimer } from "react-icons/md";
import { useParams } from "react-router-dom";
import { fetchHourlyData } from "../Helpers/fetchData";
import { useEffect, useState } from "react";

import Loader from "./Loader";

function HourlyCard() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { day, city } = useParams();

    useEffect(() => {
        if (city && day !== undefined) {
            async function fetchWeatherData() {
                setLoading(true);
                try {
                    const data = await fetchHourlyData(city, day);
                    setWeatherData(data);
                } catch (error) {
                    console.error(error);
                    setWeatherData({ error: 'Failed to fetch weather data. Please try again.' });
                } finally {
                    setLoading(false);
                }
            }
            fetchWeatherData();
        }
    }, [city, day]);

    if (loading) {
        return <div className="w-full h-full flex justify-center items-center"><Loader/></div>;
    }

    if (!weatherData || weatherData.error) {
        return <div>{weatherData?.error || 'No data available'}</div>;
    }

    return (
        <>
            {/* <div className="flex flex-col items-center p-8 rounded-md w-60 sm:px-12 dark:bg-gray-50 dark:text-gray-800 shadow-2xl">
                <div className="text-center">
                    <MdAvTimer className="inline" />
                    <p className="text-sm text-red-600">{weatherData?.time.split(" ")[1]}</p>
                    <p>{weatherData?.time?.split(" ")[0].split("-")[1]}/{weatherData?.time?.split(" ")[0].split("-")[2]}</p>
                </div>
                <img src={`https:${weatherData?.condition?.icon}`} alt="Weather pic" />
                <div className="mb-2 text-3xl font-semibold">{weatherData?.temp_c}°
                    <span className="mx-1 font-normal">/</span>{weatherData?.temp_f}F
                </div>
                <div className="text-justify flex flex-col">
                    <p className="dark:text-gray-600">{weatherData?.condition?.text}</p>
                    <p>Humidity : {weatherData?.humidity}</p>
                    <p><FaCloudRain className="inline" /> :{weatherData?.chance_of_rain}%</p>
                    <p><FaRegSnowflake className="inline" /> : {weatherData?.chance_of_snow}%</p>
                    <p><CiCloudOn className="inline" /> : {weatherData?.cloud}%</p>
                    <p><FaWind className="inline" /> : {weatherData?.wind_kph} kph</p>
                </div>
            </div> */}
        </>
    );
}

export default HourlyCard;
