import {createContext, useState}  from "react";



export const CounterContext = createContext(0);

export default function CounterContextProvider(props){

    const [Counter, setCounter] = useState(0)

    function incCounter(){
        setCounter(Counter + 1);
   }
    function decCounter(){
        if (Counter == 0);
        else {setCounter(Counter - 1)}
        
   }


   return <CounterContext.Provider value={{Counter,incCounter,decCounter,setCounter}}>
    {props.children}
   </CounterContext.Provider>
}