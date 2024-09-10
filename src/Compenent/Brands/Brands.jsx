import { useState } from "react"
import Style from "./Brands.module.css"
import { useEffect } from "react"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";



function Brands() {
  
    useEffect(()=>
      console.log("mounting Brands")
      ,[])


    const {data:Brands,isLoading,isError,error} = useQuery({
      queryKey: ["Brands"],
      queryFn: async () => axios("https://ecommerce.routemisr.com/api/v1/Brands"),
      select:(data) => data.data.data
    })

    if(isLoading){
      return <Loading/>
    }
    if(isError){
      return <h3>{JSON.stringify({error})}</h3>
    }
    console.log(Brands);
    
    return <>
   <div className="m-20 relative">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Brands.map((brand)=>{
          return<>
          <div onClick={()=>{
            setSelectedBrand(brand.name);
            setSubBrands([]);
            getSubBrands(brand._id);
          }} 
            className="pb-5 h-[200] border-2 border-gray-200 group hover:shadow-green-600 cursor-pointer hover:shadow-lg shadow-green-600 hover:border-green-600 rounded overflow-hidden">
            <img src={brand.image} alt="" className="w-full object-cover"/>
            <h3 className="text-green-600 text-2xl font-bold pt-3 my-3 text-center">{brand.name}</h3>
           </div>
          </>
        })}
      </div>

  </div>
  
  

</> 
}
export default Brands