import {createContext, useEffect, useState}  from "react";




export const CounterContext = createContext(0);

export default function CounterContextProvider(props){

    const [Counter, setCounter] = useState(localStorage.getItem('counter'))

    function incCounter(){
        setCounter(Number(Counter) + 1);
   }
    function decCounter(n){
        if (Counter == 0);
        else {setCounter(Number(Counter) - n)}
        
   }

   useEffect(()=>
    {
        Counter?
        localStorage.setItem('counter',Counter)
        :
        localStorage.setItem('counter',0)
    },[Counter])


   return <CounterContext.Provider value={{Counter,incCounter,decCounter,setCounter}}>
    {props.children}
   </CounterContext.Provider>
}