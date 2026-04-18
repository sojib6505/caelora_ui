import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import Logo from "./Logo";
import UseAuth from "../../hook/UseAuth";
import UseUserData from "../../hook/UseUserData";
import UseCart from "../../hook/UseCart";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [search, setSearch] = useState("");
  const { user } = UseAuth();
  const { userData } = UseUserData();
  const navigate = useNavigate();
  const isAdmin = userData?.role === "admin"
  const { cartCount } = UseCart();
  const menuItems = [
    { name: "HOME", path: "/" },
    { name: "ALL PRODUCTS", path: "/all_products" },
    ...(isAdmin ? [{ name: "DASHBOARD", path: "/dashboard" }] : []),
    { name: "My Order", path: "/my_order" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setShowMobileSearch(!showMobileSearch);

  const handleSearch = () => {
    navigate("/all_products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  //  Determine if user is logged in
  const userReady = userData || user;
  const displayPhoto = userData?.photoURL || user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png";

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between font-poppins bg-white shadow-sm sticky top-0  z-50">
      {/* Logo */}
      <Logo />

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <ul className="flex items-center space-x-6 text-black">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `hover:text-gray-600 ${isActive ? "font-bold" : "font-normal"}`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-3 pr-10 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <FaSearch onClick={handleSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Cart Icon */}
        <NavLink to="/cart" className="text-black text-lg relative">
          <FaShoppingCart />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white font-medium px-2 rounded-full text-xs">
              {cartCount}
            </span>
          )}
        </NavLink>

        {/* User / Sign Up */}
        {userReady ? (
          <NavLink to="/auth/user_profile">
            <img
              src={displayPhoto}
              alt="user"
              className="w-10 h-10 rounded-full border-2 border-black cursor-pointer"
            />
          </NavLink>
        ) : (
          <NavLink to="/auth">
            <button className="bg-black font-bold text-white px-4 py-2 rounded hover:bg-gray-800">
              SIGN UP
            </button>
          </NavLink>
        )}
      </div>

      {/* Mobile Buttons */}
      <div className="md:hidden flex items-center space-x-4">
        <button onClick={toggleSearch} className="text-black text-lg">
          <FaSearch />
        </button>

        <NavLink to="/cart" className="text-black text-lg relative">
          <FaShoppingCart />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white font-medium px-2 rounded-full text-xs">
              {cartCount}
            </span>
          )}
        </NavLink>

        <button onClick={toggleMenu} className="text-black focus:outline-none">
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Search */}
      {showMobileSearch && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-20 px-6 py-2">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-3 pr-10 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-10 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-96 opacity-0 pointer-events-none"
          }`}
      >
        <ul className="flex flex-col items-center space-y-4 py-4 text-black">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `hover:text-gray-600 ${isActive ? "font-bold" : "font-normal"}`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          <li>
            {userReady ? (
              <NavLink to="/auth/user_profile">
                <img
                  src={displayPhoto}
                  alt="user"
                  className="w-10 h-10 rounded-full border-2 border-black cursor-pointer"
                />
              </NavLink>
            ) : (
              <NavLink to="/auth">
                <button className="bg-black font-bold text-white px-4 py-2 rounded hover:bg-gray-800">
                  SIGN UP
                </button>
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}