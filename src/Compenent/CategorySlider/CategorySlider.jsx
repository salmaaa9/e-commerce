import { useRef, useState } from "react"
import Style from "./CategorySlider.module.css"
import { useEffect } from "react"
import Slider from "react-slick";
import axios from "axios";



function CategorySlider() {
const [categories, setCategories] = useState([]);
const [isLoading, setIsLoading] = useState(false);
    
async function getCategories(){
  
  setIsLoading(true)
  const {data} = await axios('https://ecommerce.routemisr.com/api/v1/categories')
  console.log(data.data);
  setIsLoading(false)
  setCategories(data.data)
}

// if(categories.length != 0)
//   setIsLoading(false)
    
    useEffect(()=>{
      console.log("mounting CategorySlider")
      getCategories()
    },[])

    let sliderRef = useRef(null);
    const next = () => {
      sliderRef.slickNext();
    };
    const previous = () => {
      sliderRef.slickPrev();
    };
        const settings = {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 6,
          slidesToScroll: 1,
          arrows:false,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows:false,
              }
            },
            {
              breakpoint: 600,
              settings: {
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows:false,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        };
        return (<>
          <Slider
          ref={slider => {
          sliderRef = slider;
        }}
         {...settings}>
            {categories.map(function(category){
              return ( 
                <div className="mt-10 m-auto" key={category.id}>
                  <img src={category.image} alt="" className="h-[200px] w-full object-cover"/>
                  <h2 className="text-2xl font-bold text-center md:text-start">{category.name}</h2>
                <div/>
                </div>
              )})}
                    
          </Slider>
          {!isLoading&&<div className="flex justify-center items-center mt-5">
          <button onClick={previous} className="w-5 h-3 rounded-lg bg-slate-500 me-3"></button>
          <button onClick={next} className="w-5 h-3 rounded-lg bg-slate-500"></button>
          </div> }
          
        </>);
}

export default CategorySlider