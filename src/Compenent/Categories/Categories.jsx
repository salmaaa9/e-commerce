import { useState } from "react"
import Style from "./Categories.module.css"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Loading from "../Loading/Loading"




function Categories() {
  
  useQuery({ queryKey: ['categories'] })
  const [subCategories,setSubCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null);
    useEffect(()=>
      console.log("mounting Categories")
      ,[])

      async function getSubCategories(id) {
        try {
          const { data } = await axios(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
          setSubCategories(data.data); // Update state after data is fetched
          console.log(subCategories); // Now printing should show subcategories
        } catch (error) {
          console.error("Error fetching subcategories:", error);
          // Handle errors appropriately (e.g., display an error message)
        }
      }

    const {data:categories,isLoading,isError,error} = useQuery({
      queryKey: ["categories"],
      queryFn: async () => axios("https://ecommerce.routemisr.com/api/v1/categories"),
      select:(data) => data.data.data
    })

    if(isLoading){
      return <Loading/>
    }
    if(isError){
      return <h3>{JSON.stringify({error})}</h3>
    }
    console.log(categories);
    
    return <>
   <div className="m-20 relative">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category)=>{
          return<>
          <div onClick={()=>{
            setSelectedCategory(category.name);
            setSubCategories([]);
            getSubCategories(category._id);
          }} 
            className="pb-5 h-[200] border-2 border-gray-200 group hover:shadow-green-600 cursor-pointer hover:shadow-lg shadow-green-600 hover:border-green-600 rounded overflow-hidden">
            <img src={category.image} alt="" className="w-full h-96 object-cover"/>
            <h3 className="text-green-600 text-2xl font-bold pt-3 my-3 text-center">{category.name}</h3>
           </div>
          </>
        })}
      </div>

      {subCategories.length > 0 && ( // Check if subCategories has data
        <>
          {console.log(subCategories)} {/* Now it will log after data is fetched */}
          <h3 className="text-green-600 text-2xl font-bold text-center p-10"> {selectedCategory} </h3>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {subCategories.map((sub) => (
              <div key={sub.id} className="py-5 h-[200] border-1 text-center border-gray-200 group hover:shadow-green-600 cursor-pointer hover:shadow-lg shadow-green-600 hover:border-green-600 rounded overflow-hidden">
                <h3>{sub.name}</h3>
              </div>
            ))}
          </div>
        </>
      )}

  </div>
  
  

</> 
}
export default Categories