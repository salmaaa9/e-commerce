
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios"
// import { useState } from "react"

import ProductCard from "../ProductCard/ProductCard";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";



function RecentProduct() {


const {data:products,isLoading,error,isError} = useQuery({
  queryKey: ["products"],
  queryFn: () =>  axios('https://ecommerce.routemisr.com/api/v1/products'),
  select:(data) => data.data.data,
})

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


export default RecentProduct