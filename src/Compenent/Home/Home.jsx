// import { useState } from "react"
// import Style from "./Home.module.css"
import { useEffect } from "react"



function Home() {
    // const [Counter,setCounter] = useState(0)
    useEffect(()=>
        console.log("mounting home")
        ,[])
  return (
    <>
     <div className="text-center flex justify-center items-center">
        <h2>Home</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat ducimus nostrum quas optio delectus laborum recusandae sit tenetur mollitia deleniti.</p>
      </div>
    </> 
  )
}

export default Home