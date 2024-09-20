import { useParams } from "react-router-dom";
import { fetchHourlyData } from "../Helpers/fetchData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "./Loader";
import HoursCard from "./HoursCard";

function HourlyCard() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { day, city } = useParams();
    const navigate = useNavigate();

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
        return <div className="w-full h-full flex justify-center items-center"><Loader /></div>;
    }

    if (!weatherData || weatherData.error) {
        return <div className="text-center text-lg text-red-500">{weatherData?.error || 'No data available'}</div>;
    }

    return (
        <>
            {/* Page heading and go back button at the top */}
            <div className="flex justify-between items-center mt-8 mb-8 px-8">
                <button 
                    onClick={() => navigate(-1)} 
                    className="px-6 py-3 border-2 border-blue-500 rounded-lg text-blue-500 hover:text-white hover:bg-blue-500 transition-colors duration-300"
                >
                    Go Back
                </button>
                <h1 className="text-3xl font-bold text-center text-gray-800">Hourly Forecast for {city} (Day {parseInt(day) + 1})</h1>
                <div></div> {/* Empty div to balance the flex layout */}
            </div>

            {/* Main content - hourly weather cards */}
            <section className="flex flex-wrap justify-center items-center gap-8 py-10 bg-blue-50 rounded-lg shadow-lg mx-8">
                {
                    weatherData?.hour.map((ele) => (
                        <HoursCard weatherData={ele} key={ele.time_epoch} />
                    ))
                }
            </section>

            {/* Go back button at the bottom */}
            <div className="flex justify-center items-center mt-10 mb-10">
                <button 
                    onClick={() => navigate(-1)} 
                    className="px-8 py-4 border-2 border-blue-500 rounded-lg text-blue-500 hover:text-white hover:bg-blue-500 transition-colors duration-300"
                >
                    Go Back
                </button>
            </div>
        </>
    );
}

export default HourlyCard;
