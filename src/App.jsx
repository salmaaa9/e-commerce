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


const router = createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true,element:<Home/>},
    {path :'login',element: <Login/>},
    {path :'register',element: <Register/>},
    {path :'cart',element: <Cart/>},
    // {path :'whishlist',element: <Wishlist/>}
    {path :'products',element: <Products/>},
    {path :'home',element: <Home/>},
    {path :'categories',element: <Categories/>},
    {path :'brands',element: <Brands/>},
    {path :'*',element: <NotFound/>}
  ]}
])
export default function App() {
  return <>
    <RouterProvider router={router}></RouterProvider>
  </>
   
}

