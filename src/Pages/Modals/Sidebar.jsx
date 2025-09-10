import gccclogo from "../assets/Images/logo.png";
import check from "../assets/Images/check.png";
import settings from "../assets/Images/settings.png";
import logout from "../assets/Images/logout.png";
import { NavLink } from "react-router-dom";
import { FaUserCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const Sidebar = () => {

  const handleClearLocalStorage = () => {
     localStorage.removeItem("GCCC_ATTENDANCE");
    // Optionally, you can perform additional actions after clearing localStorage
    window.location.href = '/';
    toast.error("Have a nice day", {
      position: "top-right",
    });
  };
  return (
    <div className="flex flex-col h-[100vh] bg-[#F9FDFFB2]">
      <div>
        <div className="flex items-center justify-between px-2 py-6">
          <img src={gccclogo} alt="gccclogo" width={"230px"} height={"65px"} />
        </div>
        </div>

        <div className="flex flex-col justify-between h-full px-6 mt-12 gap-7">
        <div className="flex flex-col gap-2">
          {/* <NavLink
            to="/dashboard/home"
            className="flex items-center gap-1 px-8 text-sm text-center "
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "blue" : "",
              };
            }}
          >
            <FaUserCheck />
            Home
          </NavLink> */}
        
          <NavLink
            to="/dashboard/attendance"
            className="flex items-center text-[#0094D3] justify-center rounded gap-[8px] h-[48px] px-2 text-[14px] font-medium text-center bg-[#D1F1FF] "
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "#0094D3" : "",
                color: isActive ? "#0094D3" : "",
              };
            }}
          >
          <img src={check} alt="gccclogo" width={"24px"} height={"24px"} />
            Attendance Log
          </NavLink>
          <NavLink
            to="/"
            className="flex items-center text-[#0094D3]  rounded gap-[8px] h-[48px] px-2 text-[14px] font-medium hover:bg-[#D1F1FF]  "
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "#0094D3" : "",
                color: isActive ? "#0094D3" : "",
              };
            }}
          >
         <FaUserCheck className="text-[24px]" />
{/*           <img src={check} alt="gccclogo" width={"px2rem(24)"} height={"px2rem(24)"} />
 */}            Home
          </NavLink>
          </div>
          {/* <NavLink
            to="/dashboard/events"
            className="flex items-center gap-1 px-8 text-sm text-center"
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "blue" : "",
              };
            }}
          >
            <MdEventAvailable />
            Events
          </NavLink> */}
          <div className="flex flex-col justify-start gap-3 mb-3">
          <NavLink
            to="/dashboard/attendance"
            className="flex items-center text-[#0094D3]  rounded gap-[18px] h-[48px] px-2 text-base leading-6 font-normal text-center hover:bg-[#D1F1FF] "
          >
          <img src={settings} alt="gccclogo" width={"20px"} height={"20px"} />
            Settings
          </NavLink>
          <NavLink
            to="/"
            onClick={handleClearLocalStorage}
            className="flex items-center text-[#0094D3]  rounded gap-[18px] h-[48px] px-2 leading-6 text-base font-normal text-center hover:bg-[#D1F1FF] "
          >
          <img src={logout} alt="gccclogo" width={"20px"} height={"20px"} />
            Logout        
           </NavLink>
           
          {/*   <button
              onClick={handleClearLocalStorage}
              className="flex items-center justify-center rounded gap-[px2rem(8)] h-[px2rem(48)] px-2 text-sm font-medium text-center  "
            >
             <img src={SignUp} alt="signup" className="w-5" />  Sign Out
            </button> */}
          </div>
        </div>
    </div>
  );
};

export default Sidebar;
