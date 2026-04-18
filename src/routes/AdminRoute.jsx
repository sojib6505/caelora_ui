import { Navigate } from "react-router"
import UseAuth from "../hook/UseAuth"
import UseUserData from "../hook/UseUserData"


export default function AdminRoute({children}) {
    const {userData,userLoading} = UseUserData()
    const isAdmin = userData?.role === "admin"
    if(userLoading){
       return(
         <div className="text-4xl font-bold text-center">
            <h1>Loading.........</h1>
        </div>
       )
    }
   //  if(!isAdmin){
   //    return <Navigate to='/'/>
   //  }
   return children;
}
