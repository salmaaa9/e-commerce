import { useContext, useEffect} from "react"
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CounterContext } from "../Context/counterCountext";
import Loading from "../Loading/Loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { HeartContext } from "../Context/HeartContext";



function WishList() {
  const {token} = useContext(UserContext);
  const {setHeart} = useContext(HeartContext)
  const {incCounter} = useContext(CounterContext)
  const queryClient = useQueryClient();
  const headers =
      {
        token:token
      }

useEffect(() => {
  console.log('mounting wishlist');
},[])

async function removeWishList(id){
  const {data} =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
  console.log(data.message);
  await queryClient.refetchQueries({ queryKey: ['wishList'], type: 'active' })
  setHeart((prevHearts) => ({
    ...prevHearts,
    [id]: false,
  }));
}

const {data:wishList,isLoading,error,isError} = useQuery({
  queryKey: ["wishList"],
  queryFn: () =>  axios('https://ecommerce.routemisr.com/api/v1/wishList',{headers}),
  select:(data) => data.data.data,
})

if(isLoading){
 return<><Loading/></>
}

if(isError){
  return <h3>{JSON.stringify(error)}</h3>
}

async function addToCart(id){

  const pId = {
    productId:id
  };
    const {data} =  await axios.post('https://ecommerce.routemisr.com/api/v1/cart',pId,{headers})
    console.log(data.message);
    incCounter()
    await queryClient.refetchQueries({ queryKey: ['cart'] })
}

return<>
<div className="container my-20">

      {wishList.map(function(i){
        
        return<>
        <div key={i.id} className="flex items-center justify-between border-b-2 border-green-700 bg-slate-100 dark:bg-slate-900 mx-20 mb-0 p-12">
          <div className="items-info flex items-center flex-1">
          <img src={i.imageCover} alt="" className="w-1/6"/>
          <div className="ms-6">
          <h2 className="text-xl py-2">{i.title}</h2>
          <p className="text-green-600 p-2">{i.price} EGP</p>
          <div onClick={()=>removeWishList(i.id)} className="icon flex items-center cursor-pointer">
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