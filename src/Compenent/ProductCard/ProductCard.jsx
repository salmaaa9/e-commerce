import { useContext} from "react"
import Style from "./ProductCard.module.css"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons"
import Swal from 'sweetalert2'
import { UserContext } from "../Context/UserContext";
import { CounterContext } from "../Context/counterCountext"
import axios from "axios"
import { Link } from "react-router-dom"
import { HeartContext } from "../Context/HeartContext"
import { useQueryClient } from "@tanstack/react-query"
import { CartContext } from "../Context/CartContext"




function ProductCard({p}) {
const {token} = useContext(UserContext);
const {incCounter} = useContext(CounterContext)
const {heart,setHeart} = useContext(HeartContext)
// const {addToCart} = useContext(CartContext)
const queryClient = useQueryClient()

useEffect(()=>
        console.log("mounting ProductCard")
,[])

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
            await queryClient.invalidateQueries({ queryKey: ['wishList'] })
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
            await queryClient.invalidateQueries({ queryKey: ['wishList'] })
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
    await queryClient.invalidateQueries({ queryKey: ['cart'] })
    Swal.fire({
      position:"top-end",
      timer:2000,
      showConfirmButton:false,
      text: `${data.message}`,
      icon: "success"
    });
      
}

      return<>
        <div className="relative pb-14 group hover:shadow-green-600 cursor-pointer hover:shadow-lg shadow-green-600 border-green-600 p-3 rounded overflow-hidden">

        <Link to={`/ProductDetails/${p.id}`}>
        <div  className="">
        <img  src={p.imageCover} alt={p.name} className="w-full"/>
        {/*categoriy & title  */}
        <h4 className="text-green-600 my-3">{p.category.name.split(' ').slice(0,2).join(' ')}</h4>
        <h3 className="dark:text-white text-lg my-3">{p.title.split(' ').slice(0,2).join(' ')}</h3>
        {/* price and rating */}
        <div className="flex justify-between">
        <p className="line-clamp-3">{p.price} EGP</p>
        <div className="right flex items-center gap-2">
        <FontAwesomeIcon className="text-yellow-400" icon={faStar}/>
        <p className="line-clamp-3">{p.ratingsAverage}</p>
        </div>
        
        </div>
        
        </div>
        </Link>

        {/* heart and add to cart */}
        <div className="absolute bottom-3 flex gap-3 justify-between overflow-hidden">
        <button onClick={()=>{addToCart(p.id)}} className="bg-green-600 py-2 px-24 rounded-md text-center translate-y-52 group-hover:translate-y-0 transition duration-200 ease-in-out">+ add</button>
        <FontAwesomeIcon  onClick={()=>{addWishList(p.id)}} className = {`text-2xl ${heart[p.id] && 'text-red-700'} `} icon={faHeart}/>
        </div>

        </div>
        
        
      </>
}

export default ProductCard