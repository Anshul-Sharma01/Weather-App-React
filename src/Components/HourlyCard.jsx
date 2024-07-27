
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
        return <div className="w-full h-full flex justify-center items-center"><Loader/></div>;
    }

    if (!weatherData || weatherData.error) {
        return <div>{weatherData?.error || 'No data available'}</div>;
    }
    return (
        <>
            <section className="flex flex-row items-center justify-center gap-10 flex-wrap">
                {
                    weatherData?.hour.map((ele) => (
                        <HoursCard weatherData={ele} key={ele.time_epoch}/>
                    ))
                }
            </section>
                <button onClick={() => navigate(-1)} className="mt-20 ml-[350px] w-fit px-8 py-4 border-red-500 border-solid border-2 rounded-lg  hover:text-white hover:bg-red-500 hover:border-white">Go Back</button>

        </>
    );
}

export default HourlyCard;
