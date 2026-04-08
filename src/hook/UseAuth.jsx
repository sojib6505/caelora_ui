import { useContext } from "react"
import AuthContext from "../context/authContext/AuthContext"
const UseAuth = () => {
    return useContext(AuthContext);
}
export default UseAuth;