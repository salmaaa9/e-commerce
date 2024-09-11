import { useContext, useEffect} from "react"
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading/Loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { CounterContext } from "../../Context/CounterCountext"



function Cart() {
  // const [price, setPrice] = useState(0);
  const {token} = useContext(UserContext);
  const {Counter,incCounter,decCounter,setCounter} = useContext(CounterContext)
  const queryClient = useQueryClient()
  let total = 0;
  let noItems = 0;
  const headers =
      {
        token:token
      }
useEffect(()=>{
  console.log("mounting Cart")
},[])

async function removeCart(id,countNo){
  const {data} =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers})
  console.log(data.message);
  await queryClient.invalidateQueries({ queryKey: ['cart'] })
  decCounter(countNo)
}
async function updateCart(id,no){
  const count =
  {
    "count": no
  }
  const {data} =  await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,count,{headers})
  console.log(data.message);
  await queryClient.invalidateQueries({ queryKey: ['cart'] })
}
const {data:cart,isLoading,error,isError} = useQuery({
  queryKey: ["cart"],
  queryFn: () => axios('https://ecommerce.routemisr.com/api/v1/cart',{headers}),
  select:(data) => data.data.data,
})

if(isLoading){
  return<><Loading/></>
 }
 if(isError){
   return <h3>{JSON.stringify(error)}</h3>
 }


async function clearCart(){
  const{data} = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{headers})
  console.log(data);
  setCounter(0)
  await queryClient.invalidateQueries({queryKey: ['cart'] })
}

console.log(cart)

cart.products?.forEach(i => {
  total += (i.price * i.count)
  noItems += i.count
})
console.log(total);
// no items to check counter
console.log(noItems);


return<>
<div className="container my-20 dark:bg-slate-900 bg-slate-100 w-11/12 m-auto p-12">

<div className="flex justify-between">
<div className="left"><h1 className="text-2xl font-bold mb-6">Cart Shop</h1>
<p  className="text-xl font-semibold">Total prices : <span className="text-green-600">{cart.totalCartPrice} EGP</span></p>
</div>
<div className="right">
  <Link to={`/checkout/`+cart._id} className="bg-green-600 px-4 py-2 rounded-lg text-lg text-white">Check Out</Link>
  <p className="text-lg mt-6">total no of items : <span className="text-green-600">{Counter}</span></p>
</div>
</div>

{(cart.products)?.map(function(i){
  return<>
    <div key={i.product?.id} className="flex items-center justify-between border-b-2 border-green-700 mb-0 p-5">
      <div className="items-info flex items-center flex-1">
          <img src={i.product.imageCover} alt="" className="w-1/6"/>
          <div className="ms-6">
          <h2 className="text-xl py-2">{i?.product.title}</h2>
          <p className="text-green-600 p-2">{i?.price} EGP</p>
          <div onClick={()=>removeCart(i?.product.id,i?.count)} className="icon flex items-center cursor-pointer">
          <FontAwesomeIcon className="text-red-600 py-2 " icon={faTrash}/>
          <span className="text-red-600 ps-2">remove</span>
          </div>
          </div>
      </div>
      <button onClick={()=>{updateCart(i?.product.id,i?.count+1) 
        incCounter()}} className="border-2 border-green-600 px-2 py-1 rounded-md flex-3">+</button>
      <p className="px-6">{i.count}</p>
      <button onClick={()=>{updateCart(i?.product.id,i?.count-1)
      decCounter(1)}} className="border-2 border-green-600 px-2 py-1 rounded-md flex-3">-</button>  
    </div>  
    </>
    }
)}
    
<div className="flex justify-center items-center">
<button onClick={clearCart} className="border-2 border-green-600 px-6 py-3 rounded-md my-6">Clear your Cart</button>
</div>

</div>

</>
}

export default Cart