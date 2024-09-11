import {createContext, useEffect, useState}  from "react";



export const LoadingContext = createContext(0);

export default function LoadingContextProvider(props){

    const [isLoading, setIsLoading] = useState(false)

   return <LoadingContext.Provider value={{isLoading,setIsLoading}}>
    {props.children}
   </LoadingContext.Provider>
}