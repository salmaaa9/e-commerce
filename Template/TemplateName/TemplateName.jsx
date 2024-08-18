import { useState } from "react"
import Style from "./TemplateName.module.css"
import { useEffect } from "react"



function TemplateName() {
    const [Counter,setCounter] = useState(0)
    useEffect(()=>
        console.log("mounting TemplateName")
        ,[])
  return (
    <div>
        <h2>TemplateName</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat ducimus nostrum quas optio delectus laborum recusandae sit tenetur mollitia deleniti.</p>
        </div>

   
  )
}

export default TemplateName