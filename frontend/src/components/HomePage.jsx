import Header from "./Header";
import SubHeader from "./SubHeader";
import Pricing from "./Pricing";
import Reviews from "./Reviews";
import Footer from "./Footer";

const HomePage = () => {
    return(
        <>
        <Header />
        <SubHeader />
        <div className="bg-gradient-to-b from-[#2cc295] to-white">
        <Pricing />
        
        {/* Other sections below Pricing */}
        <div>
        <Reviews />
        </div>
        <Footer />
      </div>
        </>
    )
}

export default HomePage;