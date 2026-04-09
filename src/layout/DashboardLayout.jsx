import { NavLink, Outlet } from "react-router";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import UseAuth from "../hook/UseAuth";
import Navbar from "../components/shared/Navbar";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const { logOut } = UseAuth();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard/products", icon: <FaTachometerAlt /> },
    { name: "Products", path: "/dashboard/admin_products", icon: <FaBox /> },
    { name: "Orders", path: "/dashboard/orders", icon: <FaShoppingCart /> },
    { name: "Users", path: "/dashboard", icon: <FaUsers /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        {/* ================= Sidebar ================= */}
        <div
          className={`fixed md:static z-50 top-0 left-0 h-screen w-64 bg-white shadow-lg 
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transition-transform duration-300 flex flex-col`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold">Admin Panel</h2>

            {/* Close btn mobile */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          {/* Menu */}
          <ul className="flex-1 p-4 space-y-2 font-medium overflow-y-auto">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded-lg transition ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-200"
                    }`
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={logOut}
              className="flex items-center justify-center gap-2 w-full p-2 rounded-lg 
              bg-red-500 text-white hover:bg-red-600 transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* ================= Overlay (Mobile) ================= */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          ></div>
        )}

        {/* ================= Main ================= */}
        <div className="flex-1 w-full">
          {/* Topbar (Mobile + Tablet) */}
          <div className="md:hidden flex items-center justify-between p-4 bg-white shadow sticky top-0 z-30">
            <button onClick={() => setIsOpen(true)}>
              <FaBars size={20} />
            </button>
            <h1 className="font-bold">Admin</h1>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}