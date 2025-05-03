import { NavLink } from "react-router-dom";
//import aboutchurch from '../../../assets/Images/aboutChurch.mp4'
import newImage from "../../../assets/Images/reg.jpg";
import children from "../../../assets/Images/kids.jpg";
import lifegroup from "../../../assets/Images/fam.jpg";
import ministry from "../../../assets/Images/hnd.jpg";
import bible from "../../../assets/Images/bible.jpg";

const About = () => {
  return (
    <div className="flex flex-col gap-10 ">
      <h5
        style={{ fontFamily: "Lobster Two, sans-serif" }}
        className="text-[#ec3538] text-center font-bold"
      >
        What we do
      </h5>
      <h3 className="w-full flex justify-center text-[#757575] -mt-10 font-semibold text-[32px] leading-10 text-center px-2">
        We are glad to have you here
      </h3>
      <div className="flex justify-center w-full ">
        <div className="flex flex-col justify-center w-full gap-5 text-center md:text-left md:flex-row">
          <div className="flex flex-col gap-5 lg:flex-row md:flex-col">
            <div
              data-aos="fade-up"
              data-aos-delay="0"
              className="relative flex flex-col gap-2"
            >
              <div className=" h-[200px] ">
                <img
                  src={newImage}
                  alt="image"
                  className="h-[200px] md:w-[330px] w-full object-cover rounded-md"
                />
              </div>
              <div className="absolute text-white inset-0  bg-gray-700 opacity-35 w-full h-[200px] rounded-md"></div>
              <div className="absolute  flex font-bold justify-center items-center w-full h-[200px]">
                <h3 className="text-[#fff] md:text-[40px] text-[30px]"></h3>
              </div>
              <h3 className="px-4 text-[#757575] font-semibold text-[20px] md:px-0">
                A Place You Can Call Home
              </h3>
              <p className="text-[15px] font-light md:px-0 px-4 md:w-[300px] lg:w-[254px]">
                Kingdom culture, In christ we have been made citizens of the
                kingdom of our Father. Him alone is our allegiance.We believe
                strongly in the culture of honour{" "}
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="relative flex flex-col gap-2"
            >
              <div className="h-[200px]">
                <img
                  src={children}
                  alt="image"
                  className="h-[200px] w-full object-cover rounded-md"
                />
              </div>
              <div className="absolute text-white inset-0  bg-gray-700 opacity-35 w-full h-[200px] rounded-md"></div>
              <div className="absolute  flex font-bold justify-center items-center w-full h-[200px]">
                <h3 className="text-[#fff] md:text-[40px] text-[30px] "></h3>
              </div>
              <h3 className="px-4 text-[#757575]  font-semibold md:px-0 text-[20px]">
                We Cherish Our Kids
              </h3>
              <p className="text-[15px] font-light md:px-0 px-4 md:w-[300px] lg:w-[260px]">
                We are of an Excellent Spirit, through our work and service we
                are able to play our part in the continued establishment of
                God’s kingdom on Earth
              </p>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="relative flex flex-col gap-2"
          >
            <div className="h-[200px] ">
              <img
                src={lifegroup}
                alt="image"
                className="h-[200px] md:w-[330px] w-full  lg:w-full object-cover rounded-md"
              />
            </div>
            <div className="absolute text-white inset-0  bg-gray-700 opacity-35 w-full h-[200px] rounded-md"></div>
            <div className="absolute  flex font-bold justify-center items-center w-full h-[200px]">
              <h3 className="text-[#fff] md:text-[40px] text-[30px] "></h3>
            </div>
            <h3 className="px-4  text-[#757575]  font-semibold md:px-0 text-[20px]">
              Gospel Community for Church
            </h3>
            <p className="text-[15px] font-light md:px-0 px-4 md:w-[300px] lg:w-[260px]">
              If you are thinking about Love, Family and Kingdom then it is
              Glory Centre Community Church you are thinking about.You can take
              our word for it.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full gap-4 mt-14">
        <div className="flex flex-col w-full gap-5 md:w-11/12 md:flex-row">
          <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="flex-1 w-[900px] md:w-[500px] lg:w-[900px] "
            >
              <img
                src={ministry}
                alt="hands"
                className="h-[400px] w-full  object-cover rounded shadow"
              />
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="flex flex-col justify-center flex-1 h-full gap-2 text-center md:mt-52 md:text-start"
            >
              <h5
                style={{ fontFamily: "Lobster Two, sans-serif" }}
                className="text-[#ec3538] font-bold"
              >
                Join The Ministry
              </h5>
              <h2 className="w-full  text-[#757575]  font-semibold text-[32px] leading-10">
                Our Ministry
              </h2>
              <div className="flex-col items-center justify-center md:flex-1">
                <p className="flex  text-center md:text-left font-normal text-[16px] leading-2 px-3 md:px-0 md:pr-6">
                  It is a great honor to serve in God’s house and kingdom, through our work and service we are able to play our part in
                  the continued establishment of God’s kingdom on Earth we are
                  seen to inspire and provoke others unto good works
                </p>
                <div className="flex justify-center md:justify-start ">
                  <NavLink
                    to="/about"
                    className="flex mt-4 rounded-sm justify-center  text-[14px] font-semibold   px-10 py-4 text-[#FEFEFE] bg-[#18181A]"
                  >
                    Read More
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full gap-4 md:mt-14">
        <div className="flex flex-col w-full md:w-11/12 md:flex-row md:gap-5">
          <div className="flex flex-col-reverse items-center justify-between gap-10 md:flex-row">
            <div
              data-aos="fade-up"
              data-aos-delay="0"
              className="flex flex-col justify-center flex-1 h-full gap-2 text-center md:mt-52 md:text-start"
            >
              <h5
                style={{ fontFamily: "Lobster Two, sans-serif" }}
                className="text-[#ec3538] font-bold"
              >
                Our Sermons
              </h5>
              <h2 className="w-full  text-[#757575]  font-semibold text-[32px] leading-10">
                Weekly Sermons
              </h2>
              <div className="flex-col items-center justify-center md:flex-1">
                <p className="flex  text-center md:text-left font-normal text-[16px] leading-2 px-3 md:px-0 md:pr-6">
                  There is a meeting not to be missed! The Lord has great things
                  in store for us!
                </p>
                <div className="flex justify-center md:justify-start ">
                  <a
                    href="https://t.me/gcccIbadan"
                    target="_blank"
                    className="flex mt-4 rounded-sm justify-center  text-[14px] font-semibold   px-10 py-4 text-[#FEFEFE] bg-[#18181A]"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="flex-1 w-[900px] md:w-[500px] "
            >
              <img
                src={bible}
                alt="hands"
                className="h-[400px] w-full object-cover rounded shadow"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col items-center gap-4 lg:flex-row md:gap-10 md:px-16 ">
        <video autoPlay muted loop  className="md:w-[493px] ">
            <source src={aboutchurch} type="video/mp4"/>
            <source src="movie.ogg" type="video/ogg"/>
            Your browser does not support the video tag.
        </video>
        <div className="flex-col items-center justify-center md:flex-1" >
          <p className="flex text-center md:text-left font-normal text-[16px] leading-2 px-3 md:px-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lobortis
           efficitur sem ac aliquet. Aenean venenatis consequat urna. Cras 
           lobortis lacinia lobortis. Aenean dignissim urna id leo dictum,
            non lacinia libero pellentesque. Aenean rutrum sem sem,
             at suscipit mi aliquam a. Sed nulla felis, porttitor
              sed sodales eu, euismod in nibh. Aliquam eget gravida
               magna. Morbi est ante, commodo eu elit faucibus, facilisis 
               pretium nulla...
          </p>
          <NavLink to='/home/about' className="flex mt-4 rounded-sm justify-center  text-[14px] font-semibold md:mx-[35%] mx-[10px] px-3 py-4 text-[#FEFEFE] bg-[#18181A]">Read More</NavLink>
              
        </div>
      </div> */}
    </div>
  );
};

export default About;
