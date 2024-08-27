import { useContext, useEffect, useState } from "react"
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CounterContext } from "../Context/counterCountext";
import Loading from "../Loading/Loading";



function WishList() {
  const [wish, setWish] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {token} = useContext(UserContext);
  const {incCounter} = useContext(CounterContext)
  const headers =
      {
        token:token
      }

async function removeCart(id){
  const {data} =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
  console.log(data.message);
  getWishList()
}
async function addToCart(id){

  const pId = {
    productId:id
  };
    const {data} =  await axios.post('https://ecommerce.routemisr.com/api/v1/cart',pId,{headers})
    console.log(data.message);
    incCounter()
}

async function getWishList(){
    setIsLoading(true)
    const{data} = await axios('https://ecommerce.routemisr.com/api/v1/wishlist',{headers})
    console.log(data.data);
    setWish(data.data)
    setIsLoading(false)
  }
  useEffect(()=>{
    console.log("mounting WishList"),
    getWishList()
  },
  [])

if(isLoading){
  return (<Loading/>)
}

return<>
<div className="container my-20">

      {wish.map(function(i){
        return<>
        <div key={i.id} className="flex items-center justify-between border-b-2 border-green-700 bg-slate-100 dark:bg-slate-900 mx-20 mb-0 p-12">
          <div className="items-info flex items-center flex-1">
          <img src={i.imageCover} alt="" className="w-1/6"/>
          <div className="ms-6">
          <h2 className="text-xl py-2">{i.title}</h2>
          <p className="text-green-600 p-2">{i.price} EGP</p>
          <div onClick={()=>removeCart(i.id)} className="icon flex items-center cursor-pointer">
          <FontAwesomeIcon className="text-red-600 py-2 " icon={faTrash}/>
          <span className="text-red-600 ps-2"> remove</span>
          </div>
          </div>
          </div>
        
        <button onClick={()=>addToCart(i.id)} className="border-2 border-green-600 px-4 py-2 rounded-md flex-3">Add To Cart</button>
          
        </div>
        
        </>
      }
      )}
  </div>
</>
}

export default WishList