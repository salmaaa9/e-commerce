import {createContext, useContext, useEffect, useState}  from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { CounterContext } from "./CounterCountext";
import { QueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";




export const NavBarBadges = createContext(0);

export default function NavBarBadgesProvider(props){
    const [badge,setBadge] = useState([
        { id: 1,state:false, name: 'home' },
        { id: 2,state:false, name: 'cart' },
        { id: 3,state:false, name: 'wishlist' },
        { id: 4,state:false, name: 'products' },
        { id: 5,state:false, name: 'products' },
        { id: 6,state:false, name: 'products' },
    ])

   return <NavBarBadges.Provider value={{badge,setBadge}}>
    {props.children}
   </NavBarBadges.Provider>
}