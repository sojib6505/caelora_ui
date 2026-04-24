import React from "react";
import logo from "../../assets/images/logo.png";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen  from-white via-gray-100 to-white">
      
      <div className="relative flex items-center justify-center">
        
        {/* Glow ring */}
        <div className="absolute w-32 h-32 rounded-full bg-yellow-300 opacity-30 blur-2xl animate-pulse"></div>

        {/* Rotating logo */}
        <img
          src={logo}
          alt="Loading..."
          className="w-20 h-20 z-10 animate-spin-slow drop-shadow-xl"
        />

      </div>
    </div>
  );
}