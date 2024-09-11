
import { useEffect } from "react"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import { Outlet } from "react-router-dom"



function Layout() {
    useEffect(()=>
        console.log("mounting Layout")
        ,[])
  return (
    <>
     <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow sm:p-5 md:p-20">
        <Outlet />
      </div>
      <Footer />
    </div>

    </>
  )
}

export default Layout