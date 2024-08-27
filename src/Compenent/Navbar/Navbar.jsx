
import { useContext, useEffect, useState } from "react"
import logo from "../../assets/images/logo.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// const images = Object.values(import.meta.glob('../../assets/images/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, as: 'url' }));
import { Link, Navigate, useNavigate } from "react-router-dom"
import {  faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { CounterContext } from "../Context/CounterCountext";
import { UserContext } from "../Context/UserContext";



function Navbar() {
  const {token,setToken} = useContext(UserContext);
  const {Counter}= useContext(CounterContext)
  const [dark, setDark] = useState(localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
  const navigate = useNavigate() 
  function LogOut(){
    setToken(null)
    navigate('/login')
  }
  useEffect(()=>{
    const html =document.querySelector('html')
    if(dark){
      html.classList.add('dark')
      localStorage.setItem('color-theme','dark')
      }
      else{
        html.classList.remove('dark')
        localStorage.setItem('color-theme','light')  
      }
    console.log("mounting Navbar")
    },[dark])

    useEffect(()=>{
      console.log(Counter)
    },[Counter])

  return (
  <>
    <nav className="fixed bg-slate-50 dark:bg-gray-900 fixed-top w-full z-20 start-0 border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    
    {/* logo */}
    <Link to="home" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={logo} className="h-8 dark:bg-slate-100 rounded-md" alt="e-commerce Logo" />
    </Link>

    {/* buttons and toggler */}
    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      {/* cart */}
      {token && <>
      <Link to="cart" className="flex items-center space-x-3 rtl:space-x-reverse relative me-2">
      <button className="cart-count bg-green-800 px-2 absolute text-white bottom-5 start-7 rounded-lg">{Counter}</button>
      <FontAwesomeIcon className="dark:text-white text-2xl" icon={faCartShopping} />
      </Link>
      <button onClick={LogOut} type="button" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Log out</button>
      </>}
      {!token && <>
        <ul className="flex flex-col items-center p-4 md:p-0 mt-4 me-5 font-medium border border-gray-100 rounded-lg bg-slate-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
          <Link to="login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">login</Link>
        </li>
      <li>
          <Link to="register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Register</Link>
        </li>
      </ul>
      </>}
      {/* dark toggler */}
      <button onClick={()=>{setDark(!dark)}} id="theme-toggle" type="button" className="text-gray-500 dark:text-gray-400 focus:outline-none rounded-lg text-sm p-2.5">
        {dark?
        <svg id="theme-toggle-light-icon" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd" /></svg>
        :
        <svg id="theme-toggle-dark-icon" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>

        }
      </button>


      {/* hidden menue button */}
      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
    </div>

    {/* menu */}
    {token && <>
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
      
      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-slate-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
       
        <li>
          <Link to="home" className="block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 md:dark:text-green-500" aria-current="page">Home</Link>
        </li>
        <li>
          <Link to="cart" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Cart</Link>
        </li>
        <li>
          <Link to="whishlist" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Wishlist</Link>
        </li>
        <li>
          <Link to="products" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Products</Link>
        </li>
        <li>
          <Link to="categories" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Categories</Link>
        </li>
        <li>
          <Link to="brands" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Brands</Link>
        </li>
      </ul>
        
    </div>
    </>}
    
      </div>
    </nav>
  </>

   
  )
}


export default Navbar