import React from "react";


function WeatherCard({ weatherData }){
    // console.log(iconSrc);

    return(
        <section className="flex gap-10 flex-wrap justify-center items-center"> 
            <div className="flex flex-col items-center p-8 rounded-md w-60 sm:px-12 dark:bg-gray-50 dark:text-gray-800 shadow-2xl">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">{weatherData?.location?.name}</h2>
                    <p className="text-sm dark:text-gray-600">{weatherData?.forecast?.forecastday[0].date.split("-")[1]}/{weatherData?.forecast?.forecastday[0].date.split("-")[2]}</p>
                </div>
                <img src={`https:${weatherData?.forecast?.forecastday[0]?.day?.condition?.icon}`} alt="" />
                <div className="mb-2 text-3xl font-semibold">{weatherData?.forecast?.forecastday[0].day?.maxtemp_c}°
                    <span className="mx-1 font-normal">/</span>{weatherData?.forecast?.forecastday[0].day?.mintemp_c}°
                </div>
                <p className="dark:text-gray-600">{weatherData?.forecast?.forecastday[0]?.day?.condition?.text}</p>
                <p>Humidity : {weatherData?.forecast?.forecastday[0]?.day?.avghumidity}</p>
            </div>
            <div className="flex flex-col items-center p-8 rounded-md w-60 sm:px-12 dark:bg-gray-50 dark:text-gray-800 shadow-2xl">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">{weatherData?.location?.name}</h2>
                    <p className="text-sm dark:text-gray-600">{weatherData?.forecast?.forecastday[1].date.split("-")[1]}/{weatherData?.forecast?.forecastday[1].date.split("-")[2]}</p>
                </div>
                <img src={`https:${weatherData?.forecast?.forecastday[1]?.day?.condition?.icon}`} alt="" />
                <div className="mb-2 text-3xl font-semibold">{weatherData?.forecast?.forecastday[1].day?.maxtemp_c}°
                    <span className="mx-1 font-normal">/</span>{weatherData?.forecast?.forecastday[1].day?.mintemp_c}°
                </div>
                <p className="dark:text-gray-600">{weatherData?.forecast?.forecastday[1]?.day?.condition?.text}</p>
                <p>Humidity : {weatherData?.forecast?.forecastday[1]?.day?.avghumidity}</p>
            </div>
            <div className="flex flex-col items-center p-8 rounded-md w-60 sm:px-12 dark:bg-gray-50 dark:text-gray-800 shadow-2xl">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">{weatherData?.location?.name}</h2>
                    <p className="text-sm dark:text-gray-600">{weatherData?.forecast?.forecastday[2].date.split("-")[1]}/{weatherData?.forecast?.forecastday[2].date.split("-")[2]}</p>
                </div>
                <img src={`https:${weatherData?.forecast?.forecastday[2]?.day?.condition?.icon}`} alt="" />
                <div className="mb-2 text-3xl font-semibold">{weatherData?.forecast?.forecastday[2].day?.maxtemp_c}°
                    <span className="mx-1 font-normal">/</span>{weatherData?.forecast?.forecastday[2].day?.mintemp_c}°
                </div>
                <p className="dark:text-gray-600">{weatherData?.forecast?.forecastday[2]?.day?.condition?.text}</p>
                <p>Humidity : {weatherData?.forecast?.forecastday[2]?.day?.avghumidity}</p>
            </div>
        </section>
    )

}


export default WeatherCard;













