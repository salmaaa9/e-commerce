import {createContext, useContext, useEffect, useState}  from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { CounterContext } from "./counterCountext";
import { QueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";




export const CartContext = createContext(0);

export default function CartContextProvider(props){

    const token = localStorage.getItem('token')
    const headers ={
        token: token
    }
    console.log(token);
    
    console.log(headers);
    
    
    async function addToCart(id){
        const headers = {
          token: token // Include mandatory Authorization header
        };
        const pId = {
          productId:id
        };
        const {data} =  await axios.post('https://ecommerce.routemisr.com/api/v1/cart',pId,{headers})
          console.log(data.message);
          incCounter()
          await QueryClient.invalidateQueries({ queryKey: ['cart'] })
          Swal.fire({
            position:"top-end",
            timer:2000,
            showConfirmButton:false,
            text: `${data.message}`,
            icon: "success"
          });
            
    }
    function checkoutSession(cartId,shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{
            
            "shippingAddress": shippingAddress

        },{headers}  
        )
        .then(data => data)
        .catch(err => err)
    }



   return <CartContext.Provider value={{
    addToCart,
    checkoutSession,
    }}>
    {props.children}
   </CartContext.Provider>
}