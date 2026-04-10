import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import AllProduct from "../pages/allProducts/AllProduct";
import Home from "../pages/home/Home";
import AuthLayout from "../layout/AuthLayout";
import SignUp from "../pages/authentication/SignUp";
import Login from "../pages/authentication/Login";
import UserProfile from "../pages/authentication/UserProfile";
import DashboardLayout from "../layout/DashboardLayout";
import Users from "../pages/dashboard/Users";
import AdminProducts from "../pages/dashboard/AdminProducts";
import AddAdminProduct from "../pages/dashboard/AddAdminProduct";
import ProductDetails from "../pages/allProducts/ProductDetails";
import Cart from "../pages/allProducts/Cart";

const router = createBrowserRouter([
    {path:"/", Component: MainLayout,
        children:[
            {path:"/", Component: Home},
            {path:"all_products", Component: AllProduct},
            {path:"/product/:id", Component: ProductDetails},
            {path:"cart", Component: Cart}
        ]
    },
    {path:"/auth",Component: AuthLayout,
        children:[
            {index:true,Component: SignUp},
            {path:"sign_in",Component: Login},
            {path:"user_profile", Component: UserProfile}
        ]
    },
    {path:"/dashboard", Component: DashboardLayout,
        children:[
            {index:true, Component: Users},
            {path:"admin_products", Component: AdminProducts},
            {path:"add_admin_product" , Component: AddAdminProduct}
        ]
    }
])
export default router;