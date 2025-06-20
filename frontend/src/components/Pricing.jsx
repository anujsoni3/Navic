import man from "../assets/tour_guide.png"
import { Link } from 'react-router-dom';


const Pricing = () => {
  return (
    <>
      <div class="grid grid-cols-[50%_50%] translate-y-[-30px] justify-items-center items-start">
        <div >

          <div className="bg-white rounded-full flex  justify-between w-[570px]">
            <div className="flex justify-center align-center gap-[20px] pl-[20px]">
            <p className="font-gothic text-[60px]"><span className="mr-2">MONTHLY</span> •</p>
            <p className="font-gothic text-[50px] text-[#2cc295] translate-y-[8px]">1000 INR</p>
            </div>

            <button className="mr-[20px] bg-[#d9d9d9] rounded-full font-gothic text-[30px] h-[40px] translate-y-[25px] px-[20px]">
                BUY NOW
            </button>
        </div>

        <div className="bg-white rounded-full flex  justify-between w-[570px] mt-[30px]">
            <div className="flex justify-center align-center gap-[20px] pl-[20px]">
            <p className="font-gothic text-[60px]"> <span className="mr-10">YEARLY</span> •</p>
            <p className="font-gothic text-[50px] text-[#2cc295] translate-y-[8px]">9000 INR</p>
            </div>

            <button className="mr-[20px] bg-[#d9d9d9] rounded-full font-gothic text-[30px] h-[40px] translate-y-[25px] px-[20px]">
                BUY NOW
            </button>
        </div>

        <Link to="/Check_Rentals" className="block font-spartan text-center mt-[20px] font-semibold text-lg">
  CLICK TO KNOW MORE
</Link>
        <p className="font-gothic text-center text-5xl mt-[50px]">Every journey starts with a smart choice.<br />
        Pick your plan and ride on </p>
        </div>
        <div >
            <img src={man} className="h-[580px] w-[580px] transform scale-x-[-1]"/>
        </div>
      </div>
    </>
  );
};

export default Pricing;
