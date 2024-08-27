import { useContext, useState } from "react"
import Style from "./ProductDetails.module.css"
import { useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import Loading from "../Loading/Loading"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../Context/UserContext"
import Swal from "sweetalert2"
import { CounterContext } from "../Context/counterCountext"



function ProductDetails() {
const x = useParams()
const [isLoading, setIsLoading] = useState(false)
const [product, setProduct] = useState({})
const [heart, setHeart] = useState(false)
const {token} = useContext(UserContext)
const {incCounter} = useContext(CounterContext)

async function getProductDetails(id){
  setIsLoading(true)
try {
  const {data} = await axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`) 
  console.log(data.data);
  setProduct(data.data);
  console.log(product);
  setIsLoading(false)
}
catch (error) {
  console.error(error);
}
}

async function addWishList(id){
  console.log(heart);
  console.log(id);
  setHeart((prevHearts) => ({
    ...prevHearts,
    [id]: !prevHearts[id],
  }));

  const headers = {
    token: token // Include mandatory Authorization header
  };
  const pId = {
    productId:id
  };

  if(!heart[id]){
    const {data} =  await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',pId,{headers})
    console.log(data.message);
    Swal.fire({
      position:"top-end",
      timer:2000,
      showConfirmButton:false,
      text: `${data.message}`,
      icon: "success"
    });
  }
  else{
    const {data} =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
    console.log(data.message);
    Swal.fire({
      position:"top-end",
      timer:2000,
      showConfirmButton:false,
      text: `${data.message}`,
      icon: "success"
    });
  }
 
}

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
    Swal.fire({
      position:"top-end",
      timer:2000,
      showConfirmButton:false,
      text: `${data.message}`,
      icon: "success"
    });
  
}

useEffect(()=>{
  console.log("mounting ProductDetails")
  getProductDetails(x.id)
},[])

if(isLoading){
  return <Loading/>
}
  return (
  <>
  <div className="grid sm:grid-cols-12 m-20 items-center">
    <div className="col-span-4">
      <img src={product?.imageCover} alt={product?.title} className="w-10/12"/>
    </div>
    <div className="col-span-8 ">
      
      <div className="flex justify-start gap-40">
      
      <div className="left">
      <h1 className="text-3xl mb-3">{product?.title}</h1>
      <p className="mb-3">{product?.description}</p>
      <p className="mb-3">{product?.price} EGP</p>
     
      </div>
      
      
      {/* rating and add to wishlist */}
      <div className="right flex items-center gap-3">
      <FontAwesomeIcon  onClick={()=>{addWishList(product.id)}} className = {`text-2xl cursor-pointer ${heart[product.id] && 'text-red-700'} `} icon={faHeart}/>
      <div className="flex items-center gap-2">
        <FontAwesomeIcon className="text-yellow-400" icon={faStar}/>
        <p className="line-clamp-3">{product.ratingsAverage}</p>
      </div>
      </div>

      </div>

      
      <button onClick={()=>addToCart(product.id)} className="bg-green-600 hover:bg-green-700 duration-300 w-10/12 py-2 rounded-lg text-white">+ Add</button>
    </div>
  </div>
  </> 
  )
}

export default ProductDetails