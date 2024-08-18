import { useState } from "react"
import Style from "./Brands.module.css"
import { useEffect } from "react"



function Brands() {
    const [Counter,setCounter] = useState(0)
    useEffect(()=>
        console.log("mounting Brands")
        ,[])
  return (
    <div>
        <h2>Brands</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat ducimus nostrum quas optio delectus laborum recusandae sit tenetur mollitia deleniti.</p>
        </div>

   
  )
}

export default Brands