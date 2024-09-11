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
  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 mx-auto">
  {/* Left Side with Slider */}
  <div className="md:col-span-8">
    <Slider ref={(slider) => {sliderRef = slider;}} {...settings}>
      {/* Slider Image 1 */}
      <div>
        <img
          className="md:h-[400px] h-[200px] w-full object-cover"
          src={sliderImg1}
          alt=""
        />
      </div>
      {/* Slider Image 2 */}
      <div>
        <img
          className="md:h-[400px] h-[200px] w-full object-cover"
          src={sliderImg2}
          alt=""
        />
      </div>
    </Slider>

    {/* Slider Navigation Buttons */}
    <div className="flex justify-center items-center mt-5">
      <button
        onClick={previous}
        className="w-5 h-3 rounded-lg bg-slate-500 mr-3"
      ></button>
      <button
        onClick={next}
        className="w-5 h-3 rounded-lg bg-slate-500"
      ></button>
    </div>
  </div>

  {/* Right Side with Static Images */}
  <div className="md:col-span-4 flex flex-col space-y-4">
    <img
      className="md:h-[200px] h-[100px] w-full object-cover"
      src={sliderImg3}
      alt=""
    />
    <img
      className="md:h-[200px] h-[100px] w-full object-cover"
      src={sliderImg4}
      alt=""
    />
  </div>
</div>

  )
}

export default MainSlider