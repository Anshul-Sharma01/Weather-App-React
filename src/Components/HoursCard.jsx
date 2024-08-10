import { CiCloudOn } from "react-icons/ci";
import { FaRegSnowflake, FaWind, FaCloudRain } from "react-icons/fa";
import { MdAvTimer } from "react-icons/md";
import { TiStopwatch } from "react-icons/ti";

function HoursCard({ weatherData }){
    return(
        <>
            <div className="flex flex-col items-center p-8 h-[450px] rounded-md w-60 sm:px-12 dark:bg-gray-50 dark:text-gray-800 shadow-2xl border-blue-300 border-dotted border-2 ">
                    <div className="text-center">
                        <TiStopwatch className="inline text-3xl"/>
                        <p className="text-sm text-red-600">{weatherData?.time.split(" ")[1]}</p>
                        <p>{weatherData?.time?.split(" ")[0].split("-")[1]}/{weatherData?.time?.split(" ")[0].split("-")[2]}</p>
                    </div>
                    <img className="h-40" src={`https:${weatherData?.condition?.icon}`} alt="Weather pic" />
                    <div className="mb-2 text-3xl font-semibold">{weatherData?.temp_c}°C
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
                </div>
        </>
    )
}


export default HoursCard;


