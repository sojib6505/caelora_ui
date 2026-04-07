import React from "react";
import bannerImg from "../../assets/images/model1.png";
import starImg from "../../assets/icons/Star.png"; 

export default function Banner() {
  return (
    <section className="relative  bg-[#F4F6F5] w-full overflow-hidden">
      {/* Decorative Stars */}
      <img src={starImg} alt="star" className="absolute top-10 left-16 w-6 h-6" />
      <img src={starImg} alt="star" className="absolute top-32 right-20 w-4 h-4" />
      <img src={starImg} alt="star" className="absolute bottom-20 left-24 w-5 h-5" />
      <img src={starImg} alt="star" className="absolute bottom-10 right-16 w-3 h-3" />

      <div className="max-w-6xl rounded-2xl mx-auto  pt-20 flex flex-col md:flex-row items-center gap-10">
        {/* Left Text */}
        <div className="flex-1 flex flex-col space-y-4">
          <h1 className="text-5xl  w-sm md:text-6xl font-extrabold leading-tight flex flex-col">
            <span className="bg-white inline px-2 py-1">LET’S</span>
            <span className="inline px-2 py-1">EXPLORE</span>
            <span className="bg-[#EBD96B] inline px-2 py-1">UNIQUE</span>
            <span className="inline px-2 py-1">CLOTHES.</span>
          </h1>

          <p className="text-gray-700 text-lg md:text-xl font-semibold max-w-md">
            Live for Influential and Innovative fashion!..
          </p>

          <button className="bg-black font-bold text-white px-6 py-3 rounded-md w-fit mt-4 hover:bg-gray-800 transition">
            Shop Now
          </button>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src={bannerImg}
            alt="Banner"
            className="w-full  h-auto object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}