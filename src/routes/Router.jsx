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
import PrivateRoutes from "./PrivateRoutes";
import AdminRoute from "./AdminRoute";
import EditDiscountBanner from "../pages/dashboard/EditDiscountBanner";
import PaymentPage from "../pages/allProducts/PaymentPage";


const router = createBrowserRouter([
    {path:"/", Component: MainLayout,
        children:[
            {path:"/", Component: Home},
            {path:"all_products", Component: AllProduct},
            {path:"/product/:id", Component: ProductDetails},
            {path:"cart", element: <PrivateRoutes>
                <Cart></Cart>
            </PrivateRoutes>},
            {path:"/payment",element: <PrivateRoutes>
                <PaymentPage></PaymentPage>
            </PrivateRoutes>}
        ]
    },
    {path:"/auth",Component: AuthLayout,
        children:[
            {index:true,Component: SignUp},
            {path:"sign_in",Component: Login},
            {path:"user_profile", element:<PrivateRoutes>
                <UserProfile></UserProfile>
            </PrivateRoutes>}
        ]
    },
    {path:"/dashboard", element: <AdminRoute><DashboardLayout></DashboardLayout></AdminRoute>,
        children:[
            {index:true, Component: Users},
            {path:"admin_products", Component: AdminProducts},
            {path:"add_admin_product" , Component: AddAdminProduct},
            {path:"edit_banner",Component: EditDiscountBanner}
        ]
    }
])
export default router;