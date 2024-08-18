import { useState } from "react"
import Style from "./NotFound.module.css"
import { useEffect } from "react"



function NotFound() {
    const [Counter,setCounter] = useState(0)
    useEffect(()=>
        console.log("mounting NotFound")
        ,[])
  return (
    <div>
        <h2>NotFound</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat ducimus nostrum quas optio delectus laborum recusandae sit tenetur mollitia deleniti.</p>
        </div>

   
  )
}

export default NotFound