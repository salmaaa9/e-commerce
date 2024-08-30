import {createContext, useEffect, useState}  from "react";



export const HeartContext = createContext(0);

export default function HeartContextProvider(props){

    const [heart, setHeart] = useState(() => {
        const storedHeart = localStorage.getItem('heart');
        if (storedHeart) {
          return JSON.parse(storedHeart);
        } else {
          return []; // Initialize with an empty array if no stored data is found
        }
      });

    useEffect(()=>
        {
            heart?
            localStorage.setItem('heart',JSON.stringify(heart))
            :
            localStorage.removeItem('heart')
        },[heart])


   return <HeartContext.Provider value={{heart,setHeart}}>
    {props.children}
   </HeartContext.Provider>
}