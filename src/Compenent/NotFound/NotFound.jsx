import { useState } from "react"
import Style from "./NotFound.module.css"
import { useEffect } from "react"
import i from '../../assets/images/error.svg'


function NotFound() {
    const [Counter,setCounter] = useState(0)
    useEffect(()=>
        console.log("mounting NotFound")
        ,[])
  return (
    <div className="flex justify-center items-center p-10">
        <img src={i} alt="" />
    </div>

   
  )
}

export default NotFound