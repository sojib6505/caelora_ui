import { Navigate, useLocation } from "react-router"
import UseAuth from "../hook/UseAuth"


export default function PrivateRoutes({children}) {
    const {user,loading} = UseAuth()
    const location = useLocation();
    if(loading){
        return(
           <div className="navbar bg-base-100 shadow-sm rounded-sm flex justify-center items-center min-h-screen">
                <span className="loading loading-ring loading-xs"></span>
                <span className="loading loading-ring loading-sm"></span>
                <span className="loading loading-ring loading-md"></span>
                <span className="loading loading-ring loading-lg"></span>
                <span className="loading loading-ring loading-xl"></span>
            </div> 
        )
    }
    if(!user){
        return <Navigate to="/auth/sign_in" state={{from: location}} replace></Navigate>
    }

  return children;
}
