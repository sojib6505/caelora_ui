import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Home from "../pages/home/Home";
import Footer from "../components/shared/Footer";


export default function MainLayout() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
