
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios"
// import { useState } from "react"

import ProductCard from "../ProductCard/ProductCard";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import useProduct from "../../Hooks/useProduct";



function RecentProduct() {


const {data:products,isLoading,error,isError} = useProduct()

if(isLoading){
 return<><Loading/></>
}
if(isError){
  return <h3>{JSON.stringify(error)}</h3>
}
return <>
   <div className="m-4 sm:m-10 md:m-20">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((p)=><ProductCard key={p._id} p = {p}/>)}
      </div>

    </div>
</> 
}


export default RecentProduct