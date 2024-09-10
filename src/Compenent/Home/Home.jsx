import { useContext, useState } from "react"
import Style from "./Home.module.css"
import RecentProduct from "../RecentProduct/RecentProduct"
import MainSlider from "../MainSlider/MainSlider"
import CategorySlider from "../CategorySlider/CategorySlider"
import { NavBarBadges } from "../Context/NavBarBadges"




function Home() {
  return(
    <>
    
    <MainSlider/>
    <CategorySlider/>
    <RecentProduct/>
    
    </>
  )
}

export default Home