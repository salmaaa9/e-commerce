import { useState } from "react"
import Style from "./Products.module.css"
import { useEffect } from "react"
import useProduct from "../../Hooks/useProduct"
import Loading from "../Loading/Loading"
import ProductCard from "../ProductCard/ProductCard"



function Products() {
  const {data:products,isLoading,error,isError} = useProduct()

  if(isLoading){
   return<><Loading/></>
  }
  if(isError){
    return <h3>{JSON.stringify(error)}</h3>
  }
  return <>
     <div className="m-20">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((p)=><ProductCard key={p._id} p = {p}/>)}
        </div>
  
      </div>
  </> 
}

export default Products