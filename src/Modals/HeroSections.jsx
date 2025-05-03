import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img4 from "../assets/Images/ig1.jpg"
import img2 from "../assets/Images/ig2.jpg"
import img3 from "../assets/Images/ig3.jpg"
import img5 from "../assets/Images/ig5.jpg"
import img6 from "../assets/Images/ig6.jpg"

const HeroSections = () => {
  var settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,

  };
  return (
 
    <div className="relative ">
    <Slider {...settings}>
    <div className="">
      <img src={img5} alt='hero' className="h-[300px] md:h-[550px] w-[100%] md:object-cover"/>
      {/* <div className="absolute inset-0 bg-gray-800 opacity-35 w-[100%] "> </div> */}
    </div>
    <div>
    <img src={img6} alt='hero' className="h-[300px] md:h-[550px] w-[100%] md:object-cover"/>
    <div className="absolute inset-0 bg-gray-800 opacity-35 w-[100%] md:h-[550px] h-[300px]"> 
    </div>
    </div>
    <div>
    <img src={img4} alt='hero' className="h-[300px] md:h-[550px] w-[100%] md:object-cover"/>
    </div>
    <div>
    <img src={img2} alt='hero' className="h-[300px] md:h-[550px] w-[100%] md:object-cover"/>
    </div>
    <div>
    <img src={img3} alt='hero' className="h-[300px] md:h-[550px] w-[100%] md:object-cover"/>
    </div>
  </Slider> 
  <div className="absolute inset-0 w-full md:gap-4 gap-2 flex flex-col text-[#fff] justify-center  items-center h-full"> 
  <h1 style={{fontFamily:"Lobster Two, sans-serif"}} className=" md:text-[55px] text-[20px] font-semibold"> Welcome to Our Church</h1>
  <p className="md:text-[25px] ">The best place to belong </p>
{/*   <button className="bg-[#ec3538] md:p-4 p-2 md:text-[px2rem(15)] text-[px2rem(13)]  rounded-sm">Plan Your Visit</button>
 */}</div>
</div>
  )
}

export default HeroSections
