import { FaCloudRain, FaRegSnowflake } from "react-icons/fa";
import { IoCloudSharp, IoSunny } from "react-icons/io5";

function IconsBar({ Title }) {
    return (
        <>
            <section className="flex justify-between items-center p-6 bg-gradient-to-r from-sky-500 via-blue-500 to-sky-500 text-white shadow-lg">
                {/* Left Icons */}
                <div className="flex gap-6">
                    <FaCloudRain className="text-4xl text-sky-200 animate-pulse" />
                    <IoCloudSharp className="text-4xl text-white" />
                    <FaRegSnowflake className="text-4xl text-sky-100 animate-spin" />
                    <IoSunny className="text-4xl text-yellow-400 animate-bounce" />
                </div>

                {/* Title in the center */}
                <h1 className="font-mono tracking-widest uppercase text-4xl text-center">
                    {Title}
                </h1>

                {/* Right Icons */}
                <div className="flex gap-6">
                    <IoSunny className="text-4xl text-yellow-400 animate-bounce" />
                    <FaRegSnowflake className="text-4xl text-sky-100 animate-spin" />
                    <IoCloudSharp className="text-4xl text-white" />
                    <FaCloudRain className="text-4xl text-sky-200 animate-pulse" />
                </div>
            </section>
        </>
    );
}

export default IconsBar;
