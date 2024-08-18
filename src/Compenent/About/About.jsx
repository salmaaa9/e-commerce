import { useState } from "react"
import Style from "./About.module.css"
import { useEffect } from "react"



function About() {
    const [Counter,setCounter] = useState(0)
    useEffect(()=>
        console.log("mounting About")
        ,[])
  return (
    <div>
        <h2>About</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat ducimus nostrum quas optio delectus laborum recusandae sit tenetur mollitia deleniti.</p>
        </div>

   
  )
}

export default About