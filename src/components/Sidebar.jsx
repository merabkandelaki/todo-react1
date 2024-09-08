import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Sun from '../assets/sun.png';
import Importance from '../assets/importance.png';
import { BsPieChart } from "react-icons/bs";
import { PiCheckCircle } from "react-icons/pi";
// import './sidebar.css';

const Sidebar = ({ onFilterChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFilterClick = (filter) => {
    if (onFilterChange) {
      onFilterChange(filter);
    }
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <div className="w-[290px] flex flex-col items-center lg:flex">
      <div className="mt-[100px] ml-6 px-4 py-[10px] w-[252px] h-12 flex items-center gap-2 rounded cursor-pointer" onClick={() => handleFilterClick('all')}>
        <img src={Sun} alt="All" />
        <span className="text-sm font-medium leading-[17px] text-[#252931]">All todos</span>
      </div>
      <div
        className="ml-6 px-4 py-[10px] w-[252px] h-12 flex items-center gap-2 rounded cursor-pointer"
        onClick={() => handleFilterClick('important')}
      >
        <img src={Importance} alt="Importance" />
        <span className="text-sm font-medium leading-[17px] text-[#252931]">Important</span>
      </div>
      <div
        className="ml-6 px-4 py-[10px] w-[252px] h-12 flex items-center gap-2 rounded cursor-pointer"
        onClick={() => handleFilterClick('completed')}
      >
        <PiCheckCircle className="w-[22px] h-[22px]" />
        <span className="text-sm font-medium leading-[17px] text-[#252931]">Completed</span>
      </div>
      <Link to="/chart" className="ml-6 px-4 py-[10px] w-[252px] h-12 flex items-center gap-2 rounded cursor-pointer">
        <BsPieChart className="w-[22px] h-[22px]" />
        <span className="text-sm font-medium leading-[17px] text-[#252931]">Charts</span>
      </Link>
    </div>
  );
};

export default Sidebar;
