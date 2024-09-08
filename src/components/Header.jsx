import React, { useState, useEffect } from 'react';
import { useUser, useClerk } from "@clerk/clerk-react";
import Search from '../assets/search.png';
import Language from '../assets/EN.png';
import Navigate from '../assets/navigate-next.png';
import BurgerIcon from '../assets/burger-icon.png';
// import './header.css';

const Header = ({ searchTerm, onSearchChange }) => {
  const { user } = useUser();
  const clerk = useClerk();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1075);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1075);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (e) => {
    onSearchChange(e.target.value);
  };

  const handleLogout = () => {
    clerk.signOut();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex items-center justify-between p-[14px_30px_12px_30px] mb-8 md:p-[14px_40px_12px_40px]">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          className="py-2 px-10 w-full max-w-[500px] md:w-[460px] h-10 rounded-lg border-none bg-[#E7E8EA] text-sm leading-[17px] text-black"
        />
        <img
          src={Search}
          alt="search"
          className="absolute left-3 top-3 mr-2 hidden md:block"
        />
      </div>
      {isMobile ? (
        <div className="relative block md:hidden">
          <img
            src={BurgerIcon}
            alt="Menu"
            onClick={toggleMenu}
            className="cursor-pointer w-8 h-8"
          />
          {isMenuOpen && (
            <div className="absolute top-full right-0 bg-white border border-[#E7E8EA] rounded-lg p-5 z-50 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <img src={Language} alt="Language" />
                <img src={Navigate} alt="Navigate" />
              </div>
              <div className="flex flex-col items-start gap-2">
                <span className="text-xs">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="mt-2 p-1 text-xs border-none rounded cursor-pointer transition hover:bg-gray-200"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-2">
            <img src={Language} alt="Language" />
            <img src={Navigate} alt="Navigate" />
          </div>
          <div className="flex items-center gap-2">
            <span>{user.username}</span>
            <button
              onClick={handleLogout}
              className="p-1 text-sm border-none rounded cursor-pointer transition hover:bg-gray-200"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
