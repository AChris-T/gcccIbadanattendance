import { Outlet } from "react-router-dom";
import HomeNavbar from "../../../Modals/HomeNavbar";

// eslint-disable-next-line react/prop-types
const Home = ({ loggedInUser, onLogout }) => {
  return (
    <div className="max-w-[1440px] mx-auto shadow-card">
      <div className="flex flex-col">
        <HomeNavbar loggedInUser={loggedInUser} onLogout={onLogout} />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
