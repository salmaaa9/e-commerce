import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios"
import { useEffect, useState } from "react"

import ProductCard from "../ProductCard/ProductCard";
import Loading from "../Loading/Loading";



function RecentProduct() {

const [products,setProducts] = useState([])
const [heart, setheart] = useState([{}])
const [isLoading, setIsLoading] = useState(false)
  

async function getProducts(){
  setIsLoading(true)
  const {data} =  await axios('https://ecommerce.routemisr.com/api/v1/products')
  console.log(data.data);
  setProducts(data.data);
  setIsLoading(false);
  const initialHearts = products.reduce((acc, product) => ({ ...acc, [product.id]: false }), {});
  setheart(initialHearts);
  console.log(heart);
}

 

useEffect(()=>{
    console.log("mounting RecentProducts"),
    getProducts()
  } 
,[])

if(isLoading){
 return<><Loading/></>
}
return <>
   <div className="m-20">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p)=><ProductCard key={p._id} p = {p}/>)}
      </div>

    </div>
</> 
}


export default RecentProduct