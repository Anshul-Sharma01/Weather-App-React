import { FaCloudRain, FaRegSnowflake } from "react-icons/fa";
import { IoCloudSharp, IoSunny } from "react-icons/io5";




function IconsBar({ Title }){
    

    return(
        <>
            <section className=" flex justify-center items-center gap-10 p-4 bg-sky-500 text-white">
                <FaCloudRain className="text-slate-400 text-3xl"/>
                <IoCloudSharp className="text-black text-3xl"/>
                <FaRegSnowflake className="text-3xl"/>
                <IoSunny className="text-orange-400 text-3xl"/>
                <h1 className="font-mono tracking-widest uppercase text-3xl"> {Title} </h1>
                <IoSunny className="text-orange-400 text-3xl"/>
                <FaRegSnowflake className="text-3xl"/>
                <IoCloudSharp className="text-black text-3xl"/>
                <FaCloudRain className="text-slate-400 text-3xl"/>

            </section>
        </>
    )


}

export default IconsBar;










