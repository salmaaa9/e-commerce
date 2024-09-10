import { useState } from "react"
import Style from "./AllOrders.module.css"
import { useEffect } from "react"
import axios from "axios"



function AllOrders() {
    const [Counter,setCounter] = useState(0)
    const [orders, setOrders] = useState([])
    
    async function getAllOrders(){
      const res = await axios(`https://ecommerce.routemisr.com/api/v1/orders/user/65d73ff7fdb5aa04a935f406`)
      setOrders(res.data)
    }
console.log(orders);

    useEffect(()=>{getAllOrders()}
        ,[])
  return (<>
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20 mx-16">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          order Id
        </th>
        <th scope="col" className="px-0 py-3">
          paymentMethodType
        </th>
        <th scope="col" className="px-6 py-3">
          order at
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          <span className="sr-only">details</span>
        </th>
      </tr>
    </thead>
     <tbody>

    
  {orders?.map((i)=>{
      console.log(i);
      return <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {i.id}
        </th>
        <td className="px-6 py-4">
          {i.paymentMethodType}
        </td>
        <td className="px-6 py-4">
          {i.createdAt}
        </td>
        <td className="px-6 py-4">
          {i.totalOrderPrice}
        </td>
        <td className="px-6 py-4 text-right">
          <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">details</a>
        </td>
      </tr>
      </>
  })}
   </tbody>
  </table>
  </div>
  </>
  )
}

export default AllOrders