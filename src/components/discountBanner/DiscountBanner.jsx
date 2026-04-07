import React from "react";
import bannerData from "../../api/discount";

export default function DiscountBanner() {
    const banner = bannerData;

    return (
        <section className="relative py-20 flex items-center justify-center"
            style={{
                background: "linear-gradient(90deg, #F4F6F5 0%, #E0C340 40%)",
            }}
        >
            <div className="max-w-6xl w-full px-12 flex flex-col md:flex-row items-center gap-12">
                {/* Left Side: Image */}
                <div className="md:w-1/2  flex justify-center md:justify-start">
                    <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-full max-w-sm object-center h-80 rounded shadow-lg"
                    />
                </div>

                {/* Right Side: Text & Info */}
                <div className="md:w-1/2 text-center md:text-left space-y-4">
                    <h2 className="text-4xl bg-white inline px-2 py-1 font-bold text-black">
                        {banner.title}
                    </h2> 
                    <p className=" mt-5 font-bold text-2xl">{banner.subtitle}</p>
                     <p className="text-xl font-bold text-gray-800">
                        Offer: {banner.startDate} - {banner.endDate}
                    </p>
                    <p className=" font-semibold text-xl">{banner.description}</p>
                   
                    <a
                        href={banner.buttonLink}
                        className="bg-black font-bold text-white px-6 py-3 rounded hover:bg-gray-800 transition inline-block mt-2"
                    >
                        {banner.buttonText}
                    </a>
                </div>
            </div>
        </section>
    );
}