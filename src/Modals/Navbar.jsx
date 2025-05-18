/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import gccclogo from '../assets/Images/log.png';
import dayjs from 'dayjs';
import logo from '../assets/Images/gcc.png';

const Navbar = ({ isMarked }) => {
  const formattedDateTime = dayjs().format('dddd  [,] MMMM DD YYYY');
  const formattedTime = dayjs().format('hh:mm A ');
  return (
    <div className="flex w-full bg-[#24244e] items-center z-50 relative  justify-between md:h-[108px] h-[59px] md:items-center p-4">
      <img
        src={gccclogo}
        alt="menu"
        className="w-[200px] object-contain hidden md:flex"
      />
      <img
        src={logo}
        alt="menu"
        className="flex w-[80px] h-[80px] object-cover md:hidden"
      />
      <p className="text-[14px] flex items-center gap-2 text-white leading-6 font-normal">
        {formattedTime} |{' '}
        <p className={`${isMarked ? 'text-white' : 'text-[#86888A]'}`}>
          {formattedDateTime}
        </p>{' '}
      </p>
    </div>
  );
};

export default Navbar;
