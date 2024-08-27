import { useRef} from "react"
import Style from "./MainSlider.module.css"
import { useEffect } from "react"
import sliderImg1 from "../../assets/images/grocery-banner.png"
import sliderImg2 from "../../assets/images/grocery-banner-2.jpeg"
import sliderImg3 from "../../assets/images/slider-image-2.jpeg"
import sliderImg4 from "../../assets/images/slider-image-3.jpeg"
import Slider from "react-slick"


function MainSlider() {
    
    let sliderRef = useRef(null);
    const next = () => {
      sliderRef.slickNext();
    };
    const previous = () => {
      sliderRef.slickPrev();
    };
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:false
    };
    useEffect(()=>
        console.log("mounting MainSlider")
        ,[])
  return ( 
    <div className="grid md:grid-cols-12 pt-4 w-10/12 mx-auto">
        <div className="md:col-span-8">
          <Slider ref={slider => {sliderRef = slider;}} {...settings}>
          <div className="">
            <img className="h-[400px] w-full object-cover" src={sliderImg1} alt="" />
          </div>
          <div>
            <img className="h-[400px] w-full object-cover" src={sliderImg2} alt="" />
          </div>
          </Slider>
          <div className="flex justify-center items-center mt-5">
          <button onClick={previous} className="w-5 h-3 rounded-lg bg-slate-500 me-3"></button>
          <button onClick={next} className="w-5 h-3 rounded-lg bg-slate-500"></button>
          </div>
        </div>
        <div className="md:col-span-4">
          <img className="h-[200px] w-full object-cover" src={sliderImg3} alt="" />
          <img className="h-[200px] w-full object-cover" src={sliderImg4} alt="" />
        </div>
    </div> 
  )
}

export default MainSlider