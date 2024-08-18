import { useState } from "react"
import Style from "./Cart.module.css"
import { useEffect } from "react"



function Cart() {
    const [Counter,setCounter] = useState(0)
    useEffect(()=>
        console.log("mounting Cart")
        ,[])
  return (
    <div>
        <h2>Cart</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat ducimus nostrum quas optio delectus laborum recusandae sit tenetur mollitia deleniti.</p>
        </div>

   
  )
}

export default Cart