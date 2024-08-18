import { useState } from "react"
import Style from "./Products.module.css"
import { useEffect } from "react"



function Products() {
    const [Counter,setCounter] = useState(0)
    useEffect(()=>
        console.log("mounting Products")
        ,[])
  return (
    <div>
        <h2>Products</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat ducimus nostrum quas optio delectus laborum recusandae sit tenetur mollitia deleniti.</p>
        </div>

   
  )
}

export default Products