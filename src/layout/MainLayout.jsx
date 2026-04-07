import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Home from "../pages/home/Home";


export default function MainLayout() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}
