import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import AllProduct from "../pages/allProducts/AllProduct";
import Home from "../pages/home/Home";

const router = createBrowserRouter([
    {path:"/", Component: MainLayout,
        children:[
            {path:"/", Component: Home},
            {path:"all_products", Component: AllProduct},
        ]
    }
])
export default router;