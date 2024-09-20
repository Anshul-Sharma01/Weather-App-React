import { CiCloudOn } from "react-icons/ci";
import { FaRegSnowflake, FaWind, FaCloudRain } from "react-icons/fa";
import { TiStopwatch } from "react-icons/ti";

function HoursCard({ weatherData }) {
  return (
    <>
      <div className="flex flex-col items-center p-6 h-[450px] rounded-md w-64 sm:w-72 bg-gradient-to-br from-blue-100 to-white dark:bg-gray-50 dark:text-gray-800 shadow-2xl border-blue-500 border-dashed border-2 transform transition-transform hover:scale-105 hover:border-blue-700">
        {/* Time Section */}
        <div className="text-center mb-4">
          <TiStopwatch className="inline text-blue-500 text-4xl mb-2" />
          <p className="text-sm font-semibold text-gray-600">{weatherData?.time.split(" ")[1]}</p>
          <p className="text-xs text-gray-500">
            {weatherData?.time?.split(" ")[0].split("-")[1]}/
            {weatherData?.time?.split(" ")[0].split("-")[2]}
          </p>
        </div>

        {/* Weather Icon */}
        <img
          className="h-28 mb-4"
          src={`https:${weatherData?.condition?.icon}`}
          alt="Weather pic"
        />

        {/* Temperature */}
        <div className="text-center mb-4">
          <span className="text-4xl font-semibold text-blue-600">
            {weatherData?.temp_c}°C
          </span>
          <span className="mx-2 text-xl font-normal text-gray-500">/</span>
          <span className="text-2xl text-gray-600">{weatherData?.temp_f}°F</span>
        </div>

        {/* Weather Details */}
        <div className="flex flex-col space-y-2 text-sm text-gray-700">
          <p className="font-semibold text-gray-600">{weatherData?.condition?.text}</p>
          <p>Humidity: <span className="font-semibold">{weatherData?.humidity}%</span></p>
          <p>
            <FaCloudRain className="inline text-blue-500" /> 
            <span className="ml-2">Rain: {weatherData?.chance_of_rain}%</span>
          </p>
          <p>
            <FaRegSnowflake className="inline text-blue-500" /> 
            <span className="ml-2">Snow: {weatherData?.chance_of_snow}%</span>
          </p>
          <p>
            <CiCloudOn className="inline text-gray-500" /> 
            <span className="ml-2">Cloud: {weatherData?.cloud}%</span>
          </p>
          <p>
            <FaWind className="inline text-gray-500" /> 
            <span className="ml-2">Wind: {weatherData?.wind_kph} kph</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default HoursCard;
