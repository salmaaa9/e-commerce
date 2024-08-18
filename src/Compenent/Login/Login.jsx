import { useState } from "react"
import Style from "./Login.module.css"
import { useEffect } from "react"



function Login() {
    const [Counter,setCounter] = useState(0)
    useEffect(()=>
        console.log("mounting Login")
        ,[])
  return (
    <div>
        <h2>Login</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat ducimus nostrum quas optio delectus laborum recusandae sit tenetur mollitia deleniti.</p>
        </div>

   
  )
}

export default Login