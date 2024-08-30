import {createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import Home from "./Compenent/Home/Home"
import Register from "./Compenent/Register/Register"
import Login from "./Compenent/Login/Login"
import Cart from "./Compenent/Cart/Cart"
import Brands from "./Compenent/Brands/Brands"
import Products from "./Compenent/Products/Products"
import Categories from "./Compenent/Categories/Categories"
import Layout from "./Compenent/Layout/Layout"
import NotFound from "./Compenent/NotFound/NotFound"
import CounterContextProvider from "./Compenent/Context/CounterCountext";
import UserContext  from "./Compenent/Context/UserContext"
import ProtectedRoute from "./Compenent/ProtectedRoute/ProtectedRoute"
import WishList from "./Compenent/WishList/WishList"
import ProductDetails from "./Compenent/ProductDetails/ProductDetails"
import { QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import HeartContextProvider, { HeartContext } from "./Compenent/Context/HeartContext"
import UserContextProvider from "./Compenent/Context/UserContext"

const queryClient = new QueryClient(
  {defaultOptions :{
    queries : {
      staleTime : 5 * 60 * 1000,
    }
  }
  }
)

const router = createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path :'login',element: <Login/>},
    {path :'register',element:<Register/> },
    {path :'cart',element:<ProtectedRoute><Cart/></ProtectedRoute> },
    {path :'whishlist',element:<ProtectedRoute><WishList/></ProtectedRoute> },
    {path :'products',element:<ProtectedRoute><Products/></ProtectedRoute> },
    {path :'ProductDetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute> },
    {path :'home',element:<ProtectedRoute><Home/></ProtectedRoute> },
    {path :'categories',element:<ProtectedRoute><Categories/></ProtectedRoute> },
    {path :'brands',element:<ProtectedRoute><Brands/></ProtectedRoute> },
    {path :'*',element:<ProtectedRoute><NotFound/></ProtectedRoute>}
  ]}
])

export default function App() {
  return <>
    <QueryClientProvider client={queryClient}>
      <HeartContextProvider>
        <UserContextProvider>
          <CounterContextProvider>
            <RouterProvider router={router}></RouterProvider>
          </CounterContextProvider>
        </UserContextProvider>
      </HeartContextProvider>
  <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>  
  </> 
}

