import { useContext} from "react"
import Style from "./ProtectedRoute.module.css"
import { useEffect } from "react"
import { UserContext } from "../../Context/UserContext"
import { Navigate } from "react-router-dom";



function ProtectedRoute(props) {
  
  useEffect(()=>
    console.log("mounting ProtectedRoute")
    ,[])

   const {token} = useContext(UserContext);
   if(token){
    return props.children
    // login
   }else{
    // m4 loged in
    return<>
    <Navigate to={'/login'}></Navigate>
    </>

    }
}

export default ProtectedRoute