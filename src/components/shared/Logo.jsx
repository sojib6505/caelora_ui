

import logoImg from "../../assets/images/logo.png"; 
import { Link } from "react-router";


export default function Logo({ imgSize = "w-10 h-10" }) {

  return (
    <Link to="/" className="flex  items-center cursor-pointer">
      {/* Logo Image */}
      <img src={logoImg} alt="Logo" className={`${imgSize} object-contain`} />

      {/* Brand Name */}
      <span className="font-bold  text-2xl">KAELORA</span>
    </Link>
  );
}