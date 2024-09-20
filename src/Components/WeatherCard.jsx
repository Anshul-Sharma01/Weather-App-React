import React from "react";
import { Link } from "react-router-dom";

function WeatherCard({ weatherData }) {
    return (
        <section className="flex gap-10 flex-wrap justify-center items-center py-10 bg-gradient-to-r from-blue-100 to-blue-50">
            {weatherData?.forecast?.forecastday.map((day, index) => (
                <div key={index} className="relative flex flex-col items-center p-6 rounded-lg w-64 sm:w-72 bg-white shadow-lg transition-transform transform hover:scale-105 duration-300">
                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold text-blue-600">{weatherData?.location?.name}</h2>
                        <p className="text-sm text-gray-600">{day.date.split("-")[1]}/{day.date.split("-")[2]}</p>
                    </div>
                    <img 
                        src={`https:${day.day.condition.icon}`} 
                        alt={day.day.condition.text} 
                        className="w-24 h-24 mb-4 transition-transform duration-500 transform hover:scale-125"
                    />
                    <div className="text-4xl font-extrabold text-blue-700 mb-2">
                        {day.day.maxtemp_c}°<span className="mx-1 font-normal">/</span>{day.day.mintemp_c}°
                    </div>
                    <p className="text-gray-700 mb-2">{day.day.condition.text}</p>
                    <p className="text-gray-500 mb-4">Humidity: {day.day.avghumidity}%</p>
                    <Link 
                        to={`/hourly-forecast/${weatherData?.location?.name}/${index}`} 
                        className="mt-auto px-5 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        View Detailed Forecast
                    </Link>
                    <div className="absolute top-1 right-1 text-xs text-gray-500">
                        UV Index: {day.day.uv}
                    </div>
                </div>
            ))}
        </section>
    );
}

export default WeatherCard;
