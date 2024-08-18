import { useState } from "react"
import Style from "./Categories.module.css"
import { useEffect } from "react"



function Categories() {
    const [Counter,setCounter] = useState(0)
    useEffect(()=>
        console.log("mounting Categories")
        ,[])
  return (
    <div>
        <h2>Categories</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat ducimus nostrum quas optio delectus laborum recusandae sit tenetur mollitia deleniti.</p>
        </div>

   
  )
}

export default Categories