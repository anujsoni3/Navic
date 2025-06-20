import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-white-500  text-black font-spartan py-4 flex flex-col gap-3 justify-between items-center px-6 mt-[20px]">
      {/* Left Side Links */}
      <div className="flex space-x-6 font-bold text-xl">
        <a href="#about" className="hover:text-gray-300">About</a>
        <a href="#pricing" className="hover:text-gray-300">Pricing</a>
        <a href="#review" className="hover:text-gray-300">Review</a>
      </div>

      {/* Right Side - Copyright */}
      <div className="flex items-center space-x-2">
        <span>Copyright © 2025</span>
       
        
      </div>
    </footer>
  );
};

export default Footer;
