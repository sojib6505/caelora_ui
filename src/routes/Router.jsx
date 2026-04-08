import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import AllProduct from "../pages/allProducts/AllProduct";
import Home from "../pages/home/Home";
import AuthLayout from "../layout/AuthLayout";
import SignUp from "../pages/authentication/SignUp";
import Login from "../pages/authentication/Login";
import UserProfile from "../pages/authentication/UserProfile";

const router = createBrowserRouter([
    {path:"/", Component: MainLayout,
        children:[
            {path:"/", Component: Home},
            {path:"all_products", Component: AllProduct},
        ]
    },
    {path:"/auth",Component: AuthLayout,
        children:[
            {index:true,Component: SignUp},
            {path:"sign_in",Component: Login},
            {path:"user_profile", Component: UserProfile}
        ]
    }
])
export default router;