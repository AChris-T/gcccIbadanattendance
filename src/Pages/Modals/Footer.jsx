import { NavLink } from "react-router-dom";
import call from "../assets/Images/call.png";
import Home from "../assets/Images/home.png";
import mail from "../assets/Images/mail.png";
import logo from "../assets/Images/log.png";
import facebook from "../assets/Images/facebook.png";
import inst from "../assets/Images/instag.png";
import youtube from "../assets/Images/you.png";
import mixlr from "../assets/Images/mixlr.png";

const Footer = () => {
  return (
    <div className="bg-[#222222] w-full md:px-14 px-8 py-14">
    <div className="flex flex-wrap gap-10 md:gap-0 justify-between flex-row text-[#fff] pb-14  " >
      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-[20px] leading-9">QUICK LINKS</h3>
        <NavLink to="/about" className='font-semibold text-[14px] leading-6'>ABOUT GCCC IBADAN</NavLink>
        <NavLink to="/about" className='font-semibold text-[14px] leading-6'>VISON & MISSON</NavLink>
        <a href='https://meet.google.com/grr-ybkh-jsp' className='font-semibold text-[14px] leading-6'>JOIN OUR DAILY PRAYERS</a>
        <NavLink to="/" className='font-semibold text-[14px] leading-6'>TESTIMONY FORM</NavLink>
        <NavLink to="/about" className='font-semibold text-[14px] leading-6'>CAREER OPPORTUNITES</NavLink>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-[20px] leading-9">MEDIA</h3>
        <NavLink to="/events" className='font-semibold text-[14px] leading-6'>LIVESTREAM</NavLink>
        <NavLink to="/events" className='font-semibold text-[14px] leading-6'>SERMONS</NavLink>
        <NavLink to="/events" className='font-semibold text-[14px] leading-6'>JOIN OUR TELEGRAM GROUP</NavLink>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-[20px] leading-9">SERVICE DETAILS</h3>
        <NavLink to="" className='font-semibold text-[14px] leading-6'>SUNDAY AT 8:00AM</NavLink>
        <NavLink to="" className='font-semibold text-[14px] leading-6'>TUESDAY AT 05:30PM</NavLink>
        <NavLink to="" className='font-semibold text-[14px] leading-6'>FRIDAY AT 05:30PM</NavLink>
      </div>
      <div className="flex flex-col justify-start gap-3 ">
        <h3 className="font-bold text-[20px] leading-9">CONTACT US</h3>
        <NavLink to="" className='font-medium text-[14px] leading-6 flex flex-row justify-center items-start gap-5'>
          <img src={Home} alt="home" width={"21.33px"} height={'24px'}/>
          <p className="-mt-1 md:w-56">13, Oluwole Akintola way adjacent Raian pharmacy, Iyana Bodija,express, Ibadan.</p>
        </NavLink>
        <NavLink to="" className='font-medium mb-3 text-[14px] leading-6 flex flex-row justify-center items-start gap-5'>
          <img src={mail} alt="mail" width={"21.33px"} height={'24px'}/>
          <a href="gcccibadan01@gmail.com" target="_blank" className="w-56 -mt-1">gcccibadan01@gmail.com</a>
        </NavLink>        
        <NavLink to="" className='font-medium text-[14px] leading-6 flex flex-row justify-center items-start gap-5'>
          <img src={call} alt="call" width={"21.33px"} height={'24px'}/>
          <p className="w-56 -mt-1">gcccibadan01@gmail.com</p>
        </NavLink>      
      </div>
      <div className="w-full px-20  h-[1px] rounded-sm border-[1px] border-[#fdfdfd]"></div>
      <div className="flex justify-between mt-4">
        <NavLink to="/" className="">
          <img src={logo} alt="log" className="hidden md:flex" />
        </NavLink>

        <div className="flex gap-3">
          <a
            target="_blank"
            href="https://web.facebook.com/GCCCIBADAN"
            className="bg-[#fff]  rounded-full w-[32px]  h-[32px] flex justify-center items-center"
          >
            <img src={facebook} alt="" width={"9.06px"} height={"18px"} />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/gcccibadan/"
            className="bg-[#fff]  rounded-full w-[32px]  h-[32px] flex justify-center items-center"
          >
            <img src={inst} alt="" width={"16px"} height={"16px"} />
          </a>
          <a
            target="_blank"
            href="https://www.youtube.com/@gccc_ibadan"
            className="w-[34.13px]  h-[30px] flex justify-center items-center"
          >
            <img src={youtube} alt="" width={"34.13px"} height={"30px"} />
          </a>
          <a
            target="_blank"
            href="https://gcccibadan.mixlr.com/events"
            className="  rounded-full w-[96px]  h-[28.83px] flex justify-center items-center"
          >
            <img src={mixlr} alt="" width={"96px"} height={"28.83px"} />
          </a>
        </div>
      </div>
      <h3 className="mt-10 font-normal text-[12px] text-[#9a9a9a] w-full flex justify-center items-center text-center">
        &copy; 2024 Glory centre community church, Ibadan. All rights reserved.
      </h3>
    </div>
    </div>
  );
};

export default Footer;
