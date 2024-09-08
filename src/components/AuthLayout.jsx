import React from 'react';
import Image from '../assets/image.png';
// import './authlayout.css';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen items-center justify-between px-16">
      <div className="flex-1 hidden overflow-hidden md:block">
        <img className="w-full h-full object-cover" src={Image} alt="" />
      </div>
      <div className="flex-1 flex justify-center items-center p-5 md:w-[250px] md:h-[267px]">{children}</div>
    </div>
  );
};

export default AuthLayout;
