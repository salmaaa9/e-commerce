import { useState } from "react"
import Style from "./Home.module.css"
import RecentProduct from "../RecentProduct/RecentProduct"
import MainSlider from "../MainSlider/MainSlider"
import CategorySlider from "../CategorySlider/CategorySlider"




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