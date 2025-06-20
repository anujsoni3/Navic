// SubHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import map from '../assets/map2.svg';

const SubHeader = () => {
  return (
    <>
      <div className="mt-[50px]">
        <p
          className="font-lustria text-center ml-[25px] tracking-[2px]"
          style={{ fontSize: '40px' }}
        >
          Looking for the best possible way
          <br /> to reach your destination?
        </p>

        <p className="text-white text-center text-xl mt-[5px] ml-[25px] font-extralight leading-[1.5]">
          Then enter your start and end location, and find your <br />
          preferred mode of transport while comparing their prices.
        </p>

        <div className="text-center mt-[35px]">
        <Link to="/login">
            <button className="bg-white rounded-full p-[10px] text-xs text-center" style={{ cursor: "pointer" }}>
              GET STARTED
            </button>
         </Link>
          
        </div>

        <img src={map} className="translate-y-[-20px]" />
      </div>
    </>
  );
};

export default SubHeader;
