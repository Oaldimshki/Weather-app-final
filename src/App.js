import React, { useState, useEffect } from "react";

//import axios
import axios from "axios";

import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureFahrenheit } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";



const APIkey = "&APPID=767a7cce68ed2b3098d41e24364ec56c";

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("los angeles");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    //prevent defaults
    e.preventDefault();

    //if input values is not empty
    if (inputValue !== "") {
      setLocation(inputValue);
    }

    //select input
    const input = document.querySelector("input");

    //if input value is empty
    if (input.value === "") {
      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    //clear input
    input.value = "";
    
  };

  //fetch the data
  useEffect(() => {
    //set loading to true
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial${APIkey}`;
    axios
      .get(url)
      .then((res) => {
        //set the data after 1500ms
        setTimeout(() => {
          setData(res.data);
          //set loading to false
          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  //Error Message
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  //if data is false show the loader

  if (!data) {
    return (
      <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
        <div>
          <ImSpinner8 className="text-5xl animate-spin text-white" />
        </div>
      </div>
    );
  }
  let icon;

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Mist":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-[#31cafb]" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-[#31cafb]" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  // date object
  const date = new Date();

  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col relative items-center justify-center px-4 lg:px-0">
      {errorMsg && (
        <div className="w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c] text-white absolute z-10 top-2 lg:top10 p-4 capitalize rounded-md">{`${errorMsg.response.data.message}`}</div>
      )}
      {/*form*/}
      <form
        className={`${
          animate ? "animate-shake" : "animate-none"
        } h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            onChange={(e) => handleInput(e)}
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15[x] font-light pl-6 h-full"
            type="text"
            placeholder="Search by city"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center translation"
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      {/*card*/}
      <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ImSpinner8 className=" text-white text-5xl animate-spin" />
          </div>
        ) : (
          <div>
            {/*Card top*/}
            <div className="flex items-center gap-x-5">
              {/*icon*/}
              <div className="text-[87px]">{icon}</div>
              <div>
              {/*country name*/}
              <div className="text-2xl font-semibold">
                {data.name}, {data.sys.country}
              </div>
              {/*date*/}
              <div>
                {date.getUTCMonth() + 1}/{date.getUTCDate()}/
                {date.getUTCFullYear()}
              </div>
              </div>
            </div>
            {/*Card body*/}
            <div className="my-20 ">
              <div className="flex justify-center items-center">
                {/*temp*/}
                <div className="text-[144px] leading-none font-light">
                  {parseInt(data.main.temp)}
                </div>
                {/*Fahernheit icon*/}
                <div className="text-4xl">
                  <TbTemperatureFahrenheit />
                </div>
              </div>
              {/*Weather Description*/}
              <div className="capitalize text-center">
                {data.weather[0].description}
              </div>
            </div>
            {/*Card bottom*/}
            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/*Icon*/}
                  <div className="text[20px]">
                    <BsEye />
                  </div>
                  <div>
                    Visibility{""}{" "}
                    <span className="ml-2">
                      {Math.floor(data.visibility / 1609.34)} Mi
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/*Icon*/}
                  <div className="text[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex ">
                    Feels Like{""}{" "}
                    <span className="flex ml-2">
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureFahrenheit />
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/*Icon*/}
                  <div className="text[20px]">
                    <BsWater />
                  </div>
                  <div>
                    Humidty{""}{" "}
                    <span className="ml-2">{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/*Icon*/}
                  <div className="text[20px]">
                    <BsWind />
                  </div>
                  <div className="flex ">
                    Wind{""}{" "}
                    <span className="flex ml-2">
                      {Math.floor(data.wind.speed * 2.237)} Mph &nbsp;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
